#!/usr/bin/env node
/**
 * build-blog.js — Génère les pages HTML du blog à partir des fichiers markdown LazySEO
 *
 * Usage: node scripts/build-blog.js
 *
 * - Lit tous les fichiers .md de content/blog/
 * - Parse le frontmatter YAML (gray-matter)
 * - Convertit le markdown en HTML (marked)
 * - Génère blog/[slug].html depuis blog/post-template.html
 * - Met à jour content/blog/manifest.json (conserve les entrées seed sans .md)
 */

const fs   = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const ROOT         = path.join(__dirname, '..');
const CONTENT_DIR  = path.join(ROOT, 'content', 'blog');
const BLOG_DIR     = path.join(ROOT, 'blog');
const TEMPLATE     = path.join(BLOG_DIR, 'post-template.html');
const MANIFEST     = path.join(CONTENT_DIR, 'manifest.json');

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDateFr(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function escapeHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Load template ─────────────────────────────────────────────────────────────

if (!fs.existsSync(TEMPLATE)) {
  console.error('❌  Template introuvable :', TEMPLATE);
  process.exit(1);
}
const template = fs.readFileSync(TEMPLATE, 'utf-8');

// ── Load existing manifest (seed entries kept as fallback) ────────────────────

let seedEntries = [];
if (fs.existsSync(MANIFEST)) {
  try {
    seedEntries = JSON.parse(fs.readFileSync(MANIFEST, 'utf-8'));
  } catch (e) {
    console.warn('⚠️  manifest.json invalide, il sera recréé.');
  }
}
const seedBySlug = {};
seedEntries.forEach(p => { seedBySlug[p.slug] = p; });

// ── Process markdown files ────────────────────────────────────────────────────

const mdFiles = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
console.log(`📂  ${mdFiles.length} fichier(s) markdown trouvé(s) dans content/blog/`);

const generatedBySlug = {};

for (const file of mdFiles) {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(raw);

  // Skip drafts
  if (data.draft === true) {
    console.log(`⏭️   Ignoré (draft) : ${file}`);
    continue;
  }

  const slug       = data.slug || path.basename(file, '.md');
  const title      = data.title || slug;
  const description = data.description || '';
  const image      = data.image || data.ogImage || '';
  const dateIso    = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
  const dateFr     = formatDateFr(dateIso);
  const tags       = Array.isArray(data.tags) ? data.tags : [];
  const category   = tags[0] || 'blog';
  const titleShort = title.split(':')[0].trim();

  // Convert markdown → HTML
  const htmlContent = marked.parse(body || '');

  // Replace template placeholders
  const postHtml = template
    .replace(/\{\{TITLE\}\}/g,       escapeHtml(title))
    .replace(/\{\{TITLE_SHORT\}\}/g, escapeHtml(titleShort))
    .replace(/\{\{DESCRIPTION\}\}/g, escapeHtml(description))
    .replace(/\{\{SLUG\}\}/g,        slug)
    .replace(/\{\{CATEGORY\}\}/g,    category)
    .replace(/\{\{DATE_ISO\}\}/g,    dateIso)
    .replace(/\{\{DATE_FR\}\}/g,     dateFr)
    .replace(/\{\{IMAGE\}\}/g,       image)
    .replace(/\{\{CONTENT\}\}/g,     htmlContent);

  // Write blog/[slug].html
  const outPath = path.join(BLOG_DIR, `${slug}.html`);
  fs.writeFileSync(outPath, postHtml, 'utf-8');
  console.log(`✅  Généré : blog/${slug}.html`);

  generatedBySlug[slug] = {
    title,
    date: dateIso,
    slug,
    description,
    image,
    tags,
    category,
    url: `${slug}.html`,
  };
}

// ── Merge seed + generated, sort by date ─────────────────────────────────────

// Seed entries that don't have a .md file are kept as-is (manually maintained articles)
const merged = { ...seedBySlug };
Object.assign(merged, generatedBySlug); // generated overrides seed entries with same slug

const posts = Object.values(merged).sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(MANIFEST, JSON.stringify(posts, null, 2), 'utf-8');
console.log(`\n📋  manifest.json mis à jour : ${posts.length} article(s) au total.`);

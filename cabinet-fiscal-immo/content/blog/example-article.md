---
title: "Exemple d'article LazySEO"
date: "2026-01-01T00:00:00.000Z"
slug: "exemple-article-lazyseo"
description: "Ceci est un exemple d'article généré par LazySEO. Supprimez ce fichier et remplacez-le par vos vrais articles."
image: ""
ogImage: ""
tags: ["fiscalite"]
author: "LazySEO"
draft: true
---

# Exemple d'article

Ceci est un exemple pour tester le système de génération d'articles depuis des fichiers markdown.

## Comment ça marche

1. LazySEO publie des fichiers `.md` dans ce dossier `content/blog/`
2. GitHub Actions détecte le nouveau fichier et lance le script de build
3. Le script génère `blog/[slug].html` et met à jour `manifest.json`
4. La page `blog/index.html` charge automatiquement les nouveaux articles

> Ce fichier est marqué `draft: true` — il ne sera pas publié.

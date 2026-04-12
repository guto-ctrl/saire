# 🚀 SAIRE — Sistema Automatizado de Identificação e Rastreabilidade

Microserviço para geração e impressão de etiquetas técnicas de refrigeradores industriais. O sistema gera etiquetas em HTML/CSS com alta flexibilidade visual e as converte em PDF para impressão em impressoras térmicas.

---

## 🎯 Objetivo

Criar uma solução leve, portátil e eficiente para:

* Gerar etiquetas técnicas padronizadas
* Incluir QR Code dinâmico com acesso ao manual
* Garantir compatibilidade com impressão térmica
* Rodar localmente ou via containers

---

## 🧠 Arquitetura

```id="arch1"
[ Fastify API ]
        ↓
[ Prisma ORM + SQLite ]
        ↓
[ Template HTML/CSS ]
        ↓
[ Puppeteer (Renderização PDF) ]
```

---

## 🛠️ Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?logo=fastify\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma\&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite\&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?logo=googlechrome\&logoColor=white)
![QRCode](https://img.shields.io/badge/QR%20Code-000000?logo=qrcode\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker\&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase\&logoColor=white)

---

## 📦 Funcionalidades

* 📄 Geração de etiquetas em HTML/CSS
* 🔳 QR Code dinâmico por equipamento
* 🖨️ Conversão para PDF via headless browser
* 🧊 Persistência leve com SQLite
* 🐳 Execução isolada com Docker
* ☁️ Integração com armazenamento de manuais

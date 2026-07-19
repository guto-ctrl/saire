# 🏷️ Saire - Sistema de Etiquetagem de Compressores

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-success)
![React](https://img.shields.io/badge/Frontend-Next.js-blue)
![C#](https://img.shields.io/badge/Backend-.NET_10-purple)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57)

O **Saire** é um sistema desenvolvido para otimizar e automatizar o fluxo de trabalho de geração e impressão de etiquetas de compressores. Ele atua como um facilitador, substituindo o processo manual e repetitivo (anteriormente feito em softwares como BarTender) por uma aplicação web rápida, segura e com dados validados a partir de um banco de dados local.

---

## 🎯 Objetivo do Projeto

O objetivo principal é aumentar a produtividade do cliente e mitigar erros de digitação. O sistema permite que o operador cadastre e gerencie os modelos de compressores no banco de dados. Na hora da impressão, basta selecionar o modelo desejado, inserir o Número de Série específico daquela unidade, visualizar a etiqueta gerada em tempo real e enviar diretamente para a impressora térmica.

## ✨ Funcionalidades

- **CRUD Completo de Compressores:** Cadastro, leitura, edição e exclusão de modelos de compressores de forma isolada em modais para manter a interface principal limpa.
- **Pré-visualização em Tempo Real:** À medida que o modelo é selecionado e o número de série inserido, a etiqueta é montada visualmente na tela inicial.
- **Impressão Térmica Otimizada:** Solução de layout avançada usando CSS (`@media print` e `transform: scale`) para garantir que a etiqueta (renderizada de forma ampliada para leitura na tela) seja impressa nas dimensões exatas da etiqueta física (100mm x 40mm).
- **Banco de Dados Local:** Agilidade e independência, armazenando todos os dados estruturais necessários de forma confiável.

## 🛠️ Tecnologias Utilizadas

**Frontend:**
- [React](https://reactjs.org/) / [Next.js](https://nextjs.org/)
- TypeScript
- CSS Modules & Variáveis Globais (Layout otimizado para impressão)

**Backend:**
- C# (.NET)
- API RESTful

**Banco de Dados:**
- SQLite (Local)

**Infraestrutura:**
- Docker & Docker Compose (Facilidade na orquestração dos serviços)

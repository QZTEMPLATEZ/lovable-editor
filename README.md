
# Welcome to your Lovable project

## Visão Geral do Projeto
Este é um editor de vídeos de casamento baseado em IA, desenvolvido com React, Vite, TypeScript e Tailwind CSS. O projeto é uma aplicação web que roda em qualquer sistema operacional, incluindo macOS.

## Pré-requisitos
- Node.js & npm - [instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Git
- Um navegador moderno (Chrome, Safari, Firefox)

## Configuração Inicial

```sh
# Passo 1: Clone o repositório usando a URL Git do projeto
git clone <YOUR_GIT_URL>

# Passo 2: Entre no diretório do projeto
cd <YOUR_PROJECT_NAME>

# Passo 3: Instale as dependências necessárias
npm i

# Passo 4: Inicie o servidor de desenvolvimento com auto-reload e preview instantâneo
npm run dev
```

## Estrutura do Projeto
- `/src` - Código fonte do projeto
  - `/components` - Componentes React reutilizáveis
  - `/services` - Serviços para análise e processamento de vídeo
  - `/utils` - Utilitários e helpers
  - `/hooks` - Custom hooks React
  - `/types` - Definições de tipos TypeScript
  - `/docs` - Documentação detalhada

## Tecnologias Utilizadas
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Scripts Disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção localmente

## Integração com Editores de Vídeo
O projeto suporta exportação para:
- Final Cut Pro (FCPXML)
- Adobe Premiere Pro
- DaVinci Resolve (EDL)

## Desenvolvimento Local
1. Certifique-se de ter Node.js instalado (recomendamos usar nvm)
2. Clone o repositório
3. Instale as dependências com `npm install`
4. Inicie o servidor de desenvolvimento com `npm run dev`
5. Acesse `http://localhost:8080` no seu navegador

## Estrutura de Arquivos Importantes
- `index.html` - Ponto de entrada da aplicação
- `vite.config.ts` - Configuração do Vite
- `tailwind.config.ts` - Configuração do Tailwind CSS
- `tsconfig.json` - Configuração do TypeScript

## Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Ajuda e Documentação
- Veja a pasta `/src/docs` para documentação detalhada
- Consulte `PROJECT_DOCUMENTATION.md` para entender o fluxo de trabalho
- Veja `APP_STRUCTURE.md` para detalhes da estrutura do projeto


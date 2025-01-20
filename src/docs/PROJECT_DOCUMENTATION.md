# Documentação do Editor de Vídeos de Casamento

## Visão Geral
Este é um software especializado em edição de vídeos de casamento que utiliza IA para automatizar o processo de organização e edição inicial do material bruto. O sistema é projetado para analisar, categorizar e montar automaticamente uma primeira versão do vídeo de casamento.

## Estrutura do Projeto

### Componentes Principais
- `src/App.tsx`: Gerenciamento de rotas e estados globais
- `src/components/TopNavigation.tsx`: Navegação principal
- `src/components/VideoTypeIndicator.tsx`: Indicador do tipo de vídeo

### Fluxo de Trabalho (Steps)

#### 1. Seleção de Duração (`/duration`)
- Arquivo: `src/components/VideoSizeSelector.tsx`
- Função: Seleção da duração do vídeo final
- Opções: Social (30s-1:30min), Trailer (3-5min), Short Film (8-12min), etc.

#### 2. Seleção de Estilo (`/style`)
- Arquivo: `src/components/editor/VideoStyleSelector.tsx`
- Função: Escolha do estilo visual
- Estilos: Clássico, Moderno, Documentário

#### 3. Seleção de Música (`/music`)
- Arquivo: `src/components/editor/MusicSelector.tsx`
- Função: Upload e seleção de músicas

#### 4. Organização (`/organize`)
- Arquivo: `src/components/organizer/FileOrganizer.tsx`
- Função: Upload e categorização automática
- Categorias:
  - brideprep (preparativos da noiva)
  - groomprep (preparativos do noivo)
  - decoration (decoração)
  - drone (imagens aéreas)
  - ceremony (cerimônia)
  - reception (festa)

#### 5. Revisão Manual
- Arquivo: `src/components/editor/review/ReviewClassificationStep.tsx`
- Função: Interface drag-and-drop para correção de categorias
- Sistema de feedback para IA

#### 6. Edição Automática
- Arquivo: `src/components/editor/AIEditStep.tsx`
- Função: Montagem automática seguindo narrativa padrão

### Serviços e Utilitários
- `src/services/FileAnalysisService.ts`: Análise de arquivos
- `src/utils/videoProcessing.ts`: Processamento de vídeo
- `src/utils/premiere/sequenceGenerator.ts`: Geração de sequências

### Contextos e Estados
- `src/contexts/VideoTypeContext.tsx`: Gerenciamento do tipo de vídeo
- Hooks em `src/hooks/`: Processamento e exportação

## Fluxo de Dados
1. Upload → Análise IA → Classificação
2. Revisão → Feedback → Re-treinamento
3. Montagem → Exportação

## Integração com Editores
- Exportação para:
  - Final Cut Pro (FCPXML)
  - Premiere Pro
  - DaVinci Resolve (EDL)

## Desenvolvimento
- Usar Tailwind CSS e shadcn/ui
- Manter componentes separados
- Documentar mudanças no fluxo
- Testar integrações

## Aprendizado Contínuo
- Sistema de feedback na etapa de revisão
- Re-treinamento contínuo do modelo
- Melhoria progressiva da classificação

## Objetivo Final
Criar um pipeline inteligente que:
1. Entenda o contexto de vídeos de casamento
2. Aprenda com feedback do usuário
3. Produza edições prontas para refinamento
4. Economize tempo na pós-produção
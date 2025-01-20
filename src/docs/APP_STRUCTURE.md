# Documentação do Editor de Vídeos de Casamento

## Visão Geral
Este é um software especializado em edição de vídeos de casamento, que utiliza IA para automatizar o processo de organização e edição inicial do material bruto.

## Estrutura de Arquivos Principais

### Componentes Principais
- `src/App.tsx`: Componente principal que gerencia as rotas e estados globais
- `src/components/TopNavigation.tsx`: Barra de navegação superior
- `src/components/VideoTypeIndicator.tsx`: Indicador do tipo de vídeo selecionado

### Fluxo de Trabalho (Steps)

#### Step 1: Seleção de Duração
- Arquivo: `src/components/VideoSizeSelector.tsx`
- Rota: `/duration`
- Função: Permite selecionar a duração desejada do vídeo final
- Opções disponíveis: Trailer (3-5min), Social (30s-1:30min), Short Film (8-12min), etc.

#### Step 2: Seleção de Estilo
- Arquivo: `src/components/editor/VideoStyleSelector.tsx`
- Rota: `/style`
- Função: Escolha do estilo visual do vídeo
- Estilos incluem: Clássico, Moderno, Documentário, etc.

#### Step 3: Seleção de Música
- Arquivo: `src/components/editor/MusicSelector.tsx`
- Rota: `/music`
- Função: Upload e seleção das músicas para a trilha sonora

#### Step 4: Organização de Arquivos
- Arquivo: `src/components/organizer/FileOrganizer.tsx`
- Rota: `/organize`
- Função: Upload e categorização automática dos vídeos brutos
- Categorias: brideprep, groomprep, decoration, drone, ceremony, reception

#### Step 5: Revisão Manual
- Arquivo: `src/components/editor/review/ReviewClassificationStep.tsx`
- Função: Interface para revisar e corrigir a classificação dos vídeos
- Sistema de feedback para melhorar a IA

#### Step 6: Edição Automática
- Arquivo: `src/components/editor/AIEditStep.tsx`
- Função: Montagem automática do vídeo seguindo a narrativa padrão de casamentos

## Serviços e Utilitários Importantes
- `src/services/FileAnalysisService.ts`: Análise de arquivos e classificação
- `src/utils/videoProcessing.ts`: Processamento de vídeo
- `src/utils/premiere/sequenceGenerator.ts`: Geração de sequências para editores profissionais

## Contextos e Estados
- `src/contexts/VideoTypeContext.tsx`: Gerenciamento global do tipo de vídeo
- Hooks personalizados em `src/hooks/` para processamento de arquivos e exportação

## Fluxo de Dados
1. Upload de arquivos → Análise pela IA → Classificação automática
2. Revisão manual → Feedback para a IA → Re-treinamento
3. Montagem automática → Exportação para software profissional

## Integração com Editores Profissionais
- Suporte para exportação em formatos:
  - FCPXML (Final Cut Pro)
  - EDL
  - Premiere Pro Project

## Observações para Desenvolvimento
- Manter a estrutura de componentes separada e organizada
- Seguir o padrão de design system com Tailwind e shadcn/ui
- Documentar alterações que afetem o fluxo de trabalho
- Testar integrações com softwares de edição profissional
---
id: scrum-7
title: SCRUM-7 - Migrações para Componentes - Frontoffice
sidebar_label: SCRUM-7 - Migrações para Componentes - Frontoffice
---

## Descrição
Migrar todos os componentes mockados para a nova arquitetura do framework UI do Arthub Web. A migração já foi iniciada e deve ser finalizada. A partir dessa demanda todos os novos componentes UI que forem desenvolvidos devem seguir o padrão proposto por esta arquitetura. 

---

## Etapas do Desenvolvimento

### 1. Migração dos Componentes UI
- **Objetivo**: Migrar todos os componentes UI mockados para componentes genéricos dentro da pasta UI com sua respectiva classe pai diretiva, localizado em UI/framework. **Obs**: Toda classe pai diretiva precisa extender da classe `UIComponent`
- **Tarefas**:
    - Mapear e analisar os componentes mockados;
    - Transferir suas funcionalidades e comportamentos para a classe pai diretiva;
    - Criar componentes genéricos que derivam da classe pai;
    - Transferir os estilos visuais para os componentes genéricos criados;
    - Ajustar se for preciso a responsividade do componente criado;

### 2. Testes de Desenvolvimento
- **Objetivo**: Testar todos os aspectos dos componentes criados, e garantir que estejam funcionando;
- **Tarefas**:  
    - Testar todos os comportamentos do componente;
    - Testar eventos associados ao componente;
    - Testar responsividade visual do componente;

---

## Critérios de Aceite
- [ ] Arquitetura e padrões de código.
- [ ] Funcionalidades do componente.
- [ ] Comportamento do componente em situações diferentes;
- [ ] Responsividade do componente;
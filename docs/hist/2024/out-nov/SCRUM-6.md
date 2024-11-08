---
id: scrum-6
title: SCRUM-6 - Recurso de Comissões - Backoffice
sidebar_label: SCRUM-6 - Recurso de Comissões - Backoffice
---

## Descrição
Desenvolver um novo microserviço de comissões para o backoffice da plataforma Arthub, permitindo a criação, atualização e consulta de comissões. Nesta primeira etapa, será implementada a base do microserviço, sem as regras de negócio específicas para os tipos de negociação, para viabilizar uma estrutura de código modular e expansível.

Para que uma comissão seja criada é necessário ter a entidade "Serviço" que representa o serviço prestado pelo artista. O cliente deve requisitar a comissão de um serviço já prestado ou pode requisitar uma comissão de um serviço personalizado. Em casos de serviços personalizados o sistema deve criar a entidade de serviço automaticamente, associar ao artista e marca-la como um serviço personalizado.

Então um serviço pode ser criado pelo próprio artista como "Já prestado" ou pode ser criado automaticamente pelo sistema como "Personalizado". 

---

## Etapas do Desenvolvimento

### 1. Criação do Microserviço
- *Objetivo*: Criar um microserviço dedicado ao recurso de comissões, registrando-o no gateway da plataforma.
- *Tarefas*:
  - Configurar um novo projeto Spring Boot para o microserviço de comissões.
  - Implementar o *Spring Security* com filtro de autenticação por *token JWT*, seguindo o padrão de autenticação da plataforma.
  - Configurar o arquivo application.properties com as propriedades de ambiente e banco de dados.
  - Utilizar *H2 Database* para o ambiente de desenvolvimento, facilitando a criação de testes.
  - Configurar *docker-compose* para o microserviço e registro no sistema.
  - Criar as dependências iniciais para JPA, Spring Web, Spring Security e o módulo de H2.

### 2. Estrutura de Pacotes
- *Objetivo*: Definir a estrutura de pacotes de forma modular para facilitar a separação de funcionalidades e garantir uma arquitetura organizada.
- *Tarefas*:
  - Criar pacotes para controller, service, repository, domain.model, domain.enums, domain.event, domain.factory, strategy, dto, e exception.
  - Organizar as classes e interfaces de forma que cada componente fique responsável por uma camada específica.

### 3. Entidades e Camada de Dados
- *Objetivo*: Criar as entidades principais e as interfaces de repositório para gerenciar a persistência das comissões.
- *Tarefas*:
  - Implementar a entidade "Task" que representa o serviço prestado com os atributos id, name, description, taskType, status 
  - Implementar a entidade Commission com atributos como id, description, totalAmount, status, e negotiationType.
  - Criar enums para TaskType, NegotiationType, TaskStatus e CommissionStatus.
  - Configurar o CommissionRepository com Spring Data JPA para operações de CRUD.

#### Diagrama de Relacionamento de Entidades para Comissões

Este diagrama mostra como as entidades estão relacionadas para gerenciar comissões, incluindo o suporte para serviços personalizados criados automaticamente.

```plaintext
+------------+       +------------------+        +----------------+
|   Client   |       |    Commission    |        |      Task      |
+------------+       +------------------+        +----------------+
| - id       |<--+   | - id             |   +--> | - id           |
| - name     |   |   | - type           |   |    | - name         |
| - email    |   |   | - status         |   |    | - type         |
+------------+   |   | - totalAmount    |   |    | - description  |
                 |   | - requestedDate  |   |    +----------------+
                 |   +------------------+   |
                 |                          |
                 |                          |
                 |                          |
              +-------------------+         |
              |      Artist       |         |
              +-------------------+         |
              | - id              |         |
              | - name            |<--------+
              | - portfolio       |
              +-------------------+
```
> Isso é apenas uma figura ilustrativa, não foi feito para se basear em seus dados.

### 4. Implementação da Camada de Serviço
- *Objetivo*: Criar a camada de serviço (CommissionService) que coordena as operações de comissão sem aplicar regras específicas de negociação.
- *Tarefas*:
  - Implementar métodos genéricos no CommissionService, incluindo createCommission, updateCommission, getAllCommissions, e getCommissionById.
  - Adicionar lógica de negócio genérica, mantendo a camada de serviço modular.

### 5. Criação de Endpoints
- *Objetivo*: Expor endpoints REST para operações CRUD de comissões no CommissionController.
- *Tarefas*:
  - Criar endpoints para POST /commission/v1/create, GET /commission/v1/details/{id}, PUT /commissions/v1/update/{id}, e GET /commission/v1/commissions.
  - Configurar os DTOs para entrada e saída de dados.
  - Adicionar validações básicas nas requisições.

### 6. Testes
- *Objetivo*: Garantir o funcionamento do microserviço através de testes unitários e de integração.
- *Tarefas*:
  - Implementar testes unitários para CommissionService e CommissionRepository.
  - Implementar testes de integração para os endpoints do CommissionController.
  - Configurar o banco H2 em modo de teste para os testes de integração.

---

## Critérios de Aceite
- [ ] Microserviço de comissões registrado no gateway e acessível através de endpoints expostos.
- [ ] Autenticação e autorização configuradas com JWT.
- [ ] Endpoints implementados para criação, consulta, atualização e listagem de comissões.
- [ ] Estrutura de pacotes organizada e documentada.
- [ ] Testes unitários e de integração cobrindo o funcionamento básico.
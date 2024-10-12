---
id: getting-started
title: Getting Started
---

# Arthub Microservices

Arthub é uma ferramenta SaaS para o artista digital que deseja elevar seu nível como artista. A plataforma oferece ferramentas de controle e gestão de comissões, artes e sugestões de precificação dos serviços vendidos, além de um marketplace simples para conseguir clientes.

## Instruções para Execução

### Usando Docker (docker-compose)

1. Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.
2. Navegue até o diretório onde está o `docker-compose.yml`.
3. Execute:

```bash
docker-compose up --build
```

4. Acesse a seguinte URL:
   - **Arthub API Gateway**: [http://localhost:8080](http://localhost:8080)

### Usando Script Batch no Windows

1. Navegue até o diretório `resources` de cada microserviço.
2. Renomeie o arquivo `application_no_docker_development.yml` para `application.yml`.
3. Execute o script `start_services_win11.bat`.

---

## Autenticação JWT e Cabeçalho Authorization

Ao utilizar o Arthub Microservices, para proteger as requisições da API, é necessário autenticar-se via JWT (JSON Web Token). Após realizar o login e receber o token JWT, todas as requisições subsequentes que exigem autenticação devem incluir o token no cabeçalho Authorization da seguinte forma:

```plaintext
   Authorization: Bearer <seu-token-jwt>
```

---

## Como Utilizar o Token JWT com Angular (HttpClientModule)
No Angular, usamos o HttpClient para fazer chamadas HTTP. Para adicionar o token JWT ao cabeçalho de requisições, é necessário criar um interceptor ou manualmente incluir o token no cabeçalho da requisição. Aqui está como fazer isso:

1. Certifique-se de ter importado o HttpClientModule no módulo principal da sua aplicação.

```ts
   import { HttpClientModule } from '@angular/common/http';

   @NgModule({
   declarations: [...],
   imports: [HttpClientModule, ...],
   bootstrap: [...]
   })
   export class AppModule {}
```

2. Agora, no seu serviço onde faz as requisições HTTP, adicione o token ao cabeçalho utilizando o HttpHeaders:

```ts
   private apiUrl = 'http://localhost:8080/art/v1/arts';

   constructor(private http: HttpClient) {}

   getArts(token: string) {
      const headers = new HttpHeaders({
         'Authorization': `Bearer ${token}`
      });

      return this.http.get(this.apiUrl, { headers });
   }
```
   
Toda validação do id do usuário é feita através do token JWT fornecido pelo serviço de autenticação. É **regra** do sistema de microserviços **NÃO** transitar o id de conta de usuário nos objetos de payload.

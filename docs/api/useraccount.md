---
id: useraccount
title: Recurso - Contas de Usuário
sidebar_label: Contas de Usuário
---

## Rotas e Endpoints

### Rotas Públicas (sem token)

- ## **Saúde do microserviço**
  **GET:** `/useraccount/actuator/health`<br/>
  **Exemplo de resposta:**<br/>
  ```json
  {
    "status": "UP"
  }
  ```

- ## **Requisitar uma conta**  
  **POST:** `/useraccount/v1/public/requestCreationUserAccount`  
  Requisita uma conta de usuário no sistema do Arthub. Essa requisição não criará a conta do usuário, apenas validará o email enviando um link de confirmação. Porém ele reservará os dados da requisição da conta para que ninguém consiga criar antes dele. 

  O usuário tem 30 minutos para validar seu email, caso passe o tempo e o mesmo não tenha validado o sistema irá liberar os dados da requisição de conta para que outras pessoas eventualmente possam utilizar.
  
  **JSON Body:**
  ```json
  {
      "email": "email@gmail.com",
      "socialName": "Your name", 
      "username": "@yourUsername",
      "password": "yourPassword@WithSpecialCaracthrs129",
      "userAccountType": "Artist",
      "fullName": "Your full name",
      "dateOfBirth": "2009-10-04"
  }
  ```
  Todos os atributos são **obrigatórios** para a autenticação:

  Exemplo de resposta de sucesso:
  ```json
  {
      "status": 200,
      "hasErrors": false,
      "data": "Account requested successfully! Waiting for email confirmation \"email@gmail.com\"."
  }
  ```

- ## **Autenticação**
  **POST:** `/useraccount/v1/public/login`<br/>
  Realiza a autenticação do usuário no sistema do Arthub. Cada requisição bem sucedida o microserviço irá retornar um novo token, mas isso não quer dizer que o token passado não possa ser usado. Cada token de autenticação tem um tempo de expiração de 8 horas e um dado único da conta do usuário.

  Resumindo, você ainda pode utilizar o primeiro token que você receber, desde que ele não tenha expirado e contenha os dados corretos do usuário.
  **JSON Body:**
  ```json
  {
      "email": "email@gmail.com",
      "password": "your-passowrd"
  }
  ```
  Todos os atributos são **obrigatórios** para a autenticação:

  Exemplo de resposta de sucesso: 
  ```json
  {
    "status": 200,
    "hasErrors": false,
    "data": {
        "authenticated": true,
        "message": "User authenticated!",
        "accountId": "{accountId}",
        "username": "@vitin",
        "token": "{tokenJwt}"
    }
  }
  ```
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
        "username": "@vitin",
        "token": "{tokenJwt}"
    }
  }
  ```

- ## **Requisição de Troca de Senha (Esqueci Minha Senha)**
  **PATCH:** `/useraccount/v1/public/changePassword/request?accountEmail={email}`<br/>
  Endpoint que faz parte do serviço "Esqueci minha senha" do sistema do Arthub. Esse endpoint não irá mudar a senha da conta do usuário, e sim requisitar esse serviço enviando um email com o link da troca da senha. 

  **Necessita** do parâmetro `"accountEmail"` para a confirmação do email e para o envio do link de troca. Caso o email não esteja cadastrado no sistema ele irá retornar um status de erro `400` não permitindo o envio do email. Você sempre verifica se a requisição não teve sucesso com o atributo padrão `"hasErrors"` que se retorna true siginifca que a requisição não foi bem sucedida.

  Exemplo de resposta de sucesso: 
  ```json
  {
    "status": 200,
    "hasErrors": false,
    "data": "Password change link sent successfully to email \"email@gmail.com\"."
  }
  ```

- ## **Validação do Token de Troca de Senha (Esqueci Minha Senha)**
  **GET:** `/useraccount/v1/public/changePassword/validateToken?token={email}`<br/>
  Endpoint que faz parte do serviço "Esqueci minha senha" do sistema do Arthub. Ele serve para validar se o token de troca de senha enviado para o email do usuário é válido ainda. Muito útil para validar na tela do frontoffice se deve mostrar os campos de "nova senha" ou se deve retornar uma mensagem de erro para o usuário.

  Caso o token esteja válido o microserviço retornará o atributo `"status"` como `200`. Então em um exemplo, se o status retorna 200 mostra os campos para alterar a senha, caso seja diferente de 200 não mostra os campos e retorna uma mensagem de erro negando a ação.

  O parâmetro `token` é **obrigatório** para que a requisição seja bem sucedida.

  Exemplo de resposta de sucesso: 
  ```json
  {
    "status": 200,
    "hasErrors": false,
    "data": "Valid token."
  }
  ``` 

- ## **Troca de Senha da Conta de Usuário (Esqueci Minha Senha)**
  **POST:** `/useraccount/v1/public/changePassword/change?token={email}`<br/>
  Endpoint que faz parte do serviço "Esqueci minha senha" do sistema do Arthub. Esse é o endpoint que mudará a senha da conta do usuário. O token é obrigatório pois ele valida se o token é valido para a ação, e também o serviço valida a senha de acordo com as regras do cadastro de conta.

  **JSON Body:**
  ```json
  {
      "newPassword": "your password"
  }
  ```

  O único atributo `"newPassword"` é **obrigatório* para que a requisição seja bem sucedida.

    Exemplo de resposta de sucesso: 
  ```json
  {
    "status": 200,
    "hasErrors": false,
    "data": "Account password changed successfully."
  }
  ``` 


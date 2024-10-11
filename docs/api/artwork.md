---
id: artwork
title: Recurso - Artes
sidebar_label: Artes
---

## Rotas e Endpoints

### Rotas Públicas (sem token)

- ## **Saúde do microserviço**
  **GET:** `/art/actuator/health`<br/>
  **Exemplo de resposta:**<br/>
  ```json
  {
    "status": "UP"
  }
  ```
---

### Rotas Privadas (com token)

- ## **Registro de arte**
  **POST:** `/art/v1/create`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Registra uma arte no sistema do Arthub.
  
  **JSON Body:**
  ```json
    {
        "artName": "Art name",
        "haveSchedule": true,
        "accountId": "{useraccount-id}",
        "startScheduleDate": "2024-10-04",
        "endScheduleDate": "2024-10-05",
        "artImageRef": [
            {
                "uploadType": "PINTEREST_API",
                "imageBytes": null,
                "imageLink": "https://i.pinimg.com/564x/dc/63/35/dc63358c2084dba8c066fa932b95190f.jpg"
            },
            ...
        ] 
    }
  ```
  Você pode enviar as imagens de referência por duas formas:
  1. Utilizando a integração com o Pinterest. O Arthub oferece a opção do usuário escolher imagens do pinterest, se esse for o caso o `uploadType` deve ter o valor de **`"PINTEREST_API"`**, o link da imagem deve ser fornecido no atributo `imageLink` e nesse caso **obrigatóriamente** o atributo `imageBytes` **deve** ser nulo, como no exemplo acima;

  2. Fazendo upload do arquivo imagem do próprio dispositivo do usuário. Nesse caso ele vai poder fornecer o a imagem do dispositivo, e para isso o `uploadType` deve ter o valor de **`"DEVICE_UPLOAD"`**, os bytes do arquivo imagem devem ser fornecidos no atributo `imageBytes` e **obrigatóriamente** o atributo `imageLink` **deve** ser nulo, como no exemplo abaixo:
  ```json
    {
        "uploadType": "DEVICE_UPLOAD",
        "imageBytes": "{bytes}",
        "imageLink": null
    }
  ```

  Atributos **obrigatórios** para o registro:
  - `"artName"`;
  - `"accountId"`;
  - `"haveSchedule"`;

  Exemplo de respota de sucesso:
  ```json
    {
        "status": 201,
        "hasErrors": false,
        "data": "Art created successfully."
    }
  ```


- ## **Listar todas as artes registradas de um usuário**
  **GET:** `/art/v1/arts`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Listagem de todas as artes registradas de um usuário no sistema do Arthub. O microserviço de artes valida e busca o id do usuário pelo token jwt fornecido no cabeçalho da requisição, aumentando a simplicidade dos endpoints para o frontoffice. 

  Basta fornecer o token jwt e realizar um GET para esse endpoint que o microserviço trará as artes.
  Exemplo de resposta:
  ```json
    {
        "status": 200,
        "hasErrors": false,
        "data": [
            {
                "artId": "53e8b8b2-951b-436d-82bb-f03a8b16a0ba",
                "artName": "Yui Drawning",
                "visibility": "PRIVATE",
                "status": "TODO",
                "imgRefs": [
                    {
                        "imgRefId": "78f438cc-31e9-4379-86cc-65d6c7f6a8f0",
                        "imageLink": "https://i.pinimg.com/564x/dc/63/35/dc63358c2084dba8c066fa932b95190f.jpg"
                    },
                    ...
                ],
                "haveSchedule": true,
                "startScheduleDate": "2024-10-04",
                "endScheduleDate": "2024-10-05",
                "createdAt": "2024-10-11T17:15:10.966428",
                "createdAtText": "4 days ago",
                "lastModified": "2024-10-11T17:15:10.966433",
                "lastModifiedText": "5 days ago"
            },
            ...
        ]
    }
  ```


- ## **Atualizar dados da arte**
  **GET:** `/art/v1/update?artId={artId}`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Edita os dados da arte, exceto as imagens de referências e entre outras entidades filhas. Caso queria atualizar esses dados é necessário utilizar endpoints separados.
  Essa requisição requer o parâmetro `artId` para o funcionamento adequado.
 
 **JSON Body:**
 ```json
    {
        "artName": "Yui Drawning Updated",
        "haveSchedule": false,
        "startScheduleDate": "2024-10-04",
        "endScheduleDate": "2024-10-05"
    }
 ```
 Atributos **obrigatórios** para a edição:
  - `"artName"`;
  - `"haveSchedule"`;

Exemplo de respota de sucesso:
```json
{
    "status": 200,
    "hasErrors": false,
    "data": "Artwork data updated successfully."
}
```

- ## **Atualizar imagens de referência**
  **GET:** `/art/v1/imgRef/update?artId={artId}`<br/>
  **HEADER - Authorization: Bearer Token**<br/> 
  Atualiza as imagens de referência de uma arte. Essa requisição requer o parâmetro `artId` para o funcionamento adequado.

  **JSON Body:**
  ```json
    {
        "artImageRef": [
            {
                "refId": "8ebe2242-5399-4638-983a-55ff59294e76",
                "uploadType": "PINTEREST_API",
                "imageBytes": null,
                "imageLink": "https://i.pinimg.com/736x/bb/9a/62/bb9a62b500cfc9c4b025905f62e772dd.jpg"
            },
            {
                "refId": "c3e5e783-e560-464f-9bb6-842935331282",
                "uploadType": "PINTEREST_API",
                "imageBytes": null,
                "imageLink": "https://i.pinimg.com/736x/bb/9a/62/bb9a62b500cfc9c4b025905f62e772dd.jpg"
            },
            ...
        ] 
    }
  ```

   Todos os atributos são obrigatórios.

   Exemplo de resposta de sucesso:
   ```json
    {
        "status": 200,
        "hasErrors": false,
        "data": "Reference images updated successfully."
    }
   ```

- ## **Deleção completa**
  **DELETE:** `/art/v1/fullDelete?artId={artId}`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Apaga todos os dados de uma arte e de suas entidades filhas, ou seja, é uma deleção por completo. Atualmente uma vez em que os dados forem apagados, jamais poderão ser recuperados. Futuramente iremos trabalhar em uma implementação de soft delete, onde incluiremos um backup dos dados 'deletados'. 
  
  Esse endpoint não retorna corpo de resposta, apenas um status de `204 - No Content`, o que significa que a arte foi deletada por completo com sucesso.
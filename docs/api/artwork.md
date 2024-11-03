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

- ## **Obter imagem de referência**
  **GET:** `/art/v1/imgReference/get-image/{imgRefId}`<br/>
  Obtém a imagem de referência.

  **ATENÇÃO**! Esse serviço retornará apenas imagens de referência que foram feitos uploads do tipo `DEVICE_UPLOAD`. Caso você tente buscar uma imagem de referência externa o sistema retornará com um erro dizendo que o tipo de upload é inválido para essa operação.

  Então você deve utilizar esse serviço **APENAS** em imagens de referência do tipo `DEVICE_UPLOAD`, e isso pode ser controlado pelo atributo `"externalUpload"` na listagem de artes e no detalhamento de artes!

  Você deve utilizar a chamada desse serviço diretamente no atributo `src` de uma tag `<img>`
  
  Exemplo:
  ```html
  <img src="http://.../art/v1/imgReference/get-image/{imgRefId}">
  ```

- ## **Obter imagem produto**
  **GET:** `/art/v1/imageProd/get-image/{artId}`<br/>
  Obtém a imagem produto.

  Você deve utilizar a chamada desse serviço diretamente no atributo `src` de uma tag `<img>`

  Exemplo:
  ```html
  <img src="http://.../art/v1/imageProd/get-image/{artId}">
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
        "startScheduleDate": "2024-10-04",
        "endScheduleDate": "2024-10-05",
        "artImageRef": [
            {
                "uploadType": "PINTEREST_API",
                "fileData": {
                  "base64": null,
                  "fileName": null,
                  "contentType": null
                },
                "imageLink": "https://i.pinimg.com/564x/dc/63/35/dc63358c2084dba8c066fa932b95190f.jpg"
            },
            ...
        ] 
    }
  ```
  Você pode enviar as imagens de referência por duas formas:
  1. Utilizando a integração com o Pinterest. O Arthub oferece a opção do usuário escolher imagens do pinterest, se esse for o caso o `uploadType` deve ter o valor de **`"PINTEREST_API"`**, o link da imagem deve ser fornecido no atributo `imageLink` e nesse caso **obrigatóriamente** o objeto `fileData` e seus atributos **devem** ser nulos, como no exemplo acima;

  2. Fazendo upload do arquivo imagem do próprio dispositivo do usuário. Nesse caso ele vai poder fornecer a imagem do dispositivo, e para isso o `uploadType` deve ter o valor de **`"DEVICE_UPLOAD"`**, o objeto `fileData` deve ter o atributo `"base64"` preenchido com os bytes do arquivo imagem no formato `BASE 64`, o atributo `fileName` preenchido com o nome do arquivo,  o atributo `contentType` com o content type do arquivo, e **obrigatóriamente** o atributo `imageLink` **deve** ser nulo, como no exemplo abaixo:
  ```json
    {
        "uploadType": "DEVICE_UPLOAD",
        "fileData": {
          "base64": "{base64}...",
          "fileName": "my_image.png",
          "contentType": "image/png"
        },
        "imageLink": null
    }
  ```
  Você pode usar essa função javascript como exemplo para obter o base64 do arquivo:
  ```javascript
  async function fileToBase64(file) {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function(event) {
              // Obtém apenas o conteúdo Base64 e remove possíveis espaços extras
              resolve(event.target.result.split(',')[1].trim());  
          };
          reader.onerror = function(error) {
              reject(error);
          };
          reader.readAsDataURL(file);  // Lê o arquivo e o converte em Base64
      });
  }

  const fileInputs = document.querySelectorAll('.fileInput');
  let b = await fileToBase64(fileInputs[i].files[0]);
  if (fileInputs[i].files[0]) {
    fileData = {
        base64: b,  // Codifica para Base64
        fileName: fileInputs[i].files[0].name,
        contentType: fileInputs[i].files[0].type
    };
  }
  ```

  ### Tipos de arquivos aceito nesse serviço:
  - `.png`
  - `.jpeg`
  - `.webp`

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

- ## **Detalhar uma arte registrada**
  **GET:** `/art/v1/details/{art-id}`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Detalha os dados de uma arte registrada no sistema do Arthub pelo o ID da arte. Esse método validará se a arte pertence de fato ao usuáario pelo token jwt fornecido na requisição. Essa requisição requer o path variable `{art-id}` para o funcionamento adequado.

  Exemplo de resposta:
  ```json
  {
    "status": 200,
    "hasErrors": false,
    "data": {
      "artId": "4019d7b5-c326-4329-8ebf-e3d9e2e92869",
      "artName": "Art Updated",
      "visibility": "NOT_LISTED",
      "status": "PROGRESS",
      "imgRefs": [
          {
              "imgRefId": "0f293dbc-f95b-4be3-9e86-b41d9412f12f",
              "imageLink": "https://i.pinimg.com/564x/00/73/13/007313698e90b12f40532d6ea72fff10.jpg",
              "externalUpload": true
          },
          ...
      ],
      "imgProduct": {
          "imgProductId": "d4cf6174-987b-4977-a07a-8f55de196f48",
          "imageLink": "imageProd/get-image/d4cf6174-987b-4977-a07a-8f55de196f48"
      },
      "haveSchedule": false,
      "startScheduleDate": null,
      "endScheduleDate": null,
      "createdAt": "2024-11-03T15:10:38.03283",
      "createdAtText": "28 minutes ago",
      "lastModified": "2024-11-03T15:10:38.032831",
      "lastModifiedText": "28 minutes ago"
    }
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
                        "imageLink": "https://i.pinimg.com/564x/dc/63/35/dc63358c2084dba8c066fa932b95190f.jpg",
                        "externalUpload": true
                    },
                    ...
                ],
                "imgProduct": {
                  "imgProductId": "d4cf6174-987b-4977-a07a-8f55de196f48",
                  "imageLink": "imageProd/get-image/d4cf6174-987b-4977-a07a-8f55de196f48"
                },
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

- ## **Adicionar imagens de referência**
  **POST:** `/art/v1/imgReference/add?artId={artId}`<br/>
  **HEADER - Authorization: Bearer Token**<br/> 
  Adiciona imagens de referência de uma arte. Essa requisição requer o parâmetro `artId` para o funcionamento adequado.

  Diferente do serviço de atualizar imagens de referência, esse serviço não requer o id da referência, uma vez que a intenção do serviço é adicionar uma referência que ainda não está associada a arte.

  Você pode inserir imagens de referência em lote de uma vez nesse serviço, por isso ele espera uma lista no corpo da requisição.

  **JSON Body:**
  ```json
  {
    "artImageRef": [
        {
            "uploadType": "PINTEREST_API", 
            "fileData": {
                "base64": null,
                "fileName": null,
                "contentType": null
            },
            "imageLink": "https://i.pinimg.com/564x/16/32/af/1632afab937590240e9f01942109ee56.jpg"
        },
        ...
    ]
  }
  ```
  Esse serviço segue as mesmas regras do serviço de criação de arte na parte de imagens de referência.

  Apenas o atributo `"refId"` **NÃO** é requirido, se por acaso o mesmo for informado o sistema irá ignorar e seguir com a operação.

  ### Tipos de arquivos aceito nesse serviço:
  - `.png`
  - `.jpeg`
  - `.webp`

  Exemplo de resposta de sucesso:
   ```json
    {
        "status": 200,
        "hasErrors": false,
        "data": "Reference images added successfully."
    }
   ```

- ## **Atualizar imagens de referência**
  **PUT:** `/art/v1/imgReference/update?artId={artId}`<br/>
  **HEADER - Authorization: Bearer Token**<br/> 
  Atualiza as imagens de referência de uma arte. Essa requisição requer o parâmetro `artId` para o funcionamento adequado.

  A intenção desse serviço é trocar a imagem de uma referência já associada a arte, por isso é necessário o id da referência no corpo da requisição, então o atributo `"refId"` é **obrigatório**.

  **JSON Body:**
  ```json
    {
      "artImageRef": [
          {
              "refId": "8ebe2242-5399-4638-983a-55ff59294e76",
              "uploadType": "DEVICE_UPLOAD",
              "fileData": {
                "base64": "{base64}...",
                "fileName": "my_image.png",
                "contentType": "image/png"
              },
              "imageLink": null
          },
          {
              "refId": "c3e5e783-e560-464f-9bb6-842935331282",
              "uploadType": "PINTEREST_API",
              "fileData": {
                "base64": null,
                "fileName": null,
                "contentType": null
              },
              "imageLink": "https://i.pinimg.com/736x/bb/9a/62/bb9a62b500cfc9c4b025905f62e772dd.jpg"
          },
          ...
      ] 
    }
  ```
  Esse serviço segue as mesmas regras do serviço de criação de arte na parte de imagens de referência.

  Todos os atributos são obrigatórios.

  ### Tipos de arquivos aceito nesse serviço:
  - `.png`
  - `.jpeg`
  - `.webp`

  Exemplo de resposta de sucesso:
   ```json
    {
        "status": 200,
        "hasErrors": false,
        "data": "Reference images updated successfully."
    }
   ```

- ## **Deleção de imagens de referência**
  **POST:** `/art/v1/imgReference/delete?artId={artId}`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Apaga as imagens de referência informadas no corpo da requisição. Essa requisição requer o parâmetro `artId` para o funcionamento adequado.

  Você pode utilizar esse método para apagar imagens específicas ou apagar todas, e isso é controlado pelo atributo `"clearAll"` no corpo da requisição.
  
  Caso o mesmo seja `true` ele irá ignorar a lista informada e irá apagar todas as imagens de referências associadas a arte, sem excessão de nenhuma.

  Caso o mesmo seja `false` ele irá apagar apenas as referências da lista informada. 

  Os valores dentro da lista **DEVEM** ser **APENAS** os IDs das referências.

  **JSON Body:**
  ```json
  {
    "clearAll": false,
    "refsId": ["df7437d2-5148-4c32-889e-c2cb1ba21b8d", ...]
  }
  ``` 

- ## **Deleção completa**
  **DELETE:** `/art/v1/fullDelete?artId={artId}`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Apaga todos os dados de uma arte e de suas entidades filhas, ou seja, é uma deleção por completo. Atualmente uma vez em que os dados forem apagados, jamais poderão ser recuperados. Futuramente iremos trabalhar em uma implementação de soft delete, onde incluiremos um backup dos dados 'deletados'. 
  
  Esse endpoint não retorna corpo de resposta, apenas um status de `204 - No Content`, o que significa que a arte foi deletada por completo com sucesso.


- ## **Mudar status da arte**
  **PATCH:** `/art/v1/changeStatus?artId={artId}&status={status}`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Altera o status de uma arte registrada no sistema do Arthub. Esta operação requer um `artId` e um novo `status` para a arte. O status da arte deve seguir uma ordem lógica de progresso, conforme as regras abaixo:

  ### Regras de mudança de status:
  - Uma arte registrada começa com o status **TODO** e pode progredir para **PROGRESS**.
  - A partir do status **PROGRESS**, a arte pode ser finalizada (**FINISHED**) ou arquivada (**DRAWNER**).
  - **Não é permitido voltar ao status TODO** após a arte ter iniciado o progresso.
  - Caso uma arte esteja arquivada (**DRAWNER**) ou finalizada (**FINISHED**), ela pode ser reaberta para progresso retornando ao status **PROGRESS**.
  - **Não é permitido** mudar diretamente de **FINISHED** para **DRAWNER** ou vice-versa.

  ### Status disponíveis:
  - `TODO`: Arte ainda não iniciada.
  - `PROGRESS`: Arte em progresso.
  - `FINISHED`: Arte finalizada.
  - `DRAWNER`: Arte arquivada.

  **Exemplo de resposta de sucesso:**
  ```json 
  {
      "status": 200,
      "hasErrors": false,
      "data": "Status changed successfully."
  }
  ```

- ## **Mudar visibilidade da arte**
  **PATCH:** `/art/v1/changeVisibility?artId={artId}&visibility={visibility}`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Altera a visibilidade de uma arte registrada no sistema do Arthub. Esta operação requer um `artId` e a `visibility` para a arte. A visibilidade da arte deve seguir uma ordem lógica de progresso, conforme as regras abaixo:
  
  ### Regras de mudança de visibilidade:
  - Para uma arte se tornar pública ela deve ter uma imagem produto associada primeiro.

  ### Status disponíveis:
  - `PUBLIC`: Visível para consulta pública, inclusive no perfil artístico.
  - `PRIVATE`: Privada para consulta pública, apenas a artista tem acessso.
  - `NOT_LISTED`: Privada para consulta pública, exceto para quem possuir o link de acesso.
  

- ## **Associar uma imagem produto à uma arte**
  **PATCH:** `/art/v1/imgProduct/add?artId={artId}&file={file_bytes}`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Associa uma imagem produto a uma arte registrada no sistema do Arthub. É necessário que a arte **NÃO** esteja em `TODO`, caso contrário a operação será interrompida com um erro. 

  Nessa requisição em específico os bytes da imagem são passados por parâmetros da requisição com o nome de `file` (form-data), diferente do serviço de crição de arte, de adicionar imagens de referência e de atualizar imagens de referência que utilizam o base64 como trasferência de arquivos.

  Aqui está um exemplo de uma função javascript que monta um POST passando os bytes do arquivo no formato form-data:
  ```javascript
  async function addImageProduct(artId, authToken) {
    const url = '/imgProduct/add';

    // Cria um objeto FormData para enviar o arquivo e o UUID
    const formData = new FormData();
    formData.append('artId', artId);
    formData.append('file', document.querySelector('#imageInput').files[0]);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': authToken
        },
        body: formData
      });

      // Verifica se a resposta é bem-sucedida
      if (response.ok) {
        const data = await response.json();
        console.log('Imagem adicionada com sucesso:', data);
      } else {
        console.error('Erro ao adicionar imagem:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }
  ```
  ### Tipos de arquivos aceito nesse serviço:
  - `.png`
  - `.jpeg`
  - `.webp`

  Exemplo de resposta de sucesso:
  ```json
  {
    "status": 200,
    "hasErrors": false,
    "data": "Product image added successfully."
  }
  ```

- ## **Atualizar uma imagem produto de uma arte**
  **PUT:** `/art/v1/imgProduct/update/{art-id}`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Atualizar uma imagem produto de uma arte registrada no sistema do Arthub. É necessário que a arte **NÃO** esteja em `TODO`, caso contrário a operação será interrompida com um erro. 

  Nessa requisição em específico os bytes da imagem são passados por parâmetros da requisição com o nome de `file` (form-data), diferente do serviço de crição de arte, de adicionar imagens de referência e de atualizar imagens de referência que utilizam o base64 como trasferência de arquivos.

  Aqui está um exemplo de uma função javascript que monta um POST passando os bytes do arquivo no formato form-data:
  ```javascript
  async function addImageProduct(artId, authToken) {
    const url = '/imgProduct/update';

    // Cria um objeto FormData para enviar o arquivo e o UUID
    const formData = new FormData();
    formData.append('artId', artId);
    formData.append('file', document.querySelector('#imageInput').files[0]);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': authToken
        },
        body: formData
      });

      // Verifica se a resposta é bem-sucedida
      if (response.ok) {
        const data = await response.json();
        console.log('Imagem atualizada com sucesso:', data);
      } else {
        console.error('Erro ao atualizar imagem:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }
  ```
  ### Tipos de arquivos aceito nesse serviço:
  - `.png`
  - `.jpeg`
  - `.webp`

  Exemplo de resposta de sucesso:
  ```json
  {
    "status": 200,
    "hasErrors": false,
    "data": "Product image updated successfully."
  }
  ```

- ## **Deletar uma imagem produto de uma arte**
  **DELETE:** `/art/v1/imgProduct/delete/{art-id}`<br/>
  **HEADER - Authorization: Bearer Token**<br/>
  Deletar uma imagem produto de uma arte registrada no sistema do Arthub pelo id da arte.


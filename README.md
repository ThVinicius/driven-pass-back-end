# projeto19-drivenPass

Project developed using TypeScript for password management

<p align="center">
  <img  src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png">
</p>
<h1 align="center">
  Driven Pass
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

Driven pass is a password management api. Stored passwords are encrypted.

</br>

## Features

- Create accounts and access them
- Store, fetch and delete credential passwords
- Store, fetch and delete secure notes
- Store, fetch and delete card passwords
- Store, fetch and delete wifi passwords

</br>

## API Reference

### Authentication routes

#### Create an account

```http
POST /signUp
```

<h3>Request:</h3>

| Params     | Type     | Description                                        |
| :--------- | :------- | :------------------------------------------------- |
| `email`    | `string` | **Required**, **email format**                     |
| `password` | `string` | **Required**, **size equal to or greater than 10** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                              |
| :---------- | :------------------------------------------------- |
| `400`       | _Email and/or password in incorrect format_        |
| `409`       | _try to register with an email already registered_ |

<h3>Success case (status code <span style="color:green">201</span>)</h3>

#

### Access to an account

```http
POST /signIn
```

<h3>Request:</h3>

| Params     | Type     | Description                                        |
| :--------- | :------- | :------------------------------------------------- |
| `email`    | `string` | **Required**, **email format**                     |
| `password` | `string` | **Required**, **size equal to or greater than 10** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                       |
| :---------- | :------------------------------------------ |
| `400`       | _Email and/or password in incorrect format_ |
| `401`       | _Incorrect email and/or password_           |

<h3>Success case (status code <span style="color:green">200:</span>)</h3>

```jsx
token: // json web token
```

#

### Credential routes

#### Store a credential

```http
POST /credentials
```

<h3>Request:</h3>
<h4>Body:</h4>

| Params     | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `label`    | `string` | **required**, **trim** |
| `url`      | `string` | **required**, **uri**  |
| `username` | `string` | **required**, **trim** |
| `password` | `string` | **required**           |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                                     |
| :---------- | :-------------------------------------------------------- |
| `400`       | _Request in wrong format_                                 |
| `401`       | _Invalid token_                                           |
| `409`       | _Try to register a credential with an already used label_ |
| `426`       | _Outdated token_                                          |
| `498`       | _Expired token_                                           |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```jsx

{
  id: 1, // credential id
  userId: 1, // user id
  label: "senha do gmail",
  url: "https://gmail.com",
  username: "test@gmail.com",
  senha: "123" // the password is encrypted in the database
}

```

#

#### Fetch all user credentials

```http
GET /credentials
```

<h3>Request:</h3>

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                     |
| :---------- | :------------------------ |
| `400`       | _Request in wrong format_ |
| `401`       | _Invalid token_           |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
[
  {
    "id": 1,
    "userId": 1,
    "label": "senha do gmail",
    "url": "https://gmail.com",
    "username": "test@gmail.com",
    "password": "123"
  },
  {
    "id": 2,
    "userId": 1,
    "label": "senha do hotmail",
    "url": "https://hotmail.com",
    "username": "test@hotmail.com",
    "password": "123"
  }
]
```

#

#### Fetch a credential by id

```http
GET /credentials/id
```

<h3>Request:</h3>

<h4>Params:</h4>
Send to route address, Ex: /credentials/1

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **required**, **greater than 0** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                      |
| :---------- | :----------------------------------------- |
| `400`       | _Request in wrong format_                  |
| `401`       | _Invalid token or no permission to access_ |
| `404`       | _There is no data with this id_            |
| `426`       | _Outdated token_                           |
| `498`       | _Expired token_                            |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
{
  "id": 1,
  "userId": 1,
  "label": "senha do gmail",
  "url": "https://gmail.com",
  "username": "test@gmail.com",
  "password": "123"
}
```

#

#### Delete a credential by id

```http
DELETE /credentials/id
```

<h3>Request:</h3>

<h4>Params:</h4>
Send to route address, Ex: /credentials/1

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **required**, **greater than 0** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                      |
| :---------- | :----------------------------------------- |
| `400`       | _Request in wrong format_                  |
| `401`       | _Invalid token or no permission to access_ |
| `404`       | _There is no data with this id_            |
| `426`       | _Outdated token_                           |
| `498`       | _Expired token_                            |

<h3>Success case (status code <span style="color:green">200</span>)</h3>

#

### Secure notes routes

#### Store a secure notes

```http
POST /secureNotes
```

<h3>Request:</h3>
<h4>Body:</h4>

| Params       | Type     | Description                                    |
| :----------- | :------- | :--------------------------------------------- |
| `title`      | `string` | **required**, **trim**, **maximum size: 50**   |
| `annotation` | `string` | **required**, **trim**, **maximum size: 1000** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                                      |
| :---------- | :--------------------------------------------------------- |
| `400`       | _Request in wrong format_                                  |
| `401`       | _Invalid token_                                            |
| `409`       | _Try to register a secure note with an already used title_ |
| `426`       | _Outdated token_                                           |
| `498`       | _Expired token_                                            |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
{
  "id": 5,
  "userId": 1,
  "label": "não esquecer!",
  "title": "levar o cachorro para passear",
  "annotation": "acordar cedo para fazer a tarefa"
}
```

#

#### Fetch all user secure notes

```http
GET /secureNotes
```

<h3>Request:</h3>

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                     |
| :---------- | :------------------------ |
| `400`       | _Request in wrong format_ |
| `401`       | _Invalid token_           |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "senha do gmail",
    "annotation": "123"
  },
  {
    "id": 2,
    "userId": 1,
    "title": "senha do hotmail",
    "annotation": "1234"
  }
]
```

#

#### Fetch a secure note by id

```http
GET /secureNotes/id
```

<h3>Request:</h3>

<h4>Params:</h4>
Send to route address, Ex: /secureNotes/1

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **required**, **greater than 0** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                      |
| :---------- | :----------------------------------------- |
| `400`       | _Request in wrong format_                  |
| `401`       | _Invalid token or no permission to access_ |
| `404`       | _There is no data with this id_            |
| `426`       | _Outdated token_                           |
| `498`       | _Expired token_                            |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
{
  "id": 1,
  "userId": 1,
  "title": "senha do gmail",
  "annotation": "123"
}
```

#

#### Delete a secure note by id

```http
DELETE /secureNotes/id
```

<h3>Request:</h3>

<h4>Params:</h4>
Send to route address, Ex: /secureNotes/1

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **required**, **greater than 0** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                      |
| :---------- | :----------------------------------------- |
| `400`       | _Request in wrong format_                  |
| `401`       | _Invalid token or no permission to access_ |
| `404`       | _There is no data with this id_            |
| `426`       | _Outdated token_                           |
| `498`       | _Expired token_                            |

<h3>Success case (status code <span style="color:green">200</span>)</h3>

#

### Cards routes

#### Store a card

```http
POST /cards
```

<h3>Request:</h3>
<h4>Body:</h4>

| Params           | Type      | Description                                             |
| :--------------- | :-------- | :------------------------------------------------------ |
| `label`          | `string`  | **required**, **trim**                                  |
| `number`         | `string`  | **required**, **format: #### #### #### ####**           |
| `cardholderName` | `string`  | **required**, **trim**                                  |
| `securityCode`   | `string`  | **required**, **format: ###**                           |
| `expirationDate` | `string`  | **required**, **format: MM/YY**                         |
| `password`       | `string`  | **required**, **length: 4 or 6**                        |
| `isVirtual`      | `boolean` | **required**                                            |
| `type`           | `string`  | **required**, **only: credit, debit, credit_and_debit** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                               |
| :---------- | :-------------------------------------------------- |
| `400`       | _Request in wrong format_                           |
| `401`       | _Invalid token_                                     |
| `409`       | _Try to register a card with an already used label_ |
| `426`       | _Outdated token_                                    |
| `498`       | _Expired token_                                     |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
{
  "id": 6,
  "userId": 1,
  "label": "cartão inter",
  "number": "1234 1234 1234 1234",
  "cardholderName": "FULANO P S",
  "securityCode": "123", // the security code is encrypted in the database
  "expirationDate": "12/27",
  "password": "1234", // the password is encrypted in the database
  "isVirtual": false,
  "type": "debit"
}
```

#

#### Fetch all user cards

```http
GET /cards
```

<h3>Request:</h3>

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                     |
| :---------- | :------------------------ |
| `400`       | _Request in wrong format_ |
| `401`       | _Invalid token_           |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
[
  {
    "id": 1,
    "userId": 1,
    "label": "cartão inter",
    "number": "1234 1234 1234 1234",
    "cardholderName": "VINICIUS P S",
    "securityCode": "123",
    "expirationDate": "12/27",
    "password": "1234",
    "isVirtual": false,
    "type": "debit"
  },
  {
    "id": 3,
    "userId": 1,
    "label": "cartão nubank",
    "number": "1234 1234 1234 1234",
    "cardholderName": "FULANO P S",
    "securityCode": "123",
    "expirationDate": "12/27",
    "password": "1234",
    "isVirtual": false,
    "type": "credit"
  }
]
```

#

#### Fetch a card by id

```http
GET /cards/id
```

<h3>Request:</h3>

<h4>Params:</h4>
Send to route address, Ex: /cards/1

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **required**, **greater than 0** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                      |
| :---------- | :----------------------------------------- |
| `400`       | _Request in wrong format_                  |
| `401`       | _Invalid token or no permission to access_ |
| `404`       | _There is no data with this id_            |
| `426`       | _Outdated token_                           |
| `498`       | _Expired token_                            |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
{
  "id": 1,
  "userId": 1,
  "label": "cartão inter",
  "number": "1234 1234 1234 1234",
  "cardholderName": "FULANO P S",
  "securityCode": "123",
  "expirationDate": "12/27",
  "password": "1234",
  "isVirtual": false,
  "type": "debit"
}
```

#

#### Delete a card by id

```http
DELETE /cards/id
```

<h3>Request:</h3>

<h4>Params:</h4>
Send to route address, Ex: /cards/1

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **required**, **greater than 0** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                      |
| :---------- | :----------------------------------------- |
| `400`       | _Request in wrong format_                  |
| `401`       | _Invalid token or no permission to access_ |
| `404`       | _There is no data with this id_            |
| `426`       | _Outdated token_                           |
| `498`       | _Expired token_                            |

<h3>Success case (status code <span style="color:green">200</span>)</h3>

#

### Wireless routes

#### Store a wifi

```http
POST /wireless
```

<h3>Request:</h3>
<h4>Body:</h4>

| Params        | Type     | Description            |
| :------------ | :------- | :--------------------- |
| `label`       | `string` | **required**, **trim** |
| `networkName` | `string` | **required**, **trim** |
| `password`    | `string` | **required**           |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                     |
| :---------- | :------------------------ |
| `400`       | _Request in wrong format_ |
| `401`       | _Invalid token_           |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
{
  "id": 3,
  "userId": 1,
  "label": "wifi do vizinho",
  "networkName": "Não roube meu wifi",
  "password": "senhaQueNenhumVizinhoConsegueDescobrir" // the password is encrypted in the database
}
```

#

#### Fetch all user wireless

```http
GET /wireless
```

<h3>Request:</h3>

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                     |
| :---------- | :------------------------ |
| `400`       | _Request in wrong format_ |
| `401`       | _Invalid token_           |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
[
  {
    "id": 1,
    "userId": 1,
    "label": "wifi do vizinho",
    "networkName": "Não roube meu wifi",
    "password": "1234"
  },
  {
    "id": 2,
    "userId": 1,
    "label": "wifi do vizinho",
    "networkName": "Não roube meu wifi",
    "password": "1234"
  }
]
```

#

#### Fetch a wifi by id

```http
GET /wireless/id
```

<h3>Request:</h3>

<h4>Params:</h4>
Send to route address, Ex: /wireless/1

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **required**, **greater than 0** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                      |
| :---------- | :----------------------------------------- |
| `400`       | _Request in wrong format_                  |
| `401`       | _Invalid token or no permission to access_ |
| `404`       | _There is no data with this id_            |
| `426`       | _Outdated token_                           |
| `498`       | _Expired token_                            |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
{
  "id": 1,
  "userId": 1,
  "label": "wifi do vizinho",
  "networkName": "Não roube meu wifi",
  "password": "1234"
}
```

#

#### Delete a wifi by id

```http
DELETE /wireless/id
```

<h3>Request:</h3>

<h4>Params:</h4>
Send to route address, Ex: /wireless/1

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **required**, **greater than 0** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                      |
| :---------- | :----------------------------------------- |
| `400`       | _Request in wrong format_                  |
| `401`       | _Invalid token or no permission to access_ |
| `404`       | _There is no data with this id_            |
| `426`       | _Outdated token_                           |
| `498`       | _Expired token_                            |

<h3>Success case (status code <span style="color:green">200</span>)</h3>

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`JWT_SECRET = any string`

`CRYPTR_SECRET = any string`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/andrezopo/projeto18-valex
```

Go to the project directory

```bash
  cd projeto18-valex/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  npx prisma db push
```

Start the server

```bash
  npm run start
```

</br>

## Lessons Learned

In this project I learned a lot about how to structure an API with TypeScript and Prisma

</br>

## Acknowledgements

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Authors

- Vinicius Pacheco is a student at Driven Education and is putting effort into it to switch careers. Nowadays he works with Engineering,
  looking forward to become a Dev.
  <br/>

#

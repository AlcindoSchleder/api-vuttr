---
description: 'Descrição de uma aplicação VUTTR.'
---

# VUTTR (Very Useful Tools to Remember)

Simples API usando node + hapi + jwt + swagger + mongoose + mongoDB

A API responde na porta 3000 e segue um estilo de arquitetura REST.

Há rotas para listar, filtrar, cadastrar e remover documentos MongoDB representando ferramentas, seguindo o schema:

```js
{
    id: ObjectId
    title: String
    link: String
    description: String,
    tags: [String]
}
```

Exemplo:

```json
{
    "id": 1,
    "title": "Snam",
    "link": "<https://snam.io>",
    "description": "Uma API para Análises Cognitivas de Redes Sociais. Contempla Múltiplas Redes Sociais com Fácil Integração em Qualquer Aplicação",
    "tags": [
        "análise",
        "big data",
        "integração",
        "publicidade",
        "gerenciamento"
    ]
}
```
Com exceção da documentação todas as rotas deve possuir um header com o token de acesso:

```json
{
    "headers": [{"authorization": "token de acesso"}]
}
```

As rotas são as seguintes:

1. **DOCS** /documentation *- Mostra uma documentação funcional com os parâmetros de cada rota*


2. **GET** /tools *- lista todas as ferramentas cadastradas*

```json
[
    {
        "id": 1,
        "title": "Snam",
        "link": "<https://snam.io>",
        "description": "Uma API para Análises Cognitivas de Redes Sociais. Contempla Múltiplas Redes Sociais com Fácil Integração em Qualquer Aplicação",
        "tags": [
            "análise",
            "big data",
            "integração",
            "publicidade",
            "gerenciamento"
        ]
    },
    {
        "id": 2,
        "title": "pm2",
        "link": "<http://pm2.keymetrics.io/>",
        "description": "Advanced, production process manager for Node.js.",
        "tags": [
            "api",
            "monitor",
            "process",
            "node",
            "graphs",
            "app"
        ]
    },
    {
        "id": 3,
        "title": "fastify",
        "link": "<https://hapijs.com//>",
        "description": "A rich framework for building applications and services.",
        "tags": [
            "web",
            "framework",
            "node",
            "http",
            "https",
            "localhost"
        ]
    }
]
```

2. **GET** /tools?tag=publicidade&title=Snam *- filtra ferramentas utilizando uma busca por qualquer campo do schema

```json
[
    {
        "id": 1,
        "title": "Snam",
        "link": "<https://snam.io>",
        "description": "Uma API para Análises Cognitivas de Redes Sociais. Contempla Múltiplas Redes Sociais com Fácil Integração em Qualquer Aplicação",
        "tags": [
            "analise",
            "big data",
            "integracao",
            "publicidade",
            "gerenciamento"
        ]
    }
]
```

3. **POST** /tools Content-Type: application/json *- cadastra uma nova ferramenta*

O corpo da requisição deve conter as informações da ferramenta a ser cadastrada, sem o ID (gerado automaticamente pelo servidor). 

```json
{
    "title": "swagger",
    "link": "<https://swagger.io/>",
    "description": "Swagger tools takes the hard work out of generating and maintaining your API docs, ensuring your documentation stays up-to-date as your API evolves.",
    "tags":["node", "organizing", "documentation", "interactive", "developer", "https", "tests"]
}
```

A resposta, em caso de sucesso, é o mesmo objeto, com seu novo ID gerado.

```json
{
    "id": 5,
    "title": "swagger",
    "link": "<https://swagger.io/>",
    "description": "Swagger tools takes the hard work out of generating and maintaining your API docs, ensuring your documentation stays up-to-date as your API evolves.",
    "tags":["node", "organizing", "documentation", "interactive", "developer", "https", "tests"]
}
```

4. **DELETE** /tools/:id *- remove uma ferramenta através de seu ID*

```json
{}
```

5. **PATCH** /tools/:id Content-Type: application/json *- atualiza informações de uma ferramenta*

O corpo da requisição deve conter as informações da ferramenta a ser atualizada (id é ignorado)

```json
{
    "id": 5,
    "title": "Swagger Tools",
    "tags":["node", "design", "documentation", "interactive", "developer", "tests"]
}
```

A resposta, em caso de sucesso, é o mesmo objeto, com as informações atualizadas.

```json
{
    "id": 5,
    "title": "Swagger Tools",
    "link": "<https://swagger.io/>",
    "description": "Swagger tools takes the hard work out of generating and maintaining your API docs, ensuring your documentation stays up-to-date as your API evolves.",
    "tags":["node", "design", "documentation", "interactive", "developer", "tests"]
}
```

## Configuração e uso

### Instalação dos programas necessários (sem docker)

Para instalar este aplicativo localmente em uma máquina devemos ter previamente instalados
alguns pacotes no seu SO, que são:

1. *Node.js:* versão 10 ou maior;
2. *Mongodb:* versão 4.0 ou maior;
3. *Ferramentas auxiliares:* Após os passos 1 e 2 atualizar e instalar as ferramentas do node.js:
  - npm (gerenciador de pacotes node), 
  - mocha (ferramenta de testes unitários),
  - forever (ferramenta de monitoramento da aplicação)

```bash
npm install -g npm
npm install -g mocha
npm install -g forever
```

### Instalação da aplicação

```bash
git clone https://github.com/AlcindoSchleder/api-vuttr.git
cd api-vuttr 
npm install
```

### Execução local

```bash
forever start api.js
```

### Testes

```bash
npm test
```

### Docker

#### Rodar a imagem pronta (via docker)

Basta usar o docker run para rodar a imagem pronta

```bash
docker run -d --restart=always --name api_mongo -p 27017:27017 \
    -v /opt/docker-image/data:/opt/data \
    -v /var/log/mongo:/var/log/mongo \
    -it alcindo/api_mongo:1.0

docker run -d --restart=always --name api_vuttr -p 3000:3000 --links api_mongo \
    -v /opt/docker-image/api:/opt/node \
    -it alcindo/api_vuttr:1.0
```

#### Build & preparacao para deploy (via docker)

(Opcional)

Necessário estar logado com uma conta docker

```bash
docker build -f docker/server.dockerfile -t seu_usuario/api_vuttr:1.0 .
docker build -f docker/mongo.dockerfile -t seu_usuario/api_mongo:1.0 .
docker push seu_usuario/api_vuttr:1.0
docker push seu_usuario/api_mongo:1.0
```

#### Iniciar containers com compose (aplicação + mongo)

```bash
docker pull alcindo/api-vuttr:1.0
docker pull alcindo/api-mongo:1.0
docker-compose up -d
```

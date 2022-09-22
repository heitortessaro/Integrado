# Projeto Integrado

Este projeto é resultado do desafio técnico Back-End proposto pela empresa Bis2Bis. O desafio consistia de duas partes:

- Parte 1: criar um script para captar dados providos por uma API externa e salvar tais dados no banco de dados.
- Parte 2: Criar uma API que providencie um CRUD (create,‌ ‌retrieve,‌ ‌update,‌ ‌delete)‌‌
  das‌ ‌universidades‌ ‌anteriormente‌ ‌cadastradas‌ ‌no‌ ‌banco de dados.‌

Para facilitar a navegação na documentação do projetos, sugiro utilizar a ferramenta provida pelo Github:

<img src="assets/readme.png" alt="drawing" style="width:110px;"/>

## Tecnologias utilizadas

Na sequeência são listadas as principais tecnologias utilizadas para a implementação do projeto. Inicialmente são apresentadas as utilizadas para o desenvolvimento da aplicação:

- [Express](https://expressjs.com/): web framework para construir APIs com Node.js.
- [Mongoose](https://mongoosejs.com): é uma biblioteca JavaScript com orientação a objetos que cria uma conexão entre o banco de dados MongoDb e uma aplicação com Node.js.
- [TypeScript](https://www.typescriptlang.org): é um superset do JavaScript que adiciona tipagem estática à linguagem.
- [Zod](https://www.npmjs.com/package/zod): é uma biblioteca para validação de dados.
- [Helmet](https://geopy.readthedocs.io/en/stable/index.html?highlight=geodesic#): é uma biblioteca para aprimorar a segurança de aplicações criadas em Express que adiciona HTTP header à aplicação.
- [Cors](https://www.npmjs.com/package/cors): é um pacote Node.js que prove um middleware utilizado para habilitar CORS (Cross-Origin Resource Sharing).
- [ESLint](https://eslint.org/) para padronização do código.

Para a implementação dos testes unitários foram utilizadas:

- [Mocha.js](https://mochajs.org/): é um framework JavaScript para criar testes assíncronos.
- [Sinon.js](https://sinonjs.org/): utilizado para realizar o stub de funções.
- [Chai](https://www.chaijs.com/): é uma biblioteca de asserção, que torna os testes mais legíveis.

Para a implementação do banco de dados se utilizou o [MongoDB](https://www.mongodb.com/), o qual rodou a partir de um container local. Todavia, outra opção é utilizar o serviço [Atlas](https://www.mongodb.com/atlas).

## Documentação da API

A documentação da API foi construída utilizando a ferramenta Postman. Você pode acessar a última versão através deste [link](https://documenter.getpostman.com/view/21397186/2s7ZEBnMex). Na documentação você tem acesso a todas as rodas, bem como a exemplos de requisições a cada rota.

## Organização e Arquitetura

A aplicação tentou aplicar a filosofia **SOLID** em conjunto com a arquitetura **MSC** e **orientação a objetos**. Assim, interfaces foram utilizadas para contruir a abstração da aplicação e garantir a inversão de dependências. Ademais, arquivos relacionados ao model (M) tem por objetivo possibilitar a conexão e interação com o banco de dados, já arquivos do service (S) performam ações de validação das regras de negócio e validação e, por fim, arquivos relacionados ao controller (C) se destinam a fazer a interface com as requisições externas a aplicação. Essa segregação é mais fácil observada analisando a estrutura da API apresentada a seguir:

```
📦src
 ┣ 📂controllers
 ┃ ┗ 📜University.ts
 ┣ 📂errors
 ┃ ┗ 📜catalog.ts
 ┣ 📂helper
 ┃ ┗ 📜objKeyConvertion.js
 ┣ 📂interfaces
 ┃ ┣ 📜IModel.ts
 ┃ ┣ 📜IModelUniversity.ts
 ┃ ┣ 📜IService.ts
 ┃ ┣ 📜IServiceUniversity.ts
 ┃ ┗ 📜IUniversity.ts
 ┣ 📂middleware
 ┃ ┗ 📜error.ts
 ┣ 📂models
 ┃ ┣ 📜MongoModels.ts
 ┃ ┣ 📜Universities.ts
 ┃ ┗ 📜connections.ts
 ┣ 📂routes
 ┃ ┗ 📜University.ts
 ┣ 📂services
 ┃ ┗ 📜University.ts
 ┣ 📂tests
 ┃ ┣ 📂mocks
 ┃ ┃ ┗ 📜universityMock.ts
 ┃ ┗ 📂unit
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┗ 📜university.test.ts
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┗ 📜university.test.ts
 ┃ ┃ ┗ 📂services
 ┃ ┃ ┃ ┗ 📜university.test.ts
 ┣ 📜app.ts
 ┗ 📜index.ts
```

## Rodando o Projeto na sua máquina

Na sua máquina você deve ter:

- Sistema Operacional Distribuição Unix
- Node versão 16 (versão igual ou superior à `16.15.0 LTS`)
- Docker
- Docker-compose versão >=1.29.2

A seguir você encontra um guia de como instalar e rodar o projeto localmente. Em caso de dúvidas, problemas ou feedbacks, entre em contato.

Passo 1. Crie o repositório local utilizando `mkdir`:

```bash
mkdir projeto-integrado
```

Passo 2. Mude para o repositório criado:

```bash
cd projeto-integrado
```

Passo 3. Clone o projeto utilizando a chave SSH:

```bash
git clone git@github.com:heitortessaro/Integrado.git
```

Passo 4. Mude para o diretório clonado:

```bash
cd Integrado
```

Passo 5. Inslate todas as dependências:

```bash
npm install
```

Passo 6. Rode os containers da aplicação

```bash
docker-compose up -d
```

Ao rodar o Passo 6, as imagens relacionadas a cada um dos dockerfiles (banco de dados, API, scrept seeder) serão baixadas e depois as aplicações serão inicializadas.

### Acessando a Aplicação Localmente

Depois de subir os container da aplicação, você pode acessar o front end utilizando o endereço http://localhost:3000.

Em funções da limitação de tempo no desenvolvimento, alguns pontos foram indicados na seção de **Melhorias Futuras** para esse projeto. Uma delas é a utilização de variáveis de ambiente no front end. No momento, se por alguma razão for necessário alterar a URL base para comunicação com a api, por favor, edite o arquivo _app/frontend/src/services/baseURL.js_.

### Comandos Complementares

Caso você queira reiniciar a aplicação local, você pode desmontar os containers utilizando:

```bash
docker-compose down
```

E depois reiniciar a aplicação com:

```bash
docker-compose up -d --build
```

## Melhorias Futuras

Aqui são apresentadas possíveis melhorias que ainda não foram implementadas no projeto.

- Utilizar variáveis de ambiente para definir a url da api para o front end e para fornecer a string de acesso ao banco de dados no back end.
- Aprimorar a componentização do front end, principalmente para os componentes Update e Register.
- Implementar testes unitários para font e back end.
- Implementar testes E2E para o front e back end.
- Adicionar um sistema de login e autenticação ao sistema. Uma opção seria utilizar JWT, de modo a liberar acesso as funcionalidades das rotas apenas a usuários autorizados.
  - Adicionar rota de login e criação de usuário.
- Aprimorar a estrutura organizacional do back end
- Aplicar conceitos SOLID em ambas as aplicações, front end e back end.

## Referências Utilizadas

Além da documentação das técnologias previamente cidatas, também foram utilizados guias de implementação. Abaixo são listadas as referências utilizadas:

- [Developing and Testing an Asynchronous API with FastAPI and Pytest](https://testdriven.io/blog/fastapi-crud/#get-routes)
- [Building a CRUD App with FastAPI and MongoDB](https://testdriven.io/blog/fastapi-mongo/#update)
- [The Ultimate FastAPI Tutorial](https://christophergs.com/tutorials/ultimate-fastapi-tutorial-pt-1-hello-world/)
- [Setup black, isort, flake8 in VSCode](https://medium.com/@jackklpan/auto-format-and-lint-by-black-isort-flake8-in-vs-visual-studio-code-a62a3f5d940e)

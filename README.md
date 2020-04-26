# My Movie

Projeto que utilisa a API do [OMDb](http://www.omdbapi.com/) para listar filmes e detalhes dos filmes. A função da API é retornar de forma mais acertiva as informações necessárias para a o front-end. Caso tenha interesse em conhecer o projeto do front end.
[My Movie](https://github.com/mvcbotelho/my_movie)

## Começando

Para iniciar o projeto, basta clonar este repositório, entrar na pasta raiz e instalar as dependências. Esse passo só é necessário para rodar localmente em sua máquina. O projeto está no heroku no link: [my_movie-api](https://custom-omdbapi.herokuapp.com/movies?title=Lord)

Espero que goste do projeto!!!

### Pré requistos

É necessário ter o [Node](https://nodejs.org/en/) e o NPM ou [YARN](https://classic.yarnpkg.com/pt-BR/docs/install/#windows-stable) instalados na máquina.

### Instalando

Navegar até a pasta raíz do projeto e digitar

```
npm i
```

ou

```
yarn
```

Para rodar o projeto basta digitar

```
npm start
```

ou

```
yarn start
```

Esperar a compilação. Será exibido uma mensagem que o servidor está no ar. Basta abrir o [Postman](https://www.postman.com/) ou o [Insominia](https://insomnia.rest/)

## Testando endpoints

```
GET http://localhost:5000/movies
query: title

GET http://localhost:5000/movies/tt6664704
params: id

POST http://localhost:5000/movies/tt6664704/like
params: id
body: null
```

O is deve ser o idImdb, forcecido pela API do OMDb.

## Authors

- **Marcus Botelho** - [mvcbotelho](https://github.com/mvcbotelho)

## License

Este projeto está licenciado sob a licença MIT

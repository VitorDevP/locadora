# Backend para locadora

Todas as rotas com excessão a rota POST(localhost:3000/api/v1/users/ ) são protegidas e necessitam um JWT de autorização, 
JWT pode ser obtido na rota de login, e deve ser passado pelo header das requisições, passando pelo parametro [x-access-token].
endpoints disponiveis

Filmes
- GET - localhost:3000/api/v1/movies/:id?+(params)
- POST - localhost:3000/api/v1/movies/
- PUT - localhost:3000/api/v1/movies/:id
- DELETE - localhost:3000/api/v1/movies/:id

Locação
- GET - localhost:3000/api/v1/locadora/:id?+(params)
- POST - localhost:3000/api/v1/locadora/
- PUT - localhost:3000/api/v1/locadora/:id
- DELETE - localhost:3000/api/v1/locadora/:id
- GET - localhost:3000/api/v1/locadora/devolucao/:id

Histotico de locação
- GET - localhost:3000/api/v1/history/

Usuarios
- GET - localhost:3000/api/v1/users/:id?+(params)
- POST - localhost:3000/api/v1/users/
- PUT - localhost:3000/api/v1/users/:id
- DELETE - localhost:3000/api/v1/users/:id

Login
- GET - localhost:3000/api/v1/auth/ - necessita body com email e senha para autenticar
- GET - localhost:3000/api/v1/auth/logout/


todas as informações persistem em um bando mysql, a propria aplicação cria as tabelas dentro do database se as mesmas não existirem, os schemas podem ser alterados
pelos modelos localizados dentro da pasta model

o arquivo db.sql possui todas as instruções SQL para a criação do banco por QUERY

execução da aplicação
- docker-compose up -d
- npm start - somente node js

unit test
- npm test

# Teste Shopper - Formulário de cadastro de pedidos

## Sobre
Projeto feito para teste técnico da Shopper. Página de formulário de cadastro de pedidos, e sua respectiva API.

## Recursos utilizados
Front:
- React
- Tailwind CSS
- Material UI
- axios

Back:
- Knex
- cors
- express
- dotenv
- Typescript

## Features solicitadas
1- O sistema deve ter um formulário de cadastro de pedidos
Front: X
Back: X

2- O usuário deve entrar com Nome do Cliente, Data de Entrega e uma lista de compras
Front: X
Back: X

3- A lista de compras é composta por um ou mais produtos e a quantidade solicitada para
cada um deles.
Front: X
Back: X

4- O usuário pode alterar a quantidade de itens já cadastrados ou excluir um item que ele
não queira mais. X

5- A cada alteração na lista de compras o sistema deve calcular o valor total do pedido. X


6- Todas essas informações devem ser salvas em um banco de dados que você vai modelar. X


7- Cada pedido salvo deve debitar a quantidade do produto correspondente de seu estoque. X


8- O sistema deve alertar o usuário caso a quantidade solicitada não esteja disponível no
estoque.
Front: X
Back: X

9- O sistema também deve ter uma função para mostrar o estoque atual exibindo: Nome do
produto e a quantidade em estoque. X


## Execução

Back:
- Entrar na pasta do back
- `npm install` ou `yarn install`
- Configurar .env com o banco de dados a ser utilizado (porta recomendada para funcionamento perfeito com o front: 3306)
- `npm start` ou `yarn start`

Front:
- Entrar na pasta do front
- `npm install` ou `yarn install`
- `npm start` ou `yarn start`


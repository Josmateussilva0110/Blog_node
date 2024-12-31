# Blog  

Este projeto é uma aplicação de blog desenvolvida com Node.js, Express e Sequelize para gerenciamento de conteúdos como artigos, 
categorias e usuários. A aplicação inclui um blog público e um painel administrativo para gerenciar o conteúdo.  
# Funcionalidades  

## Blog Público:
•	Visualizar artigos na página inicial.  
•	Filtrar artigos por categorias.  
•	Visualizar artigos individuais ao clicar nos títulos.  

## Painel Administrativo:
•	Gerenciar usuários (criar, editar, excluir).  
•	Gerenciar artigos (criar, editar, excluir, paginação).  
•	Gerenciar categorias (criar, editar, excluir).  
•	Autenticação de usuários para ações administrativas.  

# Tecnologias Utilizadas  

## Backend:  
•	Node.js  
•	Express.js  
•	Sequelize  
•	MySQL  

## Frontend:  
•	EJS (Embedded JavaScript templates)  

# Instalação  

```javascript
    git clone https://github.com/Josmateussilva0110/Blog_node
```

```javascript
    npm install
```  

## Configure o banco de dados:
•	Crie um banco de dados MySQL.  
•	Configure a conexão no arquivo ./database/database_connection.js.  

## Inicie a aplicação:  
```javascript
    nodemon index.js
```  

```javascript
    http://localhost:8080
```  




# Documentação

ENDPOINT 1: GET /api/livros

Descrição: Lista todos os livros com filtros opcionais.

Parâmetros (query):
genero
preco_min
preco_max
Exemplo de requisição (Postman):
GET http://localhost:3000/api/livros?genero=Fantasia&preco_max=40
Resposta:
[
  {
    "id": 3,
    "titulo": "O Hobbit",
    "autor": "J.R.R. Tolkien",
    "preco": 40,
    "genero": "Fantasia",
    "estoque": 8
  }
]
📚 ENDPOINT 2: GET /api/livros/:id

Descrição: Busca um livro pelo ID.

Exemplo:
GET http://localhost:3000/api/livros/1
Resposta:
{
  "id": 1,
  "titulo": "1984",
  "autor": "George Orwell",
  "preco": 30,
  "genero": "Distopia",
  "estoque": 10
}
Possíveis erros:
404: Livro não encontrado
📚 ENDPOINT 3: POST /api/livros

Descrição: Cria um novo livro.

Body:
{
  "titulo": "Novo Livro",
  "autor": "Autor X",
  "preco": 35,
  "genero": "Drama",
  "estoque": 10
}
Exemplo no Postman:
Método: POST
Body: raw JSON
Resposta:
{
  "id": 11,
  "titulo": "Novo Livro",
  "autor": "Autor X",
  "preco": 35,
  "genero": "Drama",
  "estoque": 10
}
Possíveis erros:
400: Campos obrigatórios faltando
400: Preço inválido
400: Estoque inválido
📚 ENDPOINT 4: PUT /api/livros/:id

Descrição: Atualiza completamente um livro existente.

URL:
http://localhost:3000/api/livros/11
Body:
{
  "titulo": "Livro Atualizado",
  "autor": "Autor Y",
  "preco": 40,
  "genero": "Drama",
  "estoque": 5
}
Resposta:
{
  "id": 11,
  "titulo": "Livro Atualizado",
  "autor": "Autor Y",
  "preco": 40,
  "genero": "Drama",
  "estoque": 5
}
Possíveis erros:
404: Livro não encontrado
400: Campos obrigatórios não preenchidos
📚 ENDPOINT 5: DELETE /api/livros/:id

Descrição: Remove um livro.

URL:
http://localhost:3000/api/livros/11
Resposta:
Status: 204 No Content
Possíveis erros:
404: Livro não encontrado
🧪 TESTES NO POSTMAN
✔ GET ALL
Método: GET
URL:
http://localhost:3000/api/livros
✔ GET BY ID
Método: GET
http://localhost:3000/api/livros/1
✔ POST
Método: POST
Body: JSON
✔ PUT
Método: PUT
URL com ID
Body completo
✔ DELETE
Método: DELETE
URL com ID
✅ VALIDAÇÕES IMPLEMENTADAS
POST e PUT:
Todos os campos são obrigatórios
Preço deve ser número maior que 0
Estoque deve ser inteiro >= 0
Retorna erro 400 se inválido
GET:
Filtros opcionais
Conversão de valores numéricos
DELETE:
Verifica se o ID existe antes de remover
Retorna erro 404 se não existir
📌 CONCLUSÃO

API REST completa com operações CRUD:

GET → leitura
POST → criação
PUT → atualização
DELETE → remoção

✔ Possui validações completas
✔ Tratamento de erros
✔ Filtros na busca
✔ Status HTTP corretos

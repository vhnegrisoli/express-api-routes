const express = require('express');
const server = express();

server.listen(3000);
server.use(express.json());

// Middleware global
server.use((req, res, next) => {
  console.log(`Log de URL: ${req.url}`);
  return next();
})

const midia = [
  {
    nome: 'HQ'
  },
  {
    nome: 'Livro'
  },
  {
    nome: 'Games'
  },
  {
    nome: 'Filmes'
  },
  {
    nome: 'Teste Nodemon'
  }
]

server.get('/api', (req, res) => {
  return res.send('Oii, Tataia!');
});

server.get('/api/query', (req, res) => {
  const dados = req.query.dados;
  return res.json({ message: `Query: ${dados}` });
});

server.get('/api/path/:param', (req, res) => {
  const param = req.params.param;
  return res.json({ message: `URL param: ${param}` });
});

server.get('/api/midias', (req, res) => {
  return res.json(midia);
});

server.get('/api/midias/:id', validarId, (req, res) => {
  const id = req.params.id;
  return res.json(midia[id - 1]);
});

server.post('/api/midias', validarNome, (req, res) => {
  const { nome } = req.body;
  midia.push({ nome: nome });
  return res.json(midia[midia.length - 1]);
});

server.put('/api/midias', (req, res) => {
  const { id, nome } = req.body;
  midia[id - 1].nome = nome;
  return res.json(midia[id - 1]);
});

server.delete('/api/midias/:id', validarId, (req, res) => {
  const id = req.params.id;
  midia.pop(midia[id - 1]);
  return res.json(midia);
});

// Middlewares locais

function validarNome(req, res, next) {
  if (!req.body.nome) {
    return res
      .status(400)
      .json({ message: 'É necessário informar o nome', status: 400 })
  }
  return next();
}

function validarId(req, res, next) {
  if (!midia[req.params.id - 1]) {
    return res
      .status(400)
      .json({ message: 'A mídia não existe', status: 400 })
  }
  return next();
}
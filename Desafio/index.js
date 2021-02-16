const express = require("express");
const server = express();
server.use(express.json());

const tarefas = [];

server.use((req, res, next) => {
  next();
});

server.get('/tarefas', (req, res) => {
  return res.json(tarefas);
});

// adiciona tarefa
server.post('/tarefas', (req, res) => {
  const { id, titulo, tarefa } = req.body;

  const project = {
    id,
    titulo,
    tasks: [tarefa],
  };

  tarefas.push(project);

  return res.json(tarefas);
});

// adiciona task no array task
server.post('/tarefas/:id/tarefa', (req, res) => {
  const {id}  = req.params;
  const {titulo} = req.body;
  const tarefa = tarefas.find((f) => f.id === id);

  tarefa.tasks.push(titulo);
  return res.json(tarefas);
});

//troca o nome do titulo
server.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  //como encontrar um id no list
  const tarefa = tarefas.find((f) => f.id === id);

  tarefa.titulo = titulo;

  return res.json(tarefas);
});
// deleta
server.delete('/tarefas/:index', (req, res) => {
  const index = req.params.index;

  tarefas.splice(index, 1);
  return res.json(tarefas);
});

server.listen(4000);

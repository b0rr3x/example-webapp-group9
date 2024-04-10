const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const tasksFile = 'tasks.json';
// Read tasks from file
let tasks = JSON.parse(fs.readFileSync(tasksFile));

// Save tasks to file
function saveTasks() {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Todo App</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h1 {
          color: #333;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
        }
        form {
          margin-top: 20px;
        }
        input[type="text"] {
          padding: 5px;
          width: 200px;
        }
        button {
          padding: 5px 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <h1>Todo List</h1>
      <ul>
        ${tasks.map((task, index) => `
          <li>
            ${task}
            <form action="/delete" method="post" style="display: inline;">
              <input type="hidden" name="index" value="${index}">
              <button type="submit">Delete</button>
            </form>
          </li>
        `).join('')}
      </ul>
      <form action="/add" method="post">
        <input type="text" name="task" placeholder="Enter a new task">
        <button type="submit">Add</button>
      </form>
    </body>
    </html>
  `);
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  saveTasks();
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const index = parseInt(req.body.index);
  tasks.splice(index, 1);
  saveTasks();
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Todo app listening on port 3000!');
});
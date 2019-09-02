# Todo APP server API

A simple express server API for get create and update Todos

all the data stored in-memory without and DB

## run the server
```bash
# clone the project
$ git clone https://github.com/ShlomyTuby/todo-app-server.git
# instal npm dependecies
$ cd todo-app-serve
$ nvm install && nvm exec npm install
# for production mode
$ npm start
# for dev mode (nodemon)
$ npm run dev
# for unit test mode (required to kill the running app first)
$ npm run test
```

Existing routes:

### Get all todos
GET http://localhost:3002/todos/
```bash
    curl http://localhost:3002/todos/
    => [{"id":"b909cbb2-855b-44e4-8e00-3f1fcf53e626","text":"First todo item","completed":false},{"id":"344b0f11-eb58-4393-886f-9a2f90971c53","text":"Another todo item","completed":false}]
```

### Get single todo
GET http://localhost:3002/todos/:todo_id
```bash
    curl http://localhost:3002/todos/54233dc6-859e-4072-9023-8fbfe8e06d38
    => {"success":true,"todo":{"text":"Another todo item","id":"54233dc6-859e-4072-9023-8fbfe8e06d38","completed":false}}
```

### Add new todo
POST http://localhost:3002/todos/
```bash
    curl -d "{\"text\":\"First todo item\"}" http://localhost:3002/todos/ -H "Content-Type: application/json"
    => {"success":true,"todo":{"text":"First todo item","id":"54233dc6-859e-4072-9023-8fbfe8e06d38","completed":false}}
```

### Update todo
PATCH http://localhost:3002/todos/:todo_id
```bash
    curl --request PATCH -d "{\"text\":\"Update todo item\",\"completed\":true}" http://localhost:3002/todos/54233dc6-859e-4072-9023-8fbfe8e06d38 -H "Content-Type: application/json"
    => {"success":true,"todo":{"text":"Update todo item","id":"54233dc6-859e-4072-9023-8fbfe8e06d38","completed":true}}
```

### Delete todo
DELETE http://localhost:3002/todos/:todo_id
```bash
    curl --request DELETE http://localhost:3002/todos/54233dc6-859e-4072-9023-8fbfe8e06d38
    => {"success":true,"todo":{"text":"Update todo item","id":"54233dc6-859e-4072-9023-8fbfe8e06d38","completed":true}}
```




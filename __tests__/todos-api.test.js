import jest from "jest";
const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}`;

const resetData = async done => {
  console.log("reset data running");
  const url = `${baseUrl}/todos/`;
  return fetch(url)
    .then(res => res.json())
    .then(async allTodos => {
      await Promise.all(
        allTodos.map(todo => {
          return fetch(`${url}${todo.id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(res => console.log(`delete todo item ${res.todo.id}`))
            .catch(console.error);
        })
      );
    })
    .then(done)
    .catch(console.error);
};

describe("Todos API", () => {
  beforeAll(resetData);
  let testTodo = { text: "test todo 1" };

  it("Should get empty list before all", async () => {
    const url = `${baseUrl}/todos/`;
    console.log(`GET ${url}`);
    const todos = await fetch(url).then(res => res.json());
    expect(todos).toEqual([]);
  });

  it("Should add new todo", async () => {
    const url = `${baseUrl}/todos/`;
    console.log(`POST ${url}`);
    const { success, todo } = await fetch(url, {
      method: "POST",
      body: JSON.stringify(testTodo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => {
        throw new Error(error);
      });
    expect(success).toBeTruthy();
    expect(todo).toMatchObject({
      text: testTodo.text,
      completed: false,
      id: expect.stringMatching(/\w/)
    });
    testTodo = todo;
  });

  it("Should update todo", async () => {
    testTodo.text = "updated text";
    testTodo.completed = true;
    const url = `${baseUrl}/todos/${testTodo.id}`;
    console.log(`PATCH ${url}`);
    const { success, todo } = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(testTodo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => {
        throw new Error(error);
      });
    expect(success).toBeTruthy();
    console.log(`GET ${url}`);

    const updatedTodo = await fetch(url)
      .then(res => res.json())
      .catch(error => {
        throw new Error(error);
      });
    expect(updatedTodo).toMatchObject({
      text: testTodo.text,
      completed: true,
      id: testTodo.id
    });
    testTodo = todo;
  });

  it("Should delete todo", async () => {
    const url = `${baseUrl}/todos/${testTodo.id}`;
    console.log(`DELETE ${url}`);
    const { success, todo } = await fetch(url, {
      method: "DELETE"
    })
      .then(res => res.json())
      .catch(error => {
        throw new Error(error);
      });
    expect(success).toBeTruthy();
    expect(todo).toMatchObject({
      completed: true,
      text: testTodo.text,
      id: testTodo.id
    });
  });
});

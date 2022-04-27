export const Mutation = {
    addTodo: (parent, { addTodoInput }, { db, pubsub }, infos) => {

      if (!existInArray(db.users, "id", addTodoInput.userId)) {
        throw new Error("User Not found " , id);
      } else {
        const newTodo = {
          id: db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1,
          status: "WAITING",
          ...addTodoInput,
        };
        db.todos.push(newTodo);
        pubsub.publish("socket", { todo: { todo: newTodo, mutation: "added" } });
        return newTodo;
      }

    },
    updateTodo: (parent, { id, updateTodoInput }, { db, pubsub }, infos) => {
    
      if (
        updateTodoInput.userId &&
        !existInArray(db.users, "id", updateTodoInput.userId)
      ) {
        throw new Error("User Not found " , id);
      } else {

        const todo = db.todos.find((todoItem) => todoItem.id === id);
        if (!todo) {
          throw new Error("Todo not found");
        } else {
          for (let item in updateTodoInput) {
            todo[item] = updateTodoInput[item];
          }
          pubsub.publish("socket", { todo: { todo, mutation: "updated" } });
          return todo;
        }
      }
    },

    deleteTodo: (parent, { id }, { db, pubsub }, infos) => {
      const indexTodo = db.todos.findIndex((todo) => todo.id === id);
      if (indexTodo === -1) {
        throw new Error("Todo innexistant");
      } else {
        const [todo] = db.todos.splice(indexTodo, 1);
        pubsub.publish("socket", { todo: { todo, mutation: "deleted" } });
        return todo;
      }
    },
  };
  
  function existInArray(array, attribut, value) {
    console.log(array, attribut, value);
    return array.some((element) => element[attribut] == value);
  }
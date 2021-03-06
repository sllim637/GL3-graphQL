export const Query = {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    getTodos: (parent, args, { db }, info) => {
      
      console.log(db);
      return db.todos;
    },
    getTodoById: (parent, { id }, { db }, info) => {
      const todo = db.todos.find((todo) => todo.id === id);
      if (!todo) {
        throw new Error(`le todo ${id} n'existe pas . `);
      }
      return todo;
    },
    getUsers: (parent, args, { db }, info) => {
      return db.users;
    },
    getUserById: (parent, { id }, { db }, info) => {
      const user = db.users.find((user) => user.id === id);
      if (!user) {
        throw new Error(` l'utilisateur ${id}  n'est pas trouvé . `);
      }
      return user;
    },
  };
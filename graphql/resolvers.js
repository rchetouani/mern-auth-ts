module.exports = {
  Query: {
    allUsers: async () => {
      const users = await User.find();
      return users.map(x => x);
    },
    User: (parent, args) => {
      const user = User.findById(args.id);
      if (!user) {
        console.log("erreur");
      }
      return user;
    }
  },
  Mutation: {
    createUser: async (parent, args, { User }) => {
      const user = await new User(args).save();
      return user;
    },
    addUser: (root, params) => {
      const bookModel = new User(params);
      const newBook = bookModel.save();
      if (!newBook) {
        console.log("Error");
      }
      return newBook;
    },
    updateUser: (root, params) => {
      return User.findOneAndUpdate(
        params.id,
        {
          name: params.name,
          username: params.username,
          status: params.status,
          agency: params.agency,
          gender: params.gender,
          birthday: params.birthday,
          email: params.email
        },
        function(err) {
          if (err) return next(err);
        }
      );
    }
  }
};

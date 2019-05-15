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
    },
    allFormations: async () => {
      const users = await Formation.find();
      return users.map(x => x);
    },
    Formation: (parent, args) => {
      const user = Formation.findById(args.id);
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
    addUser: async (parent, args, { User }) => {
      return User.findOneAndUpdate(
        args.id,
        {
          formations: args.formations
        },
        function(err) {
          if (err) return next(err);
        }
      );
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
    },
    addFormation: (root, params) => {
      const bookModel = new Formation(params);
      const newBook = bookModel.save();
      if (!newBook) {
        console.log("Error");
      }
      return newBook;
    }
  }
};

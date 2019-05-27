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
    addFormation: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.formations.push({
        name: a.formations[0].name,
        Type: a.formations[0].Type,
        Site: a.formations[0].Site,
        Rank: a.formations[0].Rank,
        Formateur: a.formations[0].Formateur,
        startDate: a.formations[0].startDate,
        EndDate: a.formations[0].EndDate
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    deleteFormation: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var lists = user.formations.filter(x => {
        return x.id != a.formations[0].id;
      });
      return User.findOneAndUpdate(args.id, { formations: lists }, function(
        err
      ) {
        if (err) return next(err);
      });
    },
    updateFormation: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));

      user.formations.map(x => {
        if (x.id == a.formations[0].id) {
          x.name = a.formations[0].name;
          x.Type = a.formations[0].Type;
          x.Site = a.formations[0].Site;
          x.Rank = a.formations[0].Rank;
          x.Formateur = a.formations[0].Formateur;
          x.startDate = a.formations[0].startDate;
          x.EndDate = a.formations[0].EndDate;
        }
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    addProject: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.projects.push({
        name: a.projects[0].name,
        description: a.projects[0].description,
        technology: a.projects[0].technology,
        society: a.projects[0].society,
        size: a.projects[0].size,
        Site: a.projects[0].Site,
        EndDate: a.projects[0].EndDate,
        startDate: a.projects[0].startDate,
        status: a.projects[0].status,
        Progress: a.projects[0].Progress
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    deleteProject: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var lists = user.projects.filter(x => {
        return x.id != a.projects[0].id;
      });
      return User.findOneAndUpdate(args.id, { projects: lists }, function(err) {
        if (err) return next(err);
      });
    },
    updateProject: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));

      user.projects.map(x => {
        if (x.id == a.projects[0].id) {
          x.name = a.projects[0].name;
          x.description = a.projects[0].description;
          x.Site = a.projects[0].Site;
          x.technology = a.projects[0].technology;
          x.society = a.projects[0].society;
          x.size = a.projects[0].size;
          x.EndDate = a.projects[0].EndDate;
          x.startDate = a.projects[0].startDate;
          x.status = a.projects[0].status;
          x.Progress = a.projects[0].Progress;
        }
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    addFormationfollowed: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.formationsfollowed.push({
        name: a.formationsfollowed[0].name,
        Type: a.formationsfollowed[0].Type,
        Site: a.formationsfollowed[0].Site,
        Rank: a.formationsfollowed[0].Rank,
        Formateur: a.formationsfollowed[0].Formateur,
        startDate: a.formationsfollowed[0].startDate,
        EndDate: a.formationsfollowed[0].EndDate
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    deleteFormationfollowed: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var lists = user.formationsfollowed.filter(x => {
        return x.id != a.formationsfollowed[0].id;
      });
      return User.findOneAndUpdate(
        args.id,
        { formationsfollowed: lists },
        function(err) {
          if (err) return next(err);
        }
      );
    }
  }
};

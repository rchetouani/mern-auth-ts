const { GraphQLDate } = require("graphql-iso-date");

module.exports = {
  Date: GraphQLDate,
  Query: {
    allUsers: async () => {
      const users = await User.find();

      return users.map(x => x);
    },
    User: async (parent, args) => {
      const user = User.findById(args.id);
      if (!user) {
        console.log("erreur");
      }
      return user;
    },
    UserByRole: async (parent, args) => {
      const user = User.find({ role: args.role });
      if (!user) {
        console.log("erreur");
      }
      return user.map(i => i);
    },
    UserByPole: async (parent, args) => {
      const user = User.find({ pole: args.pole });
      if (!user) {
        console.log("erreur");
      }
      return user.map(i => i);
    }
  },
  Mutation: {
    createUser: async (parent, args, { User }) => {
      const user = await new User(args).save();
      return user;
    },
    updateUser: async (parent, args, { User }) => {
      return User.findOneAndUpdate(
        args.id,
        {
          name: args.name,
          username: args.username,
          status: args.status,
          agency: args.agency,
          gender: args.gender,
          birthday: args.birthday,
          email: args.email
        },
        function(err) {
          if (err) return console.log(err);
        }
      );
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
      User.replaceOne({ _id: args.id }, user, function(err) {
        if (err) return console.log(err);
      });
      return user;
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
      user.save();
      return user;
    },
    deleteFormation: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var lists;
      user.formations.filter(x => {
        if (x.id != a.formations[0].id) {
          lists = x;
        }
      });
      user.formations = lists;
      user.save();
      return user;
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
      return User.replaceOne({ _id: args.id }, user, function(err) {
        if (err) return console.log(err);
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
      user.save();

      return user;
    },
    deleteProject: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var lists;
      user.projects.filter(x => {
        if (x.id != a.projects[0].id) {
          lists = x;
        }
      });
      user.projects = lists;
      user.save();

      return user;
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
      user.save();

      return user;
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
      user.save();

      return user;
    },
    deleteFormationfollowed: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var lists;
      user.formationsfollowed.filter(x => {
        if (x.id != a.formationsfollowed[0].id) {
          lists = x;
        }
      });
      user.formationsfollowed = lists;
      user.save();

      return user;
    },
    addCertification: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.certifications.push({
        code: a.certifications[0].code,
        name: a.certifications[0].name,
        EndDate: a.certifications[0].EndDate,
        startDate: a.certifications[0].startDate,
        organisme: a.certifications[0].organisme
      });
      user.save();

      return user;
    },
    deleteCertification: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));

      var lists;
      user.certifications.filter(x => {
        if (x.id != a.certifications[0].id) {
          lists = x;
        }
      });
      user.certifications = lists;
      user.save();

      return user;
    },
    updateCertification: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.certifications.map(x => {
        if (x.id == a.certifications[0].id) {
          x.code = a.certifications[0].code;
          x.name = a.certifications[0].name;
          x.organisme = a.certifications[0].organisme;
          x.EndDate = a.certifications[0].EndDate;
          x.startDate = a.certifications[0].startDate;
        }
      });
      user.save();

      return user;
    },
    addCalendar: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var allDay;
      if (
        Math.abs(new Date(a.calendar[0].end) - new Date(a.calendar[0].start)) ==
        0
      ) {
        allDay = "true";
      }

      user.calendar.push({
        title: a.calendar[0].title,
        allDay: allDay,
        start: a.calendar[0].start,
        end: a.calendar[0].end
      });

      user.save();

      return user;
    },

    addObjectif: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.objectifs.push({
        name: a.objectifs[0].name,
        status: a.objectifs[0].status,
        Progress: a.objectifs[0].Progress,
        EndDate: a.objectifs[0].EndDate
      });
      user.save();

      return user;
    },
    deleteObjectif: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));

      var lists;
      user.objectifs.filter(x => {
        if (x.id != a.objectifs[0].id) {
          lists = x;
        }
      });
      user.objectifs = lists;
      user.save();

      return user;
    },
    updateObjectif: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.objectifs.map(x => {
        if (x.id == a.objectifs[0].id) {
          x.name = a.objectifs[0].name;
          x.status = a.objectifs[0].status;
          x.EndDate = a.objectifs[0].EndDate;
          x.Progress = a.objectifs[0].Progress;
        }
      });
      user.save();

      return user;
    },
    deleteCalendar: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));

      var lists;
      user.calendar.filter(x => {
        if (x.id != a.calendar[0].id) {
          lists = x;
        }
      });
      user.calendar = lists;
      user.save();

      return user;
    },
    updateCalendar: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.calendar.map(x => {
        if (x.id == a.calendar[0].id) {
          x.title = a.calendar[0].title;
          x.start = a.calendar[0].start;
          x.end = a.calendar[0].end;
        }
      });
      user.save();
      return user;
    }
  }
};

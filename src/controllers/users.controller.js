const { User, Job } = require("../models")
// const sequelize = require("../config/database")

exports.createUser = async (req, res) => {
  const { email } = req.body

  if (!email) return res.status(400).json({ message: "email is required!"});

  const user = await User.create({email})
  res.status(201).json(user)
}

exports.getUsers = async (req, res) => {
  const users = await User.findAll()
  res.status(201).json(users)
}

exports.getUserJobs = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Job,
      attributes: ["id", "company", "role", "status", "createdAt"] 
    }
  })

  if (!user) return res.sendStatus(404);
  
  res.json(user)
}

// Unused function used as an example for Transactions usage in sequelize
// exports.createUserWithJob = async (req, res) => {
//   const t = await sequelize.transaction();

//   try {
//     const user = await User.create(
//       { email: req.body.email },
//       { transaction: t }
//     );

//     const job = await Job.create(
//       {
//         company: req.body.company,
//         role: req.body.role,
//         user_id: user.id
//       },
//       { transaction: t }
//     );

//     await t.commit();
//     res.status(201).json({ user, job });

//   } catch (err) {
//     await t.rollback();
//     res.status(500).json({ error: err.message });
//   }
// };

const usersRouter = require("express").Router();

const bcrypt = require("bcryptjs");

const userdb = require("../database/dbConfig.js");
const Users = require("../helpers/usersModel.js");
// const restricted = require('../auth/restricted-middleware.js');

// usersRouter.get('/', (req, res) => {
//     userdb('users').then(users => {
//         res.status(200).json(users);
//     }).catch(error => {
//         res.status(500).json({
//             message: `The user could not be retrieved: ${error}`
//         });
//     });

// });

usersRouter.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => res.send(error));
});

usersRouter.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      res.status(200).json({
        error: false,
        message: "Your profile was retrieved successfully.",
        user
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Your profile could not be found in the database.",
        user: {}
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      user: {},
      message: "There was an error processing your request."
    });
  }
});

usersRouter.put("/:id", async (req, res) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.role
  ) {
    res.status(406).json({
      error: true,
      user: {},
      message: "Please include all required fields and try again.",
      numUpdated: 0
    });
  }
  try {
    // Hash password comparisons
    const hash = bcrypt.hashSync(req.body.password, 4);
    req.body.password = hash;

    const updatedUser = await Users.update(req.params.id, req.body);
    if (updatedUser) {
      const user = await Users.find()
        .where({
          username: req.body.username
        })
        .first();
      res.status(200).json({
        error: false,
        message: "Your profile was updated successfully.",
        numUpdated: updatedUser,
        user: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.firstName,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(404).json({
        error: true,
        user: {},
        message: "Your profile could not be updated.",
        numUpdated: 0
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      user: {},
      message: "There was an error processing your request.",
      numUpdated: 0
    });
  }
});
usersRouter.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Users.remove(req.params.id);
    if (deletedUser) {
      res.status(200).json({
        error: false,
        message: "Your profile was deleted successfully.",
        numDeleted: deletedUser
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Your profile could not be deleted.",
        numDeleted: 0
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was an error processing your request.",
      numDeleted: 0
    });
  }
});

function restricted(req, res, next) {
    const { username, password } = req.headers;
  
    if (username && password) {
      Users.findBy({ username })
        .first()
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            next();
          } else {
            res.status(401).json({ message: `Invalid credentials` });
          }
        })
        .catch(error => {
          res
            .status(500)
            .json({ message: `Ran into an unexpected error: ${error}` });
        });
    } else {
      res.status(400).json({ message: "No credentials provided" });
    }
  };

module.exports = usersRouter;

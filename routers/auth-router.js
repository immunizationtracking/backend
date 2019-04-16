const authRouter = require('express').Router();

const Users = require('../helpers/usersModel.js');

// authRouter.post('/register', async (req, res) => {
//     const newUser = req.body;
//     try {
//         const user = await Users.insert(newUser);
//     }

// });

// authRouter.post('/login', (req, res) => {

// });


module.exports = authRouter;
const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');

const userdb = require('../database/dbConfig.js');
const Users = require('../helpers/usersModel.js');


// authRouter.post('/register', async (req, res) => {
//     const newUser = req.body;
//     try {
//         const user = await Users.insert(newUser);
//     }

// });

// authRouter.post('/login', (req, res) => {

// });

// authRouter.post('/register', (req, res) => {
//     const creds = req.body;
//     const { username, password, firstName, lastName, email, role } = creds;
//     if(!username || !password || !firstName || !lastName || !email || !role) {
//         return res.status(400).json({ message: `Submit all fields to register`});
//     }
//     const hash = bcrypt.hashSync(newUser.password, 4);
//     req.body.password = hash;

//     try {
//         const [id] = await userdb('users').insert(creds);
//         const user = await userdb('users').where({ id })
//         }
//     } catch(error){}

// })

authRouter.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 4);
    user.password = hash;

    Users.add(user).then(saved => {
        res.status(201).json(saved);
    }).catch(error => {
        res.status(500).json(error);
    });
});


module.exports = authRouter;
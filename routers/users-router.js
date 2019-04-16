const usersRouter = require('express').Router();

const bcrypt = require('bcryptjs');

const userdb = require('../database/dbConfig.js');
const Users = require('../helpers/usersModel.js');

// usersRouter.get('/', (req, res) => {
//     userdb('users').then(users => {
//         res.status(200).json(users);
//     }).catch(error => {
//         res.status(500).json({
//             message: `The user could not be retrieved: ${error}`
//         });
//     });
    
// });

usersRouter.get('/', restricted, (req, res) => {
    Users.find().then(users => {
        res.json(users);
    }).catch(error => res.send(error));
});

function restricted(req, res, next) {
    const { username, password } = req.headers;

    if(username && password) {
        Users.findBy({ username }).first().then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                next();
            } else {
                res.status(401).json({ message: `Invalid credentials`});
            }
        }).catch(error => {
            res.status(500).json({ message: `Ran into an unexpected error: ${error}`});
        });
    } else {
        res.status(400).json({ message: 'No credentials provided'});
    }
};

module.exports = usersRouter;
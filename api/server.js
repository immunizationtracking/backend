const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const patientRouter = require('../routers/patient-router.js');
const practitionerRouter = require('../routers/practitioner-router.js');
const vaccineRouter = require('../routers/vaccines-router.js');
const usersRouter = require('../routers/users-router.js');
const authRouter = require('../routers/auth-router.js');

const authenticate = require('../auth/authenticate.js');




const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
  res.send(
    "Navigate to /api/register to register, /api/login to Log in, /api/patient to set up profile as patient \n /api/institute to set up your profile as a practitioner and /api/vaccines to view list of vaccines /api/patient/vaccine to see list of your vaccines and for practitioners, /api/institute/vaccine to edit vaccine for patient"
  );
});

server.use('/api/patients', patientRouter);
server.use('/api/practitioner', practitionerRouter);
server.use('/api/vaccines', vaccineRouter);
server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);
// server.use('/api/vaccines', authenticate, checkRole('Practitioner'), vaccineRouter);

module.exports = server;

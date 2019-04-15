const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send(
    "Navigate to /api/register to register, /api/login to Log in, /api/patient to set up profile as patient \n /api/institute to set up your profile as a practitioner and /api/vaccines to view list of vaccines /api/patient/vaccine to see list of your vaccines and for practitioners, /api/institute/vaccine to edit vaccine for "
  );
});

module.exports = server;

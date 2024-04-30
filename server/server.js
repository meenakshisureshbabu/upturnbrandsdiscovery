require("dotenv").config();
require('./config/database');  
const express = require("express");
const cors = require("cors");
const path = require('path');
const {
  headers,
} = require("../wave-frontend-client/src/mockdata/registerusermockdataresponse");
const { temperature } = require("../wave-frontend-client/src/config/systemconfig");
const app = express();
const port = 8081;
app.use(
  cors({
    origin: process.env.CORS_URL,
    methods: "GET,POST,DELETE,PUT",
    credentials: true,
    exposedHeaders: ["X-Auth-Token"],
  })
);

app.use(express.json());

app.use('/api/styx', require('./routes/api/users'));






app.post("/api/styx/user/:user/wave/create", (req, res) => {
  const userName = req.params.user;
  //console.log(req);
  const createWaveResponse = {
    waveId: "9bsdfhjsb-fhjf-sdgh-eyr645-hVdfhjs78ghsre",
  };
  res.status(200).json(createWaveResponse);
  //res.status(400).json(userProfileResponse);
});

app.post("/api/styx/login", (req, res) => {
  const userName = req.params.user;
  //console.log(req);
  const userObjResponse = {};
  // const userObjResponse = {
  //   currents: [],
  //   email: "meenakshi.bca@gmail.com",
  //   feed: [],
  //   hashedPassword: "$hahehfsjdbgjskdthjgns48t7ew85kerjgnsdkfj",
  //   id: "9bsdfhjsb-fhjf-sdgh-eyr645-hVdfhjsgfjzb",
  //   notifications: [],
  //   profile: {
  //     email: "",
  //     organization: "",
  //     username: "",
  //   },
  //   shared: [],
  // };
  res.header("X-Auth-Token", "hfnsdyH6584d7596njshm");
  //res.status(200).json(userProfileResponse);
  res.status(200).json(userObjResponse);
});


app.post("/api/styx/user/:user/wave/:waveId/ripple/gpt", (req, res) => {
  const userName = req.params.user;
  console.log(req);
  const askGPTObjResponse = {
    content:'Amazing content this is super Awesome',
    id:'9bsdfhjsb-fhjf-sdgh-eyr645-hVdfhjs78ghsre',
    parent:'9bsdfhjsb-fhjf-sdgh-eyr645-hVdf667r545e',
    ripple:{
      messages:[
        {
          content:'Do you know wood?',
          role:'user'
        },
        {
          content:'I know wood is made of wood',
          role:'assistant'
        },{
          content:'hello',
          role:'user'
        }
      ],
      model:'gpt-3.5-turbo',
      temperature:0.7,
    },
    tags:[
      "Amazing","wood",'super'
    ]
  };
  // const userObjResponse = {
  //   currents: [],
  //   email: "meenakshi.bca@gmail.com",
  //   feed: [],
  //   hashedPassword: "$hahehfsjdbgjskdthjgns48t7ew85kerjgnsdkfj",
  //   id: "9bsdfhjsb-fhjf-sdgh-eyr645-hVdfhjsgfjzb",
  //   notifications: [],
  //   profile: {
  //     email: "",
  //     organization: "",
  //     username: "",
  //   },
  //   shared: [],
  // };
  //res.header("X-Auth-Token", "hfnsdyH6584d7596njshm");
  //res.status(200).json(userProfileResponse);
  res.status(200).json(askGPTObjResponse);
});



app.get("/", (req, res) => {
  res.status(200).json("server start");
});

app.listen(port, (req, res) => {
  console.log(`Server is up and running at ${port}`);
});

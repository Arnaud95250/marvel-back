const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

// mongoose.connect(process.env.MONGODB_URI, {
mongoose.connect(process.env.LOCALHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// import des route mod et routeur
const userRoute = require("./routes/user");
const { find } = require("./models/Users");
app.use(userRoute);

//Clés de l'API MARVEL
const keyApi = process.env.KEY_API;
// const listen = process.env.listen;

// Requete GET qui récupère tout les Comics
app.get("/comics", async (req, res) => {
  const limit = req.query.limit || 100;
  const skip = req.query.skip;
  const title = req.query.title;
  try {
    const reponse = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${keyApi}&limit=${limit}`
    );

    res.status(200).json(reponse.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Requete GET qui récupère tout les comics === au characters
app.get("/comics/:characterId", async (req, res) => {
  const characterId = req.params.characterId;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${keyApi}`
    );
    console.log(response);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Requete GET qui récupère tout les personnages
app.get("/characters", async (req, res) => {
  const limit = req.query.limit || 100;
  const title = req.query.title;
  const skip = req.query.skip;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${keyApi}&limit=${limit}&skip=${skip}&title=${title}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get quipermet de faire une recherche de characters
app.get("/search-characters", async (req, res) => {
  try {
    const name = req.query.name;
    const limit = req.query.limit || 100;
    const skip = req.query.skip;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${keyApi}&limit=${limit}&skip=${skip}&name=${name}`
    );
    res.json(response.data);
  } catch (error) {
    console.log("char search error", error.message);
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas" });
});

// Localhost 3100
app.listen(process.env.PORT || 3100, () => {
  console.log("Server started on port " + process.env.PORT);
});

const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// import des route mod et routeur
const userRoute = require("./routes/user");
app.use(userRoute);

//Clés de l'API MARVEL
const keyApi = process.env.KEY_API;
// const listen = process.env.listen;

// Requete GET qui récupère tout les Comics
app.get("/comics", async (req, res)=>{
    const limit = req.query.limit || 100;
    const skip = req.query.skip;
    const title = req.query.title;
    try {
        const reponse = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${keyApi}&limit=${limit}`);
        console.log(reponse.data);
        res.status(200).json(reponse.data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// Requete GET qui récupère tout les 
app.get("/comics/:characterId", async (req, res) => {
    const characterId = req.query.characterId;
    console.log(characterId);
  
    try {
      const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${keyApi}`);
      console.log(response);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  })


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
  })

app.all("*", (req, res) => {
    res.status(404).json({ message: "Cette route n'existe pas" });
});

// Localhost 3000
app.listen(process.env.PORT||3000, () =>{ 
    console.log("Le serveur fonctionne correctement");
});
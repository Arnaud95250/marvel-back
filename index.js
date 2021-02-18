const express = require('express');
const axios = require('axios');
const cors = require('cors');
require("dotenv").config();
// const mongoose =require('mongoose');

const app = express();
app.use(cors())

const keyApi = process.env.KEY_API;


app.get("/comics", async (req, res)=>{
    const limit = req.query.limit || 100;
    const skip = req.query.skip;
    const title = req.query.title;
    try {
        const reponse = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${keyApi}&limit=${limit}&skip=${skip}`);
        console.log(reponse.data);
        res.status(200).json(reponse.data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.get("/comics/:characterId", async (req, res) => {
    const id = req.query.characterId;
    console.log(id);
  
    try {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${keyApi}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


app.get("/characters", async (req, res) => {
    const limit = req.query.limit || 100;
    const title = req.query.title;
    const skip = req.query.skip;
  
    try {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${keyApi}&limit=${limit}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });




app.all("*", (req, res) => {
    res.status(404).json({ message: "Cette route n'existe pas" });
});

// Localhost 3000
app.listen(3000, () =>{ 
    console.log("Le serveur fonctionne correctement");
});
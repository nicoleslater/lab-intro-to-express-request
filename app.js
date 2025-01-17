const express = require("express");
const pokemonData = require("./models/pokemon.json");
// console.log(pokemon[0]);
const app = express()

// Simple Activity 

// Routes 
app.get("/", (req, res) => {
    res.send("Welcome!")
});

// Index Route 

app.get("/bugs", (req, res) => {
    const numberOfBugs = 99;
    res.send(` <h1> ${numberOfBugs} little bugs in the code </h1>
    <a href="/bugs/${Number(numberOfBugs) + 2}">pull one down, patch it around </a>`);
});

// Show Route 

app.get("/bugs/:numberOfBugs", (req, res) => {
    const {numberOfBugs} = req.params;

    if(numberOfBugs <= 200){
        res.send(` <h1> ${numberOfBugs} little bugs in the code </h1>
        <a href="/bugs/${Number(numberOfBugs) + 2}">pull one down, patch it around </a>`);
    } else {
        res.send(`<h1> Too many bugs! </h1>
        <a href="/bugs/">Start Over</a>`);
    }
});

// Multiple Parameters
app.get("/bugs/:verb/:adjective/:noun", (req, res) => {
    const {verb, adjective, noun} = req.params;
    res.send (`<h1> Congratulations on starting a new project called ${verb} ${adjective} ${noun} </h1>`);
})



app.get("/pokemon/search", (req, res) => {
    const searchTerm = req.query.name;
    console.log("searchTerm:", searchTerm);
    
    const matchingPokemon = pokemonData.find((pokemon) => pokemon.name.toLowerCase() === searchTerm.toLowerCase());
    
    if (!matchingPokemon) {
        res.status(404).send(`Sorry, there is no pokemon found with that name '${searchTerm}'`);
    } else {
        res.json({name: matchingPokemon.name,
                img: matchingPokemon.img, 
                type: matchingPokemon.type,
                stats: matchingPokemon.stats,
                damages: matchingPokemon.damages,
                misc: matchingPokemon.misc
                })
    }
    
    });
// Routes
app.get("/pokemon", (req, res) => {
    res.send(pokemonData);
});

app.get("/pokemon/:indexOfArray", (req, res) => {
    const indexOfArray = parseInt(req.params.indexOfArray);
   
    if (isNaN(indexOfArray) || indexOfArray < 0 || indexOfArray >= pokemonData.length){
        res.status(404).send(`Sorry, that pokemon is not found at /pokemon/${indexOfArray} `);
    }else {
       const pokemon = pokemonData[indexOfArray];
       res.json(pokemon);
    }
});











module.exports = app;
'use strict';

const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const testRouter = require('./routers/tests-router');

const app = express();

const port = 8080;

app.use(bodyParser.json());

app.use('/api/tests', testRouter);

app.get('/api/proxy/pokemon', (req, res) => {
  axios({
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon/',
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.error(`ERROR: ${err}`);
      res.status(500).send();
    });
});

app.get('/api/pokemon', (req, res) => {
  const pokemon2 = {
    name: 'Bulbasaur',
    attacks: ['Vine Whip'],
  };

  const data = [
    {
      name: 'Pikachu',
      attacks: ['Thunder Shock', 'Thunderbolt'],
    },
    pokemon2,
    {
      name: 'Charmander',
      attacks: ['Flamethrower'],
    },
  ];

  res.send(data);
});

app.get('/api/pokemon/:name', (req, res) => {
  const data = [
    {
      name: 'Pikachu',
      attacks: ['Thunder Shock', 'Thunderbolt'],
    },
    {
      name: 'Bulbasaur',
      attacks: ['Vine Whip'],
    },
    {
      name: 'Charmander',
      attacks: ['Flamethrower'],
    },
  ];

  const { name } = req.params;

  const pokemonFound = data.filter(value => value.name === name)[0];
  if (pokemonFound) {
    res.send(pokemonFound);
  } else {
    res.status(404).send(`Pokémon not found: '${name}'`);
  }
});

app.post('/api/pokemon', (req, res) => {
  const { name, attacks } = Object.assign({}, req.body);

  console.log(`Name: ${name} Attacks: ${attacks}`);

  setTimeout(() => res.status(201).send(), 2000);

  // req.REQUEST_ID = '1234';
  // next();
});

// app.use((req) => {
//   console.log(`Request received: ${req.REQUEST_ID}`);
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

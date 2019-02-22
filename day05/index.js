'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/pokemon', (req, res) => {
  const pokemon2 = {
    name: 'Bulbasaur',
    attacks: ['Vine Whip']
  };

  const data = [
    {
      name: 'Pikachu',
      attacks: ['Thunder Shock', 'Thunderbolt']
    },
    pokemon2,
    {
      name: 'Charmander',
      attacks: ['Flamethrower']
    }
  ];

  res.send(data);
});

app.get('/api/pokemon/:name', (req, res, next) => {
  const data = [
    {
      name: 'Pikachu',
      attacks: ['Thunder Shock', 'Thunderbolt']
    },
    {
      name: 'Bulbasaur',
      attacks: ['Vine Whip']
    },
    {
      name: 'Charmander',
      attacks: ['Flamethrower']
    }
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
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

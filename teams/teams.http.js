const axios = require('axios').default;
const teamsController = require('./teams.controller');
const usersController = require('../auth/users.controller');

const getTeamFromUser = (req, res) => {
    let user = usersController.getUserFromUserId(req.user.userId);
    res.status(200).json({
                trainer: user.userName,
                team: teamsController.getTeamOfUser(req.user.userId)
            });
}

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();     
}

const addPokemonToTeam = (req, res) => {
    let pokemonName = req.body.name;
        let callPath = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`

        axios.get(callPath)
            .then(function(response) {
                // handle success
                let pokemon = {   
                    name: response.data.name,
                    pokedexNumber: response.data.id
                }
                teamsController.addPokemon(req.user.userId, pokemon);

                res.status(201).json(pokemon);
            })
            .catch(function(err) {
                // handle error
                res.status(400).json({message: err});
                console.log(err);
            })
            .then (function () {
                //always executed
            })
}

const deletePokemonFromTeam = (req,res) => {
    teamsController.removePokemon(req.user.userId, req.params.pokeid);
    res.send('Hello World!');
}

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;


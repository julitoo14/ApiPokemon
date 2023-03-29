const axios = require('axios').default;
const teamsController = require('./teams.controller');
const usersController = require('../auth/users.controller');

const getTeamFromUser = async (req, res) => {
    let user = usersController.getUserFromUserId(req.user.userId);
    let team = await teamsController.getTeamOfUser(req.user.userId);
    res.status(200).json({
                trainer: user.userName,
                team: team
            });
}

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();     
}

const addPokemonToTeam = async (req, res) => {
    let pokemonName = req.body.name;
    let callPath = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    let pokeApiResponse = await axios.get(callPath);
    let pokemon = {   
        name: pokeApiResponse.data.name,
        pokedexNumber: pokeApiResponse.data.id
    }
    try{
        await teamsController.addPokemon(req.user.userId, pokemon);
        res.status(201).json(pokemon);
    } catch (error){
        res.status(400).json({message: 'You already have 6 pokemon'});
    }        
    
}

const deletePokemonFromTeam = (req,res) => {
    teamsController.removePokemon(req.user.userId, req.params.pokeid);
    res.send('Hello World!');
}

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;


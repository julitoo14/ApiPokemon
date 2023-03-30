const axios = require('axios').default;
const teamsController = require('./teams.controller');
const usersController = require('../auth/users.controller');
const { to } = require('../tools/to');

const getTeamFromUser = async (req, res) => {
    let user = await usersController.getUserFromUserId(req.user.userId);
    let [teamErr, team] = await to(teamsController.getTeamOfUser(req.user.userId));
    if(teamErr){
        return res.status(400).json({message: teamErr});
    }
    res.status(200).json({
                trainer: user.userName,
                team: team
            });
}

const setTeamToUser = async (req, res) => {
    let [errorAdd, response] = await to(teamsController.setTeam(req.user.userId, req.body.team));
    if (errorAdd){
        res.status(400).json({message: errorAdd});
    }
    res.status(200).send();     
}

const addPokemonToTeam = async (req, res) => {
    let pokemonName = req.body.name;
    let callPath = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    let [pokeApiError, pokeApiResponse] = await to(axios.get(callPath));
    if(pokeApiError){
        return res.status(400).json({message: pokeApiError});
    }

    let pokemon = {   
        name: pokeApiResponse.data.name,
        pokedexNumber: pokeApiResponse.data.id
    }
    
    let [errorAdd, response] =  await to(teamsController.addPokemon(req.user.userId, pokemon));
    
    if(errorAdd){
       return res.status(400).json({message: 'You already have 6 pokemon'});
    }
    res.status(201).json(pokemon);
    
            
    
}

const deletePokemonFromTeam = async (req,res) => {
    let [errorAdd, response]  = await to(teamsController.removePokemon(req.user.userId, req.params.pokeid));
    if (errorAdd){
      return  res.status(400).json({message: errorAdd});
    }

    res.status(200).send();
}

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;


let teamsDatabase = {};

const bootstrapTeam = (userId) => {
    teamsDatabase[userId] = [];
}

const getTeamOfUser = (userId) => {
    return teamsDatabase[userId];
}

const addPokemon = (userId, pokemon) => {
    teamsDatabase[userId].push(pokemon);
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}

const cleanUpTeams = () => {
    for (let user in teamsDatabase) {
        teamsDatabase[user] = [];
    }
}

const removePokemon = (userId, pokeid) => {
    pokemon = teamsDatabase[userId][pokeid];
    teamsDatabase[userId].splice(pokeid, 1);
    console.log('Removed '+ pokemon.name + ' from index ' + pokeid);
}

exports.setTeam = setTeam;
exports.addPokemon = addPokemon;
exports.bootstrapTeam = bootstrapTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeams = cleanUpTeams;
exports.removePokemon = removePokemon;
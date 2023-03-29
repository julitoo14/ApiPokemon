let teamsDatabase = {};

const bootstrapTeam = (userId) => {
    teamsDatabase[userId] = [];
}

const getTeamOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(teamsDatabase[userId]);
    });
}

const addPokemon = (userId, pokemon) => {
    return new Promise((resolve, reject) => {
        if (teamsDatabase[userId].length==6){
            reject();
        }else{
            teamsDatabase[userId].push(pokemon);
            resolve();
        }
    });
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}

const cleanUpTeams = () => {
    return new Promise((resolve, reject) => {
        for (let user in teamsDatabase) {
            teamsDatabase[user] = [];
        }
        resolve();
    });
}

const removePokemon = (userId, pokeid) => {
    pokemon = teamsDatabase[userId][pokeid];
    teamsDatabase[userId].splice(pokeid, 1);
}

exports.setTeam = setTeam;
exports.addPokemon = addPokemon;
exports.bootstrapTeam = bootstrapTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeams = cleanUpTeams;
exports.removePokemon = removePokemon;
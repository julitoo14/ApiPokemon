const mongoose = require('mongoose');
const { to } = require('../tools/to.js');
const teamsModel = mongoose.model('teamsModel',
{userId: String, team: []});

const cleanUpTeams = () => {
    return new Promise(async (resolve, reject) => {
        await teamsModel.deleteMany({}).exec();
        resolve();
    });
}

const bootstrapTeam = (userId) => {
    return new Promise(async (resolve, reject) => {
        let newTeam = new teamsModel({userId: userId, team: []});
        await newTeam.save();
        resolve();
    });
}

const getTeamOfUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbTeam] = await to(teamsModel.findOne({userId: userId}).exec());

        if(err){
            return reject(err);
        }
        resolve(dbTeam.team);
    });
}

const addPokemon = (userId, pokemon) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbTeam] = await to(teamsModel.findOne({userId: userId}).exec());

        if(err){
            return reject(err);
        }
        if (dbTeam.team.length == 6){
            reject('You already have 6 pokemon');
        }else{
            dbTeam.team.push(pokemon);
            await dbTeam.save();
            resolve();
        }
    });
}



const removePokemon = (userId, pokeid) => {
    return new Promise(async(resolve, reject) => {
        let [err, dbTeam] = await to(teamsModel.findOne({userId: userId}).exec());
        if(err || !dbTeam){
            return reject(err);
        }
        if(dbTeam.team[pokeid]){
            dbTeam.team.splice(pokeid, 1);
        }
        await dbTeam.save();
        resolve();
    });
}

const setTeam = (userId, team) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbTeam] = await to(teamsModel.updateOne({userId: userId}, {$set: {team: team}}, {upsert: true}).exec());
        if(err || !dbTeam){
            return reject(err);
        }
        
        resolve();
    });
}

exports.setTeam = setTeam;
exports.addPokemon = addPokemon;
exports.bootstrapTeam = bootstrapTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeams = cleanUpTeams;
exports.removePokemon = removePokemon;
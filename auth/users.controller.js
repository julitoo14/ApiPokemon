const uuid = require('uuid');
const crypto = require('../tools/crypto');
const teams = require('../teams/teams.controller');
let userDatabase = {};
// userId --> password

const registerUser = (userName, password) =>{
    let hashedPassword = crypto.hashPasswordSync(password);
    // guardar en la base de datos nuestro usuario
    let userId = uuid.v4();
    userDatabase[userId] = {
        'userName': userName,
        'password': hashedPassword
    }
     
    teams.bootstrapTeam(userId);
}

const cleanUpUsers = () => {
    userDatabase = {};
}

const getUserIdFromUserName = (userName) => {
    for (let user in userDatabase) {
        if (userDatabase[user].userName == userName){
            let userData = userDatabase[user];
            userData.userId = user;
            return userData;

        }
    }         
}

getUserFromUserId = (userId) => { 
    return userDatabase[userId];
}

const checkUserCredentials = (userName, password, done) => {
    //comprobar que las credenciales son correctas
    let user = getUserIdFromUserName(userName);
    if (user){
        crypto.comparePassword(password, user.password, done);
    } else {
        done('Missing user');
    }
    return false;
}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName= getUserIdFromUserName;
exports.getUserFromUserId = getUserFromUserId;
exports.cleanUpUsers = cleanUpUsers;
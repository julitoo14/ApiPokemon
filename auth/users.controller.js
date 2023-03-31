const uuid = require('uuid');
const crypto = require('../tools/crypto');
const teams = require('../teams/teams.controller');
const { to } = require('../tools/to.js');
const mongoose = require('mongoose');
const userModel = mongoose.model('userModel',
{userName: String, password: String, userId: String});
// userId --> password



const registerUser = (userName, password) =>{
    return new Promise(async (resolve, reject) =>{
        let hashedPassword = crypto.hashPasswordSync(password);
        // guardar en la base de datos nuestro usuario
        let userId = uuid.v4();
        let newUser = new userModel({
            userName: userName,
            password: hashedPassword,
            userId: userId
        });
        await newUser.save();
        await teams.bootstrapTeam(userId);
        resolve(); 
    });


}

registerUser('julito', '1234');

const cleanUpUsers = () => {
    return new Promise(async (resolve, reject) =>{
        await userModel.deleteMany({}).exec();
        resolve();
    });
}

const getUserIdFromUserName = (userName) => {
    return new Promise(async (resolve, reject) =>{
        let [err, result] = await to(userModel.findOne({userName: userName}).exec());
        if(err){
           return reject(err);
        }
        resolve(result);
    })
}

getUserFromUserId = (userId) => {
    return new Promise(async (resolve,reject) => {
        let [err, result] = await to(userModel.findOne({userId: userId}).exec());
        if(err){
            return reject(err);
        } 
        resolve(result);
    });
}

const checkUserCredentials = (userName, password) => {
    //comprobar que las credenciales son correctas
    return new Promise(async (resolve, reject) =>{
        let user = await getUserIdFromUserName(userName);
        if (user){
            crypto.comparePassword(password, user.password, (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        } else {
            reject('Missing user');
        }
    });
}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName= getUserIdFromUserName;
exports.getUserFromUserId = getUserFromUserId;
exports.cleanUpUsers = cleanUpUsers;
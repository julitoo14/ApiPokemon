const jwt = require('jsonwebtoken');
const usersController = require('./users.controller');
const { to } = require('../tools/to');

const loguear = async (req, res) => {
    if(!req.body){ // si no me llega ningun dato devuelvo 400
        return res.status(400).json({message: 'Missing data'});
    } else if(!req.body.user || !req.body.password){ // si no me llega el usuario o el password devuelvo 400
        console.log(req.body.user, req.body.password);
        return res.status(400).json({message: `${req.body}`});
    }

    // Se comprueban las credenciales, en caso de no ser validas, error
    let [err, resp] = await to(usersController.checkUserCredentials(req.body.user, req.body.password)); 
    
    if(err || !resp){
            return  res.status(401).json({message: 'Invalid credentials'});
    }

                  
        //si son validas, se genera un JWT y lo devolvemos
    let user = await usersController.getUserIdFromUserName(req.body.user);
    const token = jwt.sign({userId: user.userId}, 'secretPassword');
    res.status(200).json(
        {token: token}
    );
    
}

exports.loguear = loguear;
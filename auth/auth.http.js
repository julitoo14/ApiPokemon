const jwt = require('jsonwebtoken');
const usersController = require('./users.controller');

const loguear = (req, res) => {
    if(!req.body){ // si no me llega ningun dato devuelvo 400
        return res.status(400).json({message: 'Missing data'});
    } else if(!req.body.user || !req.body.password){ // si no me llega el usuario o el password devuelvo 400
        return res.status(400).json({message: 'Missing data'});
    }

    // Se comprueban las credenciales, en caso de no ser validas, error
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => { 
        if(!result){
            return  res.status(401).json({message: 'Invalid credentials'});
        };
                  
        //si son validas, se genera un JWT y lo devolvemos
        let user = usersController.getUserIdFromUserName(req.body.user);
        const token = jwt.sign({userId: user.userId}, 'secretPassword');
        res.status(200).json(
        {token: token}
        );
    });
}

exports.loguear = loguear;
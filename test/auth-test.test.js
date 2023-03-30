const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../app').app;
const usersController = require('../auth/users.controller');
const teamsController = require('../teams/teams.controller');


beforeEach(async () => {
    await usersController.registerUser('julito', '1234');
    await usersController.registerUser('mile', '1234');
});

afterEach(async () => {
    await teamsController.cleanUpTeams();
    await usersController.cleanUpUsers();
})


describe('Suite de pruebas auth' , () => {
    it('should return 401 when no jwt token available', (done) => {
        //la llamada no tiene la llave correcta
        chai.request(app)
        .get('/teams')
        .end((err, res) => {
            chai.assert.equal(res.statusCode, 401);
            done();
        });
    });

    it('should return 200 when jwt token is valid', (done) => {
        
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'julito', password: '1234'})
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
                            
                });  

    });


})


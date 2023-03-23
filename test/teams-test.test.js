const chai = require('chai');
const chaiHttp = require('chai-http');
const { beforeEach } = require('mocha');
chai.use(chaiHttp);

const app = require('../app').app;
const usersController = require('../controllers/users');
const teamsController = require('../controllers/teams.js');


before((done) => {
    usersController.registerUser('julito', '1234');
    usersController.registerUser('mile', '1234');
    done();
});

afterEach((done) => {
    teamsController.cleanUpTeams();
    done();
})

describe('Suite de pruebas de teams', () => { 

    it('should return the given user`s team ', (done) => {
        let team = [{name: 'Charizard'}, {name: 'Blastoise'}];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'julito', password: '1234'})
            .end((err, res) => {
                let token = res.body.token;
                // se espera el login exitoso
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/teams')
                    .send({
                        team: team
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // tiene equipo con Charizard y Blastoise
                                // ( {trainer : 'julito', team : []})
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'julito');
                                chai.assert.equal(res.body.team[0].name, team[0].name);
                                chai.assert.equal(res.body.team[1].name, team[1].name);
                                chai.assert.equal(res.body.team.length, team.length);
                                done();
                            });
                    });
            });     
    });

    it('should return the pokedex number ', (done) => {
        
        let pokemonName = 'pikachu';
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user: 'julito', password: '1234'})
        .end((err, res) => {
                let token = res.body.token;
                // se espera el login exitoso
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post('/teams/pokemons')
                    .send({name: pokemonName})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // tiene equipo con Charizard y Blastoise
                                // ( {trainer : 'julito', team : []})
                                
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'julito');
                                chai.assert.equal(res.body.team[0].name, pokemonName);
                                chai.assert.equal(res.body.team[0].pokedexNumber, 25);
                                chai.assert.equal(res.body.team.length, 1);
                                done();
                            });
                    });
            });     
    });

    it('should return the given user`s team without the removed pokemon ', (done) => {
        let team = [{name: 'Charizard'}, {name: 'Blastoise'}];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'julito', password: '1234'})
            .end((err, res) => {
                let token = res.body.token;
                // se espera el login exitoso
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/teams')
                    .send({
                        team: team
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode,200);
                        chai.request(app)
                            .delete('/teams/pokemons/0')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.assert.equal(res.statusCode,200);
                                chai.request(app)
                                .get('/teams')
                                .set('Authorization', `JWT ${token}`)
                                .end((err, res) => {
                                    // tiene equipo con Charizard y Blastoise
                                    // ( {trainer : 'julito', team : []})
                                    console.log(res.body.team);
                                    chai.assert.equal(res.statusCode, 200);
                                    chai.assert.equal(res.body.trainer, 'julito');
                                    chai.assert.equal(res.body.team[0].name, team[1].name);
                                    chai.assert.equal(res.body.team.length, 1);
                                    done();
                                });

                            });
                    });
            });     
    });


});

after((done) => {
    usersController.cleanUpUsers();
    done();
})
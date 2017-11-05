
const request = require('supertest');
const expect = require('chai').assert
const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require('mongoose');
const mockgoose = new Mockgoose(mongoose);
const url_api = '/apiv1/anuncios'
const token_test= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWZkYWM4MGQ5Zjc0ZjFhYjBhNTU3NjEiLCJpYXQiOjE1MDk5MjIzMTYsImV4cCI6MjM3MzkyMjMxNn0.BS-iFKQmyGmm-9dq3JllgXNzOpLst296bqBkXwnyw3I"


describe('API anuncios', function(){
    
    let agent;
    let app;

    before(async function() {
        
        // Inicializamos mockgoose
        await mockgoose.prepareStorage();
        mongoose.Promise = global.Promise;
        await mongoose.connect('mongodb://example.com/TestingDB', {
            useMongoClient: true
        });
        
        // limpiamos las definiciones de modelos y esquemas de mongoose
        mongoose.models = {};
        mongoose.modelSchemas = {};
        
        // cargamos datos de prueba
        const mongodbFixtures = require('./mongodb.fixtures');
        await mongodbFixtures.initAnuncios();
        
        app = require('../app');
        agent = request.agent(app);
    });

    it('should return the json with all the advertisements', function(done) {
        agent
            .get(url_api+'?token='+token_test )
            .set('Accept', 'application/json')
            .expect(200, done);
    })

    it('should return one ad with tag mobile', function(done) {
        agent
            .get(url_api + '?tag=mobile'+'&token='+token_test)
            .expect(200).end((err, res) => {
                
                expect(res.body.result.rows[0].nombre=='Prueba');
                expect(Object.keys(res.body.result.rows).length==1);
                done();
            });
    });
    it('should return one ad with venta=true', function(done) {
        agent
            .get(url_api + '?venta=false'+'&token='+token_test)
            .expect(200).end((err, res) => {
                expect(res.body.result.rows[0].nombre=='Prueba2');
                expect(Object.keys(res.body.result.rows).length==1);
                done();
            });
    });
    it('should return one ad with prize < 10', function(done) {
        agent
            .get(url_api + '?precio=-10'+'&token='+token_test)
            .expect(200).end((err, res) => {
                expect(res.body.result.rows[0].nombre=='Prueba3');
                expect(Object.keys(res.body.result.rows).length==1)    
                done();
            });
    });

    it('should return two ads with prize > 10', function(done) {
        agent
            .get(url_api + '?precio=10-'+'&token='+token_test)
            .expect(200).end((err, res) => {
                expect(res.body.result.rows[0].nombre=='Prueba');
                expect(res.body.result.rows[1].nombre=='Prueba2');
                expect(Object.keys(res.body.result.rows).length==2)    
                done();
            });
    });

    it('should return two ads with prize between 5-80', function(done) {
        agent
            .get(url_api + '?precio=5-80'+'&token='+token_test)
            .expect(200).end((err, res) => {
                expect(res.body.result.rows[0].nombre=='Prueba');
                expect(res.body.result.rows[1].nombre=='Prueba3');
                expect(Object.keys(res.body.result.rows).length==2)    
                done();
            });
    });
    it('should return one add with prize equal to 70', function(done) {
        agent
            .get(url_api + '?precio=70'+'&token='+token_test)
            .expect(200).end((err, res) => {
                expect(res.body.result.rows[0].nombre=='Prueba');
                expect(res.body.result.rows[0].precio==70);
                expect(Object.keys(res.body.result.rows).length==1)    
                done();
            });
    });
    it('should return one ad with name equal to "Prueba2"', function(done) {
        agent
            .get(url_api + '?nombre=Prueba2'+'&token='+token_test)
            .expect(200).end((err, res) => {
                expect(res.body.result.rows[0].nombre=='Prueba2');
                expect(Object.keys(res.body.result.rows).length==1)    
                done();
            });
    });
    it('should return two ads using limit=2"', function(done) {
        agent
            .get(url_api + '?limit=2'+'&token='+token_test)
            .expect(200).end((err, res) => {
                expect(Object.keys(res.body.result.rows).length==2)    
                done();
            });
    });
    it('should return one ad using start=2', function(done) {
        agent
            .get(url_api + '?start=2'+'&token='+token_test)
            .expect(200).end((err, res) => {
                expect(Object.keys(res.body.result.rows).length==1)    
                done();
            });
    });

    it('should not return the json with all the advertisements without token', function(done) {
        agent
            .get(url_api)
            .set('Accept', 'application/json')
            .expect(401, done);
    })

    
    
          
      
    

    


});
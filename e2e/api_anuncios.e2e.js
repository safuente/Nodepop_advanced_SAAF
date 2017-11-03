const request = require('supertest');
const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require('mongoose');
const mockgoose = new Mockgoose(mongoose);

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

    it('should return 200', function(done) {
        agent
            .get('/apiv1/anuncios')
            .expect(200, done);
    })

});
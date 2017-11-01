const request = require('supertest');

// Inicializamos mockgoose
const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require('mongoose');
const mockgoose = new Mockgoose(mongoose);
const mongodbFixtures = require('./mongodb.fixtures');

//const app = require('../app');

describe('API anuncios', function(){
    let anuncio;
    let app;

    before(async function() {
        await mockgoose.prepareStorage();
        mongoose.Promise = global.Promise;
        await mongoose.connect('mongodb://example.com/TestingDB',{
            useMongoClient: true
        });
        // limpiamos las definiciones de modelos y esquemas de mongoose
        mongoose.models = {};
        mongoose.modelSchemas = {};
        await mongodbFixtures.initAnuncios();    
        app = require('../app');
        anuncio = request.anuncio(app);
});

// despues de cada test
afterEach(function() {

});

it('should return 200', function(done) {
    anuncio
      .get('/apiv1/anuncios')
      .expect(200, done);
  })

});
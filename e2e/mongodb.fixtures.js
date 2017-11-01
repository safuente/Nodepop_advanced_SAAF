'use strict';
const mongoose = require('mongoose');
const Anuncio= require('../models/Anuncio');

module.exports.initAnuncios = async function() {
  await Anuncio.deleteMany();
  await Anuncio.insertMany([
    { nombre: 'Prueba', venta: true, precio: 70, foto:'prueba.jpg', tags:["mobile","lifestyle"] }
  ]);
}

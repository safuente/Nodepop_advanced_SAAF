'use strict';
const mongoose = require('mongoose');
const Anuncio= require('../models/Anuncio');

module.exports.initAnuncios = async function() {
  await Anuncio.remove();
  await Anuncio.insertMany([
    { nombre: 'Prueba', venta: true, precio: 70, foto:'prueba.jpg', tags:["mobile","lifestyle"] },
    { nombre: 'Prueba2', venta: false, precio: 100, foto:'prueba2.jpg', tags:["motor","lifestyle"] },
    { nombre: 'Prueba3', venta: true, precio: 9, foto:'prueba3.jpg', tags:["motor","lifestyle"] }
  ]);
}

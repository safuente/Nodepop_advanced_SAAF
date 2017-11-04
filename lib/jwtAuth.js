'use strict';

const jwt = require('jsonwebtoken');

module.exports = function() { // devuelve un middleware que si no hay usuario responde con error
  return function(req, res, next) {
    
    const token = req.body.token || req.query.token || req.get('x-access-token');
    
    if (!token) {
      const err = res.status(401).json({ok: false, error: 'unauthorized'}) ;
      
      return ;
    }
    var decoded = jwt.decode(token);
    var dateNow = new Date();
    if (decoded.exp * 1000 <  dateNow.getTime()) {
      const err = res.status(401).json({ok: false, error: 'token invalid'}) ;
      
      return ;
    }
    
   
    
    // tengo token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      
      if (err){
       
        return next(err); 
      }
      // guardo el id del usuario en request para que
      // los siguientes middlewares puedan usarlo
      req.userId = decoded._id;
      next();
    });

  }
}
'use tsrict';

const Usuario = require('../../models/Usuario');
const i18n = require('../../lib/i18nSetup');
const jwt = require('jsonwebtoken');

class LoginController {
  index(req, res, next) {
    res.locals.email = 'user@example.com'; // para que la vista tenga el email
    res.locals.error = '';
    res.render('login');
  }

 

  // POST /loginJWT
  async postLoginJWT(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    // hacemos un hash de la password
    const hashedPassword = Usuario.hashPassword(password);

    const user = await Usuario.findOne({ email: email, password: hashedPassword });

    if (!user) {
      // Respondemos que no son validas las credenciales
      res.json({ok: false, error: 'invalid credentials'});
      
      return;
    }

    // el usuario está y coincide la password
    
    // creamos el token
    jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
      
    }, (err, token) => {
      if (err) {
        return next(err);
        
      }
      // respondemos con un JWT
      res.json({ok: true, token: token});

    });
  }

  logout(req, res, next) {
    delete req.session.authUser;
    req.session.regenerate(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }
}

module.exports = new LoginController();

const mysql = require('mysql');
const express = require('express');
const twig = require('twig');
const axios = require('axios');
const multer = require('multer');
var path = require('path')
//const upload = multer({dest: 'static/images/'});
//const fileUpload = require('express-fileupload');
const DIR = './public/images/';
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "livrerecette",
  multipleStatements: true
});

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, DIR);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({storage: storage});
var session = require('express-session');
var hbs =  require('express-handlebars');
const bodyparser = require('body-parser');
var cors = require('cors');
var app =express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyparser.json());
app.use(cors());
app.use(express.static('public/'));
app.use('/static', express.static('public/'));
//app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));
mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log('connection a la base de données reussi avec success');
    }
    else
    {
        console.log('DB connection echoué \n erreur : '+JSON.stringify(err, undefined, 2));
    }
})

app.listen(3000, () => console.log('server est demarré sur le port : 3000'));

//recuperer la liste des type de repas
app.get('/repas/type', (req, res) => {
    mysqlConnection.query('SELECT * FROM typerepas ', (err, rows, fields) => {
        if (!err) {
            //console.log(rows);
            res.send(rows);
        } else {
            console.log(err);
        }
    }
    );
});

//recuperer un type de repas
app.get('/repas/type/:id', (req, res) => {
    mysqlConnection.query("SELECT * FROM typerepas WHERE idTypeRepas = ? ",[req.params.id], (err, rows, fields) => {
        if (!err) {
            //console.log(rows);
            res.send(rows);
        } else {
            res.send(err);
            //console.log(err);
        }
    }
    );
});


//recuperer la liste des repas d'un type precis
app.get('/liste/repas/type/:id',(req,res)=>{
    mysqlConnection.query("SELECT * FROM repas where idTypeRepas = ?",[req.params.id],(err, rows, fields) => {
        if (!err) {
          console.log(rows);
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
});

//recuperer la liste de tout les repass
app.get('/repas', (req, res) => {
    mysqlConnection.query('SELECT * FROM repas ', (err, rows, fields) => {
        if (!err) {
            //console.log(rows);
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
});

//recuperer un repas en particulier
app.get('/details/repas/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM repas, typerepas where repas.idTypeRepas = typerepas.idTypeRepas and idRepas = ?',[req.params.id],(err, rows, fields) => {
        if (!err) {
          //console.log(rows);
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
});

//rechercher un repas
app.post('/recherche/:id', (req, res) => {
    let restau = req.body;

    mysqlConnection.query('INSERT INTO Restaurant = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            rows.forEach(element => {
                if (element.constructor == Array) {
                    res.send(element[0])
                }
            });
        }
        else {
            console.log(err);
        }
    });
});


/**
 * la partie admin et ses request d'insertion supression et modification des repas, dees
 */
//liste des typerepas
app.get('/dashbord/typerepas', (req, res) => {
  mysqlConnection.query("SELECT * FROM typerepas", (err, rows, fields) => {
      if (!err) {
          console.log(rows);
          res.render('listeType.twig',{ listeTypeRepas : rows})
      } else {
          returnError(res, err.sqlMessage);
          console.log(err.sqlMessage);
      }
  }
  );
});

//formulaire de creation des typerepas
app.get('/dashbord/typerepas/create', (req, res) => {
     typeRepas = {
       idTypeRepas :'',
       libelleType :'',
       imageType :'',
       iconType :''
     }
     res.render('createType.twig',{ typeRepas});
  }
  );

  //formulaire de creation des typerepas
  app.post("/dashbord/typerepas/create", upload.single('imageType'), (req, res) => {
          console.log(req.file);
          console.log(req.body.iconType);
          let typeR = [req.body.libelleType,req.file.filename,req.body.iconType];
          mysqlConnection.query("INSERT INTO typerepas(libelleType, imageType, iconType) VALUES(?, ?, ?)", typeR, (err, rows, fields) => {
                if (!err) {
                  res.redirect('/dashbord/typerepas');
                }
                else {
                  returnError(res, err.sqlMessage);
                }
          });
    });
//modifier un typerepas
app.post('/dashbord/typerepas/update/:id', (req, res) => {
  console.log(req.params);
  /*mysqlConnection.query("UPDATE typerepas SET  where idTypeRepas = ? ", [req.params.id], (err, rows, fields) => {
      if (!err) {
          console.log(rows);
          res.render('detailsRepas.twig',{ TypeRepas : rows})
      } else {
          returnError(res, err.sqlMessage);
          console.log(err.sqlMessage);
      }
  }
);*/
});
//edition d'un typerepas
app.get('/dashbord/typerepas/edite/:id', (req, res) => {
  mysqlConnection.query("SELECT * FROM typerepas where idTypeRepas = ? LIMIT 1", [req.params.id], (err, rows, fields) => {
      if (!err) {
          console.log(rows);
          res.render('/frmUpdateType.twig',{ Type : rows[0]})
      }
      else
      {
          returnError(res, err.sqlMessage);
          console.log(err.sqlMessage);
      }
  });
});

//edition d'un typerepas
app.get('/dashbord/typerepas/details/:id', (req, res) => {
  mysqlConnection.query("SELECT * FROM typerepas where idTypeRepas = ? LIMIT 1", [req.params.id], (err, rows, fields) => {
      if (!err) {
          console.log(rows[0]);
          res.render('detailsRepas.twig',{ typeRepas : rows[0]})
      } else {
          returnError(res, err.sqlMessage);
          console.log(err.sqlMessage);
      }
  }
  );
});
//supprimer un typerepas
app.get('/dashbord/typerepas/delete/:id', (req, res) => {
  mysqlConnection.query("DELETE typerepas WHERE idTypeRepas = ?", [req.params.id], (err, rows, fields) => {
      if (!err) {
          console.log(rows);
          res.render('/typRepas/details.twig',{ TypeRepas : rows})
      } else {
          returnError(res, err.sqlMessage);
          console.log(err.sqlMessage);
      }
  }
  );
});

//repas

app.get('/dashbord/repas', (req, res) => {
  mysqlConnection.query("SELECT * FROM repas", (err, rows, fields) => {
      //auth(req);
      if (!err) {
          console.log(rows);
          res.render('listeRepas.twig',{ listeRepas : rows})
      } else {
          returnError(res, err.sqlMessage);
          console.log(err.sqlMessage);
      }
  }
  );
});
//formulaire de creation des repas
app.get('/dashbord/repas/create', (req, res) => {
    mysqlConnection.query("SELECT * FROM typerepas ",(err, rows, fields) => {
        console.log(rows);
    res.render('createRepas.twig',{ typeRepas:rows});
});
});

  //formulaire de creation des typerepas
  app.post("/dashbord/repas/create", upload.single('imageType'), (req, res) => {
          console.log(req.file);
          console.log(req.body.iconType);
          let recette = [req.body.typeRepas,req.body.libelleRepas,req.file.filename,req.body.ingredient, req.body.etape];
          mysqlConnection.query("INSERT INTO repas( idTypeRepas,libelleRepas,imageRepas,ingredient,recette) VALUES(?,?,?,?,?)", recette, (err, rows, fields) => {
                if (!err) {
                  res.redirect('/dashbord/repas');
                }
                else {
                  returnError(res, err.sqlMessage);
                }
          });
    });
//modifier un typerepas
app.post('/dashbord/repas/update/:id', (req, res) => {
  console.log(req.params);
  /*mysqlConnection.query("UPDATE typerepas SET  where idTypeRepas = ? ", [req.params.id], (err, rows, fields) => {
      if (!err) {
          console.log(rows);
          res.render('detailsRepas.twig',{ TypeRepas : rows})
      } else {
          returnError(res, err.sqlMessage);
          console.log(err.sqlMessage);
      }
  }
);*/
});
//edition d'un repas
app.get('/dashbord/repas/details/:id', (req, res) => {
  mysqlConnection.query("SELECT * FROM repas, typerepas where repas.idTypeRepas = typeRepas.idTypeRepas and idRepas = ? LIMIT 1", [req.params.id], (err, rows, fields) => {
      if (!err) {
          console.log(rows);
          res.render('detailsRepas.twig',{ repas : rows[0]})

      } else {
          returnError(res, err.sqlMessage);
          console.log(err.sqlMessage);
      }
  });
});

//supprimer un repas
app.get('/dashbord/repas/delete/:id', (req, res) => {
    mysqlConnection.query("DELETE repas WHERE idRepas= ? LIMIT 1", [req.params.id], (err, rows, fields) => {
    if (!err) {

    res.redirect('/dashbord/repas');

} else {
    returnError(res, err.sqlMessage);
    console.log(err.sqlMessage);
}
});
});


//details d'un repas
app.get('/dashbord/repas/edite/:id', (req, res) => {
    console.log(req);
  mysqlConnection.query("SELECT * FROM repas where idRepas = ?;SELECT * FROM typerepas", [req.params.id],(err, rows, fields) => {
      if (!err) {
          console.log(rows[0][0].idRepas);
    console.log(rows[1]);

          res.render('FrmUpdateRepas.twig',{ repas: rows[0][0], typeRs: rows[1]})
      } else {
          returnError(res, err.sqlMessage);
          console.log(err.sqlMessage);
      }
  }
  );
});
//supprimer un repas
app.get('/dashbord/repas/delete/:id', (req, res) => {
  mysqlConnection.query("DELETE repas WHERE idRepas = ?", [req.params.id], (err, rows1, fields) => {
      if (!err) {
          console.log(rows);
          res.render('detailsRepas.twig',{ TypeRepas : rows})
      } else {
          returnError(res, err.sqlMessage);
          console.log(err.sqlMessage);
      }
  }
  );
});

//gestion des error
function returnError(res, ErrorMsg)
{
  res.render('error.twig', {
    ErrorMsg : ErrorMsg
  });
}

//connexion

app.get('/dashbord/login', (req, res) => {
    res.render('login.twig');
});

app.post('/dashbord/login/', (req, res) => {
    console.log(req.body);
    var username = req.body.login;
    var password = req.body.password;
    if (username && password) {
        mysqlConnection.query('SELECT * FROM user WHERE email = ? AND password = ? LIMIT 1', [username, password], (err, res, fields) => {
            if (res.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                console.log(res)
                res.redirect('/dashbord/typerepas');
            }
            else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

app.get('/dashbord/logout', (req, res) => {
    if(typeof req.session.username !== 'undefined' ||  req.session.username !== null){
    req.session.username = null;
    req.session.loggedin = null;
    res.redirect('/dashbord/login');
    }
    res.end();

});

function auth(req) {
    console.log(req.session);
    if (typeof res.session.username === 'undefined' || res.session.username === null  ) {
        res.redirect('/dashbord/login');
    }
    res.end();
}
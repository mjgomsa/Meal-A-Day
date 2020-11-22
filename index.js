const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const expressSession = require('express-session');


let cors = require('cors');

const corsConfi = {
  origin: "http://localhost:3000", //LOCAL
  //origin: "http://localhost:3000", //HEROKU
  credentials: true
}
app.use(cors(corsConfi));


app.use(expressSession({
    name: "kmpSessionCookie",
    secret: "express session secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        //   secure: true, 
          maxAge: 5184000000
    }
}));

app.listen(port, () => {
    // console.log("User Login Example up and running on port " + port);
  console.log(`Example app listening at http://localhost:${port}`)
})



const Secret = require("./Secret.js");

const login_data = require('data-store')({path: process.cwd() + '/data/users.json'});

app.post('/createUser', (req, res) =>{
    let user = req.body.user;
    let data = req.body
    if (login_data.get(user) == null){
      login_data.set(user, data);
      res.json(true);
      return;
    }else{
      res.status(400).send("Username already exists!");
    }
  });

//   app.post('/login', async (req, res) => {
//       console.log('hey')
//     let user = req.body.user
//     let password = req.body.password
//     let result = await checkLogin(user, password)
//     if (result == "User does not exist"){
//         res.status(404).send("Not found");
//         return
//     } else if (result == "Incorrect password"){
//         res.status(403).send("Unauthorized");
//         return
//     } else {
//         req.session.username = user;
//         res.json(true);
//         return user;
//     }
// })

app.post('/login', (req, res) => {
    console.log('hey')
    let user = req.body.user;
    let password = req.body.password;

    //check 
    let user_data = login_data.get(user);
    if(user_data == null) {
        res.status(404).send("Not found");
        return;
    }

    if (user_data.password == password) {
         console.log("User " + user + " credentials valid");
         req.session.user = user;
         res.json(true);
         return;
    }
    res.status(403).send("Unauthorized");
});

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json(true);
});



// all ids for the currently logged in user
app.get('/secret', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    res.json(Secret.getAllIDsForOwner(req.session.user));
    return;
});

app.get('/secret/:id', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    let s = Secret.findByID(req.params.id);
    if(s == null) {
        res.status(404).send("Not found");
        return;
    }

    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }

    res.json(s);
});

app.post('/secret', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    let s = Secret.create(req.session.user, req.body.secret);
    if(s == null) {
        res.status(400).send("Bad Request");
        return;
    }

    return res.json(s);
});

app.put('/secret/:id', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }
    let s = Secret.findByID(req.params.id);
    if(s == null) {
        res.status(404).send("Not found");
        return;
    }

    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }

    s.update(req.body.secret);

    res.json(s.id); //sends back id-- frontend can get id 
});

app.delete('/secret/:id', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

     let s = Secret.findByID(req.params.id);
     if (s == null) {
         res.status(404).send("Not found");
         return;
     }

     if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }

     s.delete();
     res.json(true);
});


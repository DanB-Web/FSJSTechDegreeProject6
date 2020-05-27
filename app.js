//Load dependencies
const express = require("express");
const { projects } = require("./data.json");

//Instantiate instance of Express
const app = express();

//const router = express.Router();

// View engine setup
app.set('view engine', 'pug');

//Allow Express to serve static assets from 'public' folder
app.use(express.static('public'));

//Routes
app.get('/', (req, res, next) => {   
      res.render('index', { projects });  
      console.log("index GET")
});

app.get('/about', (req, res, next) => {   
    res.render('about', { projects });  
    console.log("route GET")
});

app.get('/projects/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    console.log(`route Project ${projectId} GET`);
    if (project) {
      res.render('project', { project }); //Changed to project from projects
    } else {
      res.sendStatus(404);
    }
  });

//Error Handling
app.use(function (req, res, next) {
    res.status(404).render('nope');
    console.log("This page doesn't exist ya wally!");
  })

//Local development server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});


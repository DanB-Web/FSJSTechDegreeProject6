/********************Application Setup and Config**************************/

//Load dependencies
const express = require("express");
const chalk = require('chalk');

//Load data from JSON file
const { projects } = require("./data.json");

//Instantiate instance of Express
const app = express();

// View engine setup
app.set('view engine', 'pug');

//Allow Express to serve static assets from 'public' folder
app.use(express.static('public'));

/**********************************Routes********************************/

//Home Page Route
app.get('/', (req, res, next) => {   
      res.render('index', { projects });  
      console.log(chalk.green("index GET"));
});

//About Page Route
app.get('/about', (req, res, next) => {   
    res.render('about');  
    console.log(chalk.green("route GET"));
});

//Dynamic Project Page Routes
/*Note the render method passes the project page the relevant project JSON (not the entire object) as 'project'*/
app.get('/projects/:id', function(req, res, next) {
    const projectId = req.params.id;

  if (projectId > 0 && projectId <= projects.length) {
    const project = projects.find( ({ id }) => id === +projectId );

      if (project) {
      res.render('project', { project });
      console.log(chalk.green(`Project ${projectId} GET`));
      } else {
      res.sendStatus(404);
      }
  }

  else {next();}

  });

/******************************Error Handling*********************************/
//Create new Error object and pass to next Middleware function
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

//Process new Error object and render 'error' page
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', { err });
    console.log(chalk.red("ERROR on GET request"));
  });

/**************************Local Dev Server Port 3000************************/ 
app.listen(3000, () => {
    console.log(chalk.bgGreen('The application is running on localhost:3000!'));
});


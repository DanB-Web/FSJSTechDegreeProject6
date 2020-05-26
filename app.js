const express = require("express");
const data = require("./data.json");

const app = express();

//const router = express.Router();


// view engine setup
app.set('view engine', 'pug');

//Allow Express to serve static assets in 'public' folder
app.use(express.static('public'));



app.get('/', (req, res) => {   
      res.render('index', { data });  
      console.log("index GET")
});

//Local development server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});


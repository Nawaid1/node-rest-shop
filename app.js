const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
require('dotenv').config();

//add 1
//const mainRoutes = require('./fetch_api/main');

//Database Connection String
//mongoose.connect('mongodb+srv://admin01:<password>@cluster0.dsaee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const connectionString = process.env.MONGODB_CONNECTION_STRING;
const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

//mongoose connect
mongoose
.connect(connectionString, connectionConfig)  // returns Promise
.then(
    () => {
        console.log('DB is connected');
    }
)
.catch(
    (dbError) => {
        console.log('error occurred', dbError);
    }
);



//for logs on cmd
app.use(morgan('dev'));

//new syntax
//app.use(express.urlencoded({extended:false}));
//app.use(express.json());

//old syntax
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-with,Content-Type, Accept, Authorization");
  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
      return res.status(200).json({});
    }
    next();
})
//Routes handling Requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//add 2
//app.use('/main' , mainRoutes);

/////

/* app.get(
    //'/',                        // http://localhost:3001/
    (req, res) => { 
        res.send("<html><head><title>Home</title></head><body><h1>Welcome to The Website</h1></body></html>")
    }
); */

///////

// front end connection
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/fetch_api/index.html");
  });




//error handling
/* app.use((req, res, next) => {
const error = new error('not found');
error.status(404);
next(error);
})
app.use((error, req, res, next) => {
res.status(error.status || 500);
res.json({
    error:{
        message: error.message
    }
});
}); */


//addition
//let fs = require('fs');
//function onRequest(request, response){
  //  response.writehead(200,{'content-type':'text/html'});
    //fs.readFile('./index.html', null,function(error,data){
      //  if(error){
        //    response.writehead(404);
          //  response.write('file not found');
        //} else {
        //    response.write(data);
       // }
        //response.end();
    //});
  // }
   
  



module.exports = app;
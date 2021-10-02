//const { json } = require('express');
const express = require('express');
const router = express.Router();
const product = require('../models/product');
const mongoose = require('mongoose');
//const { response } = require('../../app');
const { request } = require('express');

//Read All Products
router.get('/', (req, res, next) => {
    product.find()
    .exec()
    .then(docs =>{
        console.log(docs);
       //if (docs.length>=0){
        res.status(200).json(docs);
    //} else {
    //    res.status(404).json({
    //     message: 'No entries found'
    //    });
    //  }
        })
.catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
});
});


//Create product
router.post('/', (req, res, next) => {
    //console.log('test',req);
    //const info1 = req.body;
    //console.log(info1);
    //res.status(200).json(info1);
     const product = new product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
    console.log(result);
    res.status(201).json({
    message: 'Handling POST request to /products',
    createdProduct: result
}); 
    })
    .catch(err => { 
        console.log(err);
res.status(500).json({error: err});
});
});
//can be tested on Postman e.g:     {"name": "apple", "price": "125"}



//Read Products
router.get('/:productId', (req, res, next) => {
const id = req.params.productId;
product.findById(id)
.exec()
.then(doc => {
    console.log("From database", doc);
    if (doc) {
        res.status(200).json(doc)
    } else {
    res.status(404).json({message: 'No valid entry found for provided ID'});
}
})
.catch(err => {
    console.log(err);
    res.status(500).json({error:err});
});
 });
 

//Update Product
router.patch('/:productId', (req, res, next) => {
   const id = req.params.productId;
   const updateOps = {};
   console.log(req.body)
    
   product.updateOne({_id: id}, {$set: req.body})
   .exec()
   .then(result => {
       console.log(result);
       res.status(200).json({result});
     })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       })
   })
});
//can be tested on Postman e.g:  [{"propName": "name", "value": "samsung update1"}]     
//e.g ://[{"propName": "name", "value": "samsung update1"}] //[{"propName": "price", "value": "123"}]

//Correct format as follows: 
/* {
"price": 12,
"name": "ABCC"
} */


//Delete Product
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    product.remove({_id:id})
    .exec()
    .then(result => {
res.status(200).json(result);
    })
.catch(err => {
console.log(err);
res.status(500).json({
    error: err
        });
    });
});

module.exports = router;
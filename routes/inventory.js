var express = require('express');
var router = express.Router();

//require the fs and path modules
const fs = require('fs');
const path = require('path');

//require the database connection module 
const db = require('../db/db.js');

const query = fs.readFileSync(path.join(__dirname, "../db/queries/inventory.sql"), "utf-8")

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    let results = await db.queryPromise(query, []);     //make database query, await response
    console.log(results);
    res.render('inventory', { title: 'Inventory', style: 'style.css', items: results });
  }
  catch (err) { // the catch block handles any situation where an error occured, sending an error page instead
    next(err);
  }
});

//create inventory
router.get('/create', function (req, res, next) {
  res.render('inventory_form', { title: 'Create Inventory', style: 'style.css' });
});

const query_insert = fs.readFileSync(path.join(__dirname, "../db/queries/inventory_insert.sql"), "utf-8")

router.post('/create', async function (req, res, next) {
  try {
    let results = await db.queryPromise(query_insert, [req.body.name, req.body.quantity, req.body.size, req.body.location, req.body.expiration_date, req.body.type, req.body.brand]);     //make database query, await response
    console.log(req.body);
    res.render('inventory_form', { title: 'Create Inventory', style: 'style.css' })
  }
  catch (err) { // the catch block handles any situation where an error occured, sending an error page instead
    next(err);
  }
});

//modify inventory
router.get('/modify/:item_id', function (req, res, next) {

  res.render('inventory_modify', { title: 'Modify Inventory', style: 'style.css' });
});

const query_update = fs.readFileSync(path.join(__dirname, "../db/queries/inventory_update.sql"), "utf-8")

router.post('/modify/:item_id', async function (req, res, next) {
  try {
    let results = await db.queryPromise(query_update, [req.body.name, req.body.quantity, req.body.size, req.body.location, req.body.expiration_date, req.body.type, req.body.brand, req.params.item_id]);     //make database query, await response
    res.redirect('/inventory');
  }
  catch (err) { // the catch block handles any situation where an error occured, sending an error page instead
    next(err);
  }
});

module.exports = router;
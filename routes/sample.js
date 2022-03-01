var express = require('express');
var router = express.Router();

//require the fs and path modules
const fs = require('fs');
const path = require('path');

//require the database connection module 
const db = require('../db/db.js');

/* GET sample page route. The page makes a simple database query, and uses the results to render the page */

//Query used in the route, read from an SQL file
const sample_query_sql = fs.readFileSync(path.join(__dirname, "../db/queries/sample_query.sql"), "utf-8")
// Alternatively, just use a string:
// const sample_query_sql = "SELECT "Sample Data" as samplecolumn"


router.get('/', async function(req, res, next) { // Make sure the function is "async" if you use await
  try { // Put all the "it should work like this" code in the try block

    let results = await db.queryPromise(sample_query_sql, []);     //make database query, await response

    //render sample.hbs (in the layout.hbs), passing relevant parts of the results as "db_value"
    res.render('sample', 
      { title: 'Sample Page', 
        styles: ['style.css', 'sample_style.css'], 
        db_value: results[0].samplecolumn 
      }
    );
    
  } catch (err) { // the catch block handles any situation where an error occured, sending an error page instead
    next(err);
  }
});


/* GET sample greeting page route. The page uses the url parameter as part of a simple database query, and uses the results to render the page */


//Query used in the route, read from an SQL file
const sample_query_placeholders = fs.readFileSync(path.join(__dirname, "../db/queries/sample_query_placeholders.sql"), "utf-8")
// Alternatively, just use a string:
// const sample_query_placeholders = "SELECT CONCAT(?, " was what you sent") as whatyousent"

router.get('/parameter/:p', async function(req, res, next) {
  try {
    //Get the URL parameter 'p'
    let parameter = req.params.p;

    // Replace the ? in the SQL with values in the array (in this case, parameter)
    let results = await db.queryPromise(sample_query_placeholders, [parameter]);     //make database query, await response

    //render sample.hbs (in the layout.hbs), passing the parameter, and relevant parts of the results as "db_value"
    res.render('sample_parameter', 
      { title: 'Sample Parameter Page', 
        styles: ['style.css', 'sample_style.css'], 
        parameter: parameter,
        db_value: results[0].whatyousent 
      }
    );
    
  } catch (err) { 
    next(err);
  }
});


router.get('/form', async function(req, res, next) { // Make sure the function is "async" if you use await

    //No query to make here, but sometimes such a query might be appropriate 
    // (e.g. getting data to pre-populate a form, or get select options)

    //render sample.hbs (in the layout.hbs), passing relevant parts of the results as "solution"
    res.render('sample_form', 
      { title: 'Sample Form', 
        styles: ['style.css', 'sample_style.css']
      }
    );
    
});

router.post("/", async function(req, res, next) {
  try {
    let form_values = req.body;

    // Using the form values, you would likely make a database query - likely an INSERT, UPDATE, or DELETE.
    // let results = await db.queryPromise("SAMPLE QUERY", [form_values.input_name]);
    // In lieau of that, we'll just log the form_values
    console.log("Form posted:")
    console.log(form_values);
    // Afterwards, we could render a page; typically we redirect to another page 
    // relevant to the query results. Here, we'll just redirect back to the sample page.
    res.redirect("/sample")
    
  } catch (err) { 
    next(err);
  }
});


module.exports = router;

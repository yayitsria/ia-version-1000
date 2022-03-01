## Using this as a template:
1. Fork this project, giving it a new name. 

2. Then, clone your new project, and open in VSCode.

3. In your Terminal, run this to install all dependencies (which are listed in `package.json`). 
    ```
    > npm install
    ```
    This will create the `node_modules` folder and `package-lock.json`

4. Copy the file `.sample-env` and rename the copy `.env`. 
Add the configuration values for your database into `.env`.


5. You can run the server in one of two ways:
    - Standard server start (essentially runs `node ./bin/www`)
        ```
        > npm start
        ```
        Stop the server with `Ctrl-C`.
        
    - Nodemon server start:
        ```
        > npm run devstart
        ```
        This should automatically restart the server upon changes to your files. Manually restart by typing `rs` in the Terminal; stop with `Ctrl-C`


6. Read ["The sample files" section at the bottom](https://github.com/atcs-wang/ib-webapp-template-express-hbs-mysql-materialize#the-sample-files); these give an idea of how you might add new data-driven routes to the app. You can alter or delete the sample files whenever you want.

## Um, how was this built?

If you're curious how this template was built, read on. Otherwise, just take the template and go!

### Basic configuration
The app's skeleton structure was generated with:
```
> npx express-generator --view=hbs
```
In addition to installing the packages used by the skeleton structure, the `mysql` and `dotenv` packages were installed, and the `nodemon` package was installed as a development dependency:
```
> npm install
> npm install mysql dotenv
> npm install nodemon --save-dev
```

The `package.json` file's `scripts` section was manually updated with the line `"devstart": "nodemon -e js,hbs,css,env,sql ./bin/www"`. 

Now `package.json` looked something like this (version numbers may vary if you reproduce)

```json
{
  "name": "ib-webapp-template-express-hbs-mysql-materialize",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon -e js,hbs,css,env,sql ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "dotenv": "^16.0.0",
    "express": "~4.16.1",
    "hbs": "~4.0.4",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1",
    "mysql": "^2.18.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}

```

A `.env` file (for defining values for environment variables) is added.

The `.env` was given the following content:
```
DB_DATABASE=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_PORT=3306
DB_CONNECT_TIMEOUT=10000
LOG_QUERY=True
LOG_QUERY_ARGS=True
LOG_QUERY_SUMMARY=True
LOG_QUERY_RESULTS=True
```
The values for sensitive database configuration information was also added to the `DB` environment variables.

A copy of `.env` called `.sample-env` was made without any sensitive values included. 

A folder called `db` was created, and the file called `db.js` was added, which is a local module for a MySQL database connection pool. 

To make git not track `node_modules` or `.env`, a `.gitignore` file was added with the following content:
```
node_modules
.env
```

### Template boilerplate configuration (Materialize jumpstart)

To match our class example structure, a few things are changed from the initial configuration:

1. In the `public` folder:

   - the sub-folders `stylesheets` and `javascripts` are renamed `styles` and `js`, respectively.

   - `materialize.min.css` and `main.css` have been added to the folder `/public/styles/`

   - `style.css` is edited lightly (a line is commented out)

   - `materialize.min.js` has been added to the folder `/public/js/`


2. To make getting started very easy, `layout.hbs` has been pre-configured with some standard Materialize boilerplate. 

    Here are the added features: 

    - The `<head>` includes a link to a (*currently nonexistent*) favicon.

    - The `<head>` includes links to the Materialize CSS file and Material icons

    - The `<head>` also includes a link to the `main.css` stylesheet

    - The `<head>` contains Handlebars expressions that allow for express to includes addition stylesheets by name via a `style` or `styles` property in the data object.

    - The `<body>` of the layout now includes a sample `<header>`, which includes a mobile-friendly nav bar, and a `<footer>`.

    - The `<body>` contains an external script link to the Materialize JS, and an in-line script that runs the `M.AutoInit()` function needed to make certain Materialize elements work.

3. `index.js` is updated to specify using the `style.css` file, by passing it as`style` in the data object parameter for the render.

4. `users.js` is deleted

5. `app.js` is edited to remove the `usersRouter` router.

### The sample files

A series of sample files are included to see how new routes, pages (templates), stylesheets, and queries might be incorporated.

1. First, `sample.js` is added to the `routes` folder. Keys parts at the beginning are:
    ```js
    var express = require('express');
    var router = express.Router();

    //require the fs and path modules
    const fs = require('fs');
    const path = require('path');

    //require the database connection module 
    const db = require('../db/db.js');
    ```

    and at the end also:
    ```js
    modules.exports = router
    ```

2. To make the new router used by the server, `app.js` was updated with these lines:

    ```js
    ...

    var sampleRouter = require('./routes/sample');

    ... //app is set up...

    app.use('/sample', sampleRouter);

    ...
    ```

3. As `sample.js`'s routes are written, the following files are referenced and used:
    - SQL queries in `sample_query.sql` and `sample_query_placeholders.sql`, which are in a new subdirectory `db/queries`. These include very silly and pointless queries that any database will respond the same to.  (Using separate SQL files is optional, as the SQL could be written as strings in `sample.js`)
    - Handlebars templates: `sample.hbs`, `sample_parameter.hbs`, and `sample_form.hbs`
    - A new CSS file, `sample_style.css`. To use both this and the `style.css` for the pages, the `res.render` is passed a `styles` property in the data, which has an array of all relevant stylesheets.

You can alter or delete the sample files whenever you want. 
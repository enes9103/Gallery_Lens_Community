

# Project Development Process Notes

## Session 1

### Project and Node.js MongoDB Introduction

## Session 2

### Project Setup and Express Framework

- Initialize the project using `npm init`.
- Install the Express framework: `npm install express`.
- Create the `app.js` file (or specify `index.js` during project setup as the default). Assign the Express app to the variable `app` and specify the port you want to run the application on.
- Use `app.listen()` by passing the port as a parameter and include a callback function inside `listen` to log a message.
- Use `app.get()` to handle incoming requests and responses as callback functions.
- Start the server by running `node app` in the terminal.
- To avoid stopping and restarting the server after each change, use the nodemon package as a dev dependency: `npm install -D nodemon`.
- Update the "scripts" section in the `package.json` file to use nodemon:

  ```json
  "scripts": {
    "start": "nodemon app.js"
  }

  ```

- Now, you can start the application with npm start, and nodemon will run the app.js file.
- Middleware concept in Node.js: Middleware functions are intermediate software that handle incoming requests, provide responses, and perform additional tasks.
- Template engine: To render HTML files under the 'views' directory, use a template engine. The EJS package allows us to manipulate these HTML files using JavaScript. Rename the HTML files to .ejs files (e.g., index.html to index.ejs) and set the view engine to EJS in app.js. Render the index page as follows:

```json
app.get('/', (req, res) => {
  res.render('index');
})
```

- Similarly, update other pages and render them based on their respective URLs.
- To reduce repetition in pages, such as the header, footer, or other common sections, create reusable components using partials. Inside the 'views' folder, create a folder called 'partials' and create files like \_header.ejs, \_menu.ejs, etc., to encapsulate those sections.
- Include these partials in your pages using the following syntax:

```<%- include("partials/_header") %>

```

- Similarly, update other pages and render them based on their respective URLs.
- To reduce repetition in pages, such as the header, footer, or other common sections, create reusable components using partials. Inside the 'views' folder, create a folder called 'partials' and create files like \_header.ejs, \_menu.ejs, etc., to encapsulate those sections. Include these partials in your pages using the following syntax:

```<%- include("partials/_header") %>

```

## Session 3

### MongoDB Atlas Setup

- Log in to your MongoDB account and enter the project. Click on "Build a Database" and continue with the free tier. Choose one of the cloud providers (e.g., AWS) and select a region (e.g., Frankfurt). Click "Create Cluster" to set up your database. Define a username and password for the user who will access the database. Optionally, you can add your local IP address to access the database remotely (e.g., 0.0.0.0/0).

- After setting up the MongoDB cluster, click "Connect" and choose "Connect your application" to get the connection string. Copy the connection string and create a .env file in your project to store sensitive information. Use a key to store the connection string in the .env file, like:

```DB_URI=mongodb+srv://<username>:<password>@cluster0.vvkqftq.mongodb.net/?retryWrites=true&w=majority

```

- Install the dotenv package to access environment variables from the .env file: npm install dotenv.
- Install the mongoose package to interact with MongoDB using models and schemas: npm install mongoose.
- In your app.js file, import and execute dotenv.config() at the beginning to access the variables defined in the .env file.
- Create a db.js file to handle the database connection. Inside this file, define a connection function that takes the connection string and configuration object as parameters. The configuration object should contain the name of your database. Before using this function, go to your MongoDB page, access the "Browse Collections" tab, and create a new database with a collection name of your choice.

```// db.js
const mongoose = require('mongoose');

const conn = (connectionString, config) => {
  mongoose.connect(connectionString, {
    dbName: config.dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection error:', err));
};

module.exports = conn;
```

- Import the connection function in app.js and call it, passing the connection string and configuration object as arguments (update the database name and collection name as needed).

```// app.js
const conn = require('./db');
const connectionString = process.env.DB_URI;

conn(connectionString, { dbName: 'your_database_name_here' });
```

- Now, you can create models and insert documents into your MongoDB database.
- Don't forget to include the application's port information in the .env file as well. For example, add PORT=3000 to the .env file and update app.js as follows:

```// app.js

```

const port = process.env.PORT || 3000;

- Please note that when you make changes to the .env file, you need to stop and restart the server to apply the new environment variables.

## Session 4

```

```

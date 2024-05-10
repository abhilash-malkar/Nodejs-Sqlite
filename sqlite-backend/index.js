const express = require('express');
require("dotenv").config();

const routes = require('./routes');

const app = express();
const port = process.env.PORT;
var cors = require('cors');
app.use(cors());


app.use(routes);



app.listen(port, () => {
    console.log(`Server is running on port ${port} and url: http://localhost:${port}`);
});
  
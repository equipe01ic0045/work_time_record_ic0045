const express = require('express');
const cors = require('cors')

const routes = require('./routes')


const app = express();

app.use(cors())
app.use(express.json());

app.use('/', routes);

app.listen(8800, ()=>{
    console.log("server is running on port 8800")
})

module.exports = app;
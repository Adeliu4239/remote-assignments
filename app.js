const express = require('express')
const app = express()
const port = 3000

const userRoute = require('./api/userRoute');

app.use(express.json()); // for parsing application/json


app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Request-Date");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/healthcheck', (req, res) => {
//     res.send('OK');
//   });
app.use('/healthcheck', require('./api/healthyChecker'));
app.use('/users', userRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const app = express()
const port = 3000

const userRoute = require('./routes/userRoute');

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/healthcheck', (req, res) => {
//     res.send('OK');
//   });
app.use('/healthcheck', require('./routes/healthChecker'));
app.use('/users', userRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
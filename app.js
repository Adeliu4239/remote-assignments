const express = require('express')
const app = express()
const port = 3000

const userRoute = require('./routes/user_route');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/healthcheck', (req, res) => {
//     res.send('OK');
//   });
app.use('/healthcheck', require('./routes/healthchecker'));
app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
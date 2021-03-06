const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const routes = require('./routes/PublicShipmentsRoutes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

routes(app)

app.listen(port, () => {
  console.log(`Server started on port:`);
})


app.get('/', (req, res, next) => {
  res.send("hello from server")
});
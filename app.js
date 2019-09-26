const express = require("express");
const morgan = require("morgan");
const main = require("./views/main")

const  models  = require('./models');

const app = express();
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

app.get('/', (req, res, next) => {
  res.send(main())
})
const initDb = async () =>{
  
  await models.db.sync({force: true});

  
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });

} 
initDb()



const express = require("express");
const morgan = require("morgan");
const main = require("./views/main")
const models  = require('./models');
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')
const { Page } = require("./models");
const wikiPage = require("./views/wikiPage");

const app = express();
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', async (req, res, next) => {
  try {
    const URL = req.params.slug;
    const allPages = await Page.findAll();
    console.log(allPages);
    res.send(wikiPage(URL));
  } catch (error) { next(error) }

  res.send(main())
  // res.redirect('/wiki');
})



const initDb = async () =>{

  await models.db.sync({force: true});
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });

}
initDb()



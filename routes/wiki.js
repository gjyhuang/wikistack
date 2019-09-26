const express = require('express');
const router = express.Router();
const addPages = require('../views/addPage')
// const models = require('../models')
// const Page = models.Page;
const { Page } = require("../models");
const { addPage } = require("../views");
const wikiPage = require("../views/wikiPage");


router.get('/', async (req, res) => {
  res.send('wiki page!');
})

router.get('/add', async (req, res) => {
  res.send(addPages())
})

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}}`)
  } catch (error) { next(error) }
});

router.get('/:slug', async (req, res, next) => {
  // res.send(`hit dynamic route at ${req.params.slug}`);
  try {
    const URL = req.params.slug;
    const foundPage = await Page.findOne({
      where: {slug: URL}
    });
    // res.json(foundPage);
    res.send(wikiPage(URL));
  } catch (error) { next(error) }
});


module.exports = router;

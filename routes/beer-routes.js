const express = require('express')
const router = express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const punkAPI = new PunkAPIWrapper()
const Beer = require('../models/Beer')



router.get('/seeddatabase', async (req,res,next) => {
  let beers = await punkAPI.getBeers()
  Beer.create(beers).then(data => {
    res.json(data)
  }).catch(err => {
    next(err)
  })
})

router.get('/', (req,res,next) => {
  Beer.find().limit(25).then(beers => {
    res.json(beers)
  }).catch(err => next(err))
})


router.get('/random', (req,res,next) => {
  let random = Math.floor(Math.random()*23)
  Beer.findOne({id: random}).then(beer => {
    res.json(beer)
  }).catch(err => next(err))
})


router.get('/:id', (req,res,next) => {
  Beer.find({id: req.params.id}).then(beer => {
    res.json(beer)
  }).catch(err => next(err))
})


router.get('/search', (req,res, next) => {

  Beer.find({name: req.query.q}).then(beers => {
    res.json(beers)
  }).catch(err => next(err))
})


router.post('/new', (req,res, next) => {
  let newBeer = req.body

  if (req.body.image === undefined) {
    newBeer.image = 'https://bonnevillebrewery.com/wp-content/uploads/beer-default-light.png'
  }
  Beer.create(newBeer).then(beer => {
    res.json(beer)
  }).catch(err => next(err))
})



router.get('/dropdatabase', async (req,res,next) => {
  Beer.dropCollection();
})

module.exports = router;

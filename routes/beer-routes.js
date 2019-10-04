const express = require('express')
const router = express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const punkAPI = new PunkAPIWrapper()
const Beer = require('../models/Beer')



router.get('/seeditfam', async (req,res,next) => {
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
  let random = Math.floor(Math.random()*25)
  Beer.findById(random).then(beer => {
    res.json(beer)
  }).catch(err => next(err))
})


router.get('/:id', (req,res,next) => {
  Beer.findById(req.params.id).then(beer => {
    res.json(beer)
  }).catch(err => next(err))
})


router.get('/search', (req,res, next) => {
  Beer.find(req.query).then(beers => {
    res.json(beers)
  }).catch(err => next(err))
})


router.post('/new', (req,res, next) => {
  let newBeer = {
    name: req.params.name,
    tagline: req.params.tagline,
    description: req.params.description,
    first_brewed: req.params.first_brewed,
    brewers_tips: req.params.brewers_tips,
    attenuation_level: req.params.attenuation_level,
    contributed_by: req.params.contributed_by,
    image: 'https://bonnevillebrewery.com/wp-content/uploads/beer-default-light.png'
  }

  Beer.create(newBeer).then(beer => {
    res.json(beer)
  }).catch(err => next(err))
})


module.exports = router;

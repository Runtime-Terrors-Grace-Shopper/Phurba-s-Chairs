const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
    const product = await Product.findById(req.params.id) 
    if (product === null) {
        res.sendStatus(404);
    } else {
        res.json(product)
    }
})

module.exports = router

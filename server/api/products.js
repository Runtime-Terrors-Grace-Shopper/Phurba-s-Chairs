const router = require('express').Router()
const {Product} = require('../db/models')
const {Category} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{model: Category}]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      res.sendStatus(404)
    } else {
      console.log('pro', product)
      res.json(product)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router

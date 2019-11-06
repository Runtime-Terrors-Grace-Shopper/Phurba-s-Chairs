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

router.post('/', async (req, res, next) => {
  try {
    if (!req.body) {
      return res.sendStatus(400) // niceeeeeee
    }
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      res.sendStatus(404)
    } else {
      res.json(product)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    // same w/ 404 missing params.id
    // should be some type of isAdmin we check for
    const targetProduct = await Product.findByPk(req.params.id)
    const updatedProduct = await targetProduct.update(req.body)
    res.status(202).json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    // same w/ isAdmin
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
module.exports = router

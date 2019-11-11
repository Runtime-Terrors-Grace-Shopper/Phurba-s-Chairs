const router = require('express').Router()
const {Product, OrderProduct} = require('../db/models')

const isAdmin = () => {
  return (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.status(403).send('Permission Denied')
    }
  }
}

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin(), async (req, res, next) => {
  try {
    if (!req.body) {
      return res.sendStatus(400)
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

router.put('/:id', isAdmin(), async (req, res, next) => {
  try {
    const targetProduct = await Product.findByPk(req.params.id)
    if (targetProduct) {
      const updatedProduct = await targetProduct.update(req.body)
      res.status(202).json(updatedProduct)
    } else {
      res.status(404).send('Page Not Found')
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAdmin(), async (req, res, next) => {
  try {
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

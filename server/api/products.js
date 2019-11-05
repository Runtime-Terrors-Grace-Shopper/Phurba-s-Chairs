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

router.post('/', async (req, res, next) => {
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
    const product = await Product.findByPk(req.params.id) 
    if (product === null) {
        res.sendStatus(404);
    } else {
        res.json(product)
    }
})


router.put(':id', async (req, res, next) => {
  try {
    const targetProduct = await Product.findByPk(req.params.id)
    const updatedProduct = await targetProduct.update(req.body)
    res.status(202).json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
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


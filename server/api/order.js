const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderProduct,
          include: [{model: Product, as: 'product'}]
        }
      ]
    })
    if (!order) res.sendStatus(404)
    else res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router

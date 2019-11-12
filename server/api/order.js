const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user) {
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
    } else {
      req.session.orderProducts = req.session.cart.map(item => {
        return {
          product: {name: item.product.name},
          purchasingPrice: item.purchasingPrice,
          quantity: item.quantity
        }
      })
      req.session.cart = []
      res.json(req.session)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        status: 'Completed',
        userId: req.user.id
      },
      include: [
        {
          model: OrderProduct,
          include: [{model: Product, as: 'product'}]
        }
      ]
    })
    if (!orders) res.sendStatus(404)
    else res.json(orders)
  } catch (error) {
    next(error)
  }
})

module.exports = router

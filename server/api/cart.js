const router = require('express').Router()
const {User, Order, Product, OrderProduct} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.getActiveOrder(req.user)
      if (req.session.cart) {
        order.orderProducts = await order.addProducts(req.session.cart)
      }
      req.session.cart = []
      res.json(order.orderProducts)
    } else {
      if (!req.session.cart) {
        req.session.cart = []
      }
      res.json(req.session.cart)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const cartItem = await OrderProduct.findByPk(req.params.id)
    if (!cartItem) res.sendStatus(404)
    else res.json(cartItem)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {id, price} = req.body
    const quantity = +req.body.quantity
    let newItem
    if (req.user) {
      let order = await Order.getActiveOrder(req.user)
      let item = {
        orderId: order.id,
        productId: id,
        quantity,
        purchasingPrice: price
      }
      newItem = await OrderProduct.create(item)
      await newItem.save()
    } else {
      newItem = {
        productId: id,
        quantity,
        purchasingPrice: price
      }
      req.session.cart.push(newItem)
    }

    if (newItem) res.status(201).send(newItem)
  } catch (error) {
    next(error)
  }
})

router.post('/checkout', async (req, res, next) => {
  try {
    const data = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'Active'
      }
    })
    await data.update({status: 'Completed'})
    const newOrder = await Order.create({
      shippingAddress: data.shippingAddress,
      creditCard: data.creditCard,
      userId: data.userId
    })
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const targetItem = await OrderProduct.findByPk(req.params.id)
    if (targetItem.quantity <= 1) {
      await targetItem.destroy()
      res.sendStatus(204)
    } else {
      targetItem.quantity--
      await targetItem.save()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const itemToEdit = await OrderProduct.findByPk(req.params.id)
    const updatedItem = await itemToEdit.update(req.body)
    res.status(200).send(updatedItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router

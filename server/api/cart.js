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
    const {id, price, quantity} = req.body
    let newItem = {
      productId: id,
      quantity,
      purchasingPrice: price
    }
    let newCart
    if (req.user) {
      let order = await Order.getActiveOrder(req.user)
      if (order.inCart(id)) {
        order.addProducts([newItem])
        newItem = await OrderProduct.findOne({where: {productId: id}})
      } else {
        newItem = await OrderProduct.create(newItem)
      }
      newCart = await Order.getActiveOrder(req.user)
    } else {
      if (req.session.cart) {
        req.session.cart.push(newItem)
      } else req.session.cart = [newItem]
      newCart = req.session
    }

    if (newCart) res.status(201).send(newCart)
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
    let itemId = req.params.id
    if (req.user) {
      const toBeDestroyed = await OrderProduct.findByPk(itemId)
      await toBeDestroyed.destroy()
    } else {
      // let order = req.session.cart
      // order.map((item, index) => {
      //   if (productId === item.productId) {
      //     order.splice(index, 1)
      //   }
      // })
    }
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
router.put('/increase/:id', async (req, res, next) => {
  try {
    const item = await OrderProduct.findOne({
      where: {id: req.params.id},
      include: [{model: Product, as: 'product'}]
    })
    if (req.user) {
      item.quantity++
      await item.save()
    }
    res.status(200).send(item)
  } catch (error) {
    next(error)
  }
})
router.put('/decrease/:id', async (req, res, next) => {
  try {
    const item = await OrderProduct.findOne({
      where: {id: req.params.id},
      include: [{model: Product, as: 'product'}]
    })
    if (req.user) {
      item.quantity--
      await item.save()
      res.status(200).send(item)
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

const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.getActiveOrder(req.user)
      if (req.session.cart) {
        console.log('session', req.session.cart)
        order.orderProducts = await order.addProducts(req.session.cart)
        console.log('inside route', order.orderProducts)
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

// router.get('/:id', async (req, res, next) => {
//   try {
//     const cartItem = await OrderProduct.findByPk(req.params.id)
//     if (!cartItem) res.sendStatus(404)
//     else res.json(cartItem)
//   } catch (error) {
//     next(error)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    const {id, price, quantity} = req.body
    let newItem = {
      productId: id,
      quantity: +quantity,
      purchasingPrice: price
    }
    let newCart
    if (req.user) {
      let order = await Order.getActiveOrder(req.user)
      newItem.orderId = order.id
      if (order.inCart(id)) {
        order.addProducts([newItem])
      } else {
        newItem = await OrderProduct.create(newItem)
      }
      newCart = await Order.getActiveOrder(req.user)
    } else {
      let product = await Product.findByPk(newItem.productId)
      newItem.product = product.dataValues
      if (req.session.cart) {
        let updated = false
        for (let i = 0; i < req.session.cart.length; i++) {
          let item = req.session.cart[i]
          if (item.productId === newItem.productId) {
            item.quantity += newItem.quantity
            updated = true
            break
          }
        }
        if (!updated) {
          req.session.cart.push(newItem)
        }
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
    let newOrder
    if (req.user) {
      const data = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'Active'
        },
        include: [
          {
            model: OrderProduct,
            include: [{model: Product, as: 'product'}]
          }
        ]
      })
      //quantity update logic
      data.orderProducts.forEach(async product => {
        const targetProduct = await Product.findOne({
          where: {
            id: product.id
          }
        })
        await targetProduct.update({
          stock: (product.product.stock -= product.quantity)
        })
      })

      await data.update({status: 'Completed'})
      newOrder = await Order.create({
        userId: data.userId
      })
      res.json(newOrder)
    } else {
      //quantity update logic
      req.session.cart.forEach(async product => {
        const targetProduct = await Product.findOne({
          where: {
            id: product.productId
          }
        })
        console.log(targetProduct)
        await targetProduct.update({
          stock: (targetProduct.stock -= product.quantity)
        })
      })
      req.session.cart = []
      res.sendStatus(201)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let productId = +req.params.id
    if (req.user) {
      const order = await Order.getActiveOrder(req.user)
      let toBeDestroyed = await OrderProduct.findOne({
        where: {orderId: order.id, productId}
      })
      await toBeDestroyed.destroy()
    } else {
      let order = req.session.cart
      order.map((item, index) => {
        if (productId === item.productId) {
          order.splice(index, 1)
        }
      })
    }
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
router.put('/increase/:id', async (req, res, next) => {
  try {
    let item
    let productId = +req.params.id
    if (req.user) {
      const order = await Order.getActiveOrder(req.user)
      item = await OrderProduct.findOne({
        where: {orderId: order.id, productId},
        include: [{model: Product, as: 'product'}]
      })
      item.quantity++
      await item.save()
    } else {
      for (let i = 0; i < req.session.cart.length; i++) {
        itemInCart = req.session.cart[i]
        if (+itemInCart.productId === productId) {
          console.log('dewdew', itemInCart)
          itemInCart.quantity++
          item = itemInCart
        }
      }
    }
    if (item) res.status(200).send(item)
    else res.sendStatus(400)
  } catch (error) {
    next(error)
  }
})
router.put('/decrease/:id', async (req, res, next) => {
  try {
    let item
    if (req.user) {
      const order = await Order.getActiveOrder(req.user)
      item = await OrderProduct.findOne({
        where: {orderId: order.id, productId: req.params.id},
        include: [{model: Product, as: 'product'}]
      })
      item.quantity--
      await item.save()
    } else {
      let productId = +req.params.id
      for (let i = 0; i < req.session.cart.length; i++) {
        itemInCart = req.session.cart[i]
        if (itemInCart.productId === productId) {
          console.log('dewdew', itemInCart)
          itemInCart.quantity--
          item = itemInCart
        }
      }
    }
    res.status(200).send(item)
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

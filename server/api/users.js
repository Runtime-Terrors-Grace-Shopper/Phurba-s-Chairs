const router = require('express').Router()
const {User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  // const user = await User.findById(req.params.id) 
  const user = await User.findAll({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'email']
  })
  if (user === null) {
      res.sendStatus(404);
  } else {
      res.json(user)
  }
})

module.exports = router

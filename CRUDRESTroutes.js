const router = module.exports = require('express').Router();
const myData = //to be set


router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

function getAll(req, res, next) {
  res.json({ data: myData })
}

function getOne(req, res, next) {
  const { id } = req.params
  const myItem = _.find(myData, { id })

  if (!myItem) return next({ status: 404, message: 'Not found.' })

  res.status(200).json({ data: myItem })
}
function create(req, res, next) {
  const { brand, name } = req.body
  const myItem = { brand, name }

  if (!brand || !name) return next({ status: 400, message: 'Could not create.' })

  myItem.id = uuid()
  myData.push(myItem)
  res.status(201).json({ data: myItem })
}
function update(req, res, next) {
  const { id } = req.params
  const previous = _.findIndex(myData, { id })

  if (previous === -1) return next({ status: 404, message: 'Not found.' })

  const { brand, name } = req.body
  if (!brand || !name) return next({ status: 400, message: 'Could not update.' })

  myData[previous] = { id: myData[previous].id, brand, name }
  res.status(200).json({ data: myData[previous] })
}

function remove(req, res, next) {
  const { id } = req.params
  const previous = _.findIndex(myData, { id })

  if (previous === -1) return next({ status: 404, message: 'Not found.' })

  myData.splice(previous, 1)
  res.status(204).json()
}
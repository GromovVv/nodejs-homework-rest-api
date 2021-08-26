/* eslint-disable indent */
const express = require('express')
const router = express.Router()
const { addContactVaildate, updateContactVaildate } = require('../../utils/validate')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model')

router.get('/', async (_, res, __) => {
  const contacts = await listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: { contacts },
  })
})

router.get('/:contactId', async (req, res, __) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId)
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  } else {
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result: contact },
    })
  }
})

router.post('/', async (req, res, __) => {
  const newContact = req.body
  const { error } = addContactVaildate.validate(newContact)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    })
    return
  }
  const response = await addContact(newContact)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result: response },
  })
})

router.delete('/:contactId', async (req, res, __) => {
  const { contactId } = req.params
  const response = await removeContact(contactId)
  response
    ? res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Contact deleted',
      })
    : res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      })
})

router.patch('/:contactId', async (req, res, __) => {
  const { contactId } = req.params
  const body = req.body
  const { error } = updateContactVaildate.validate(body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    })
  }
  const response = await updateContact(contactId, body)
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result: response },
  })
})

module.exports = router

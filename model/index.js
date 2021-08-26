const fs = require('fs/promises')
const path = require('path')

const { v4: generateId } = require('uuid')
require('colors')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath)
    return JSON.parse(contacts)
  } catch (error) {
    error.message = 'Error: cannot read contacts file'
  }
}

const getContactById = async contactId => {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex(
      contact => contact.id.toString() === contactId.toString(),
    )

    if (idx === -1) {
      throw new Error('Error: ID is incorrect')
    }
    return contacts[idx]
  } catch (error) {
    console.log(error.message.red)
  }
}

const removeContact = async contactId => {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex(contact => contact.id.toString() === contactId.toString())
    if (idx === -1) {
      throw new Error('Error: ID is incorrect')
    }

    const newContacts = contacts.filter(contact => contact.id.toString() !== contactId.toString())
    const str = JSON.stringify(newContacts)
    await fs.writeFile(contactsPath, str)
    return true
  } catch (error) {
    console.log(error.message.red)
  }
}

const addContact = async body => {
  try {
    const { name, email, phone } = body
    const newContact = {
      id: generateId(),
      name,
      email,
      phone,
    }
    const contacts = await listContacts()
    const newContacts = [...contacts, newContact]
    const str = JSON.stringify(newContacts)
    await fs.writeFile(contactsPath, str)

    return newContact
  } catch (error) {
    console.log(error.message.red)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex(contact => contact.id.toString() === contactId.toString())
    if (idx === -1) {
      throw new Error('Error: ID is incorrect')
    }

    for (const key in body) {
      contacts[idx][key] = body[key]
    }

    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts[idx]
  } catch (error) {
    console.log(error.message.red)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));//fs.writeFile перезаписывает весь файл//null не обязателн свойств 2 что бы json не сплющил в строку 
    
};
// TODO: задокументировать каждую функцию
async function listContacts() {
   const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

async function getContactById(contactId) {
 const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null; // если ни чего не найдена(id) тогда возврашает null
};

async function removeContact(contactId) {
 const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
};

async function addContact({name, email, phone}) {
  const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        // id: "11",
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};






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







// // const { readFile } = require('fs');
// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require('nanoid');
// // const { writeFile } = require('fs');

// // const contactsPath = path.join(__dirname, "./db/contacts.json");

// // const updateContacts = async (contacts) => {
// //     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));//fs.writeFile перезаписывает весь файл//null не обязателн свойств 2 что бы json не сплющил в строку 
    
// // };

// const getAll = async () => {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
// };

// const getById = async (id) => {
//     const contacts = await getAll();
//     const result = contacts.find(item => item.id === id);
//     return result || null; // если ни чего не найдена(id) тогда возврашает null
// };

// const add = async ({ name, email, phone }) => {
//     const contacts = await getAll();
//     const newContact = {
//         id: nanoid(),
//         // id: "11",
//         name,
//         email,
//         phone, 
//     };
//     contacts.push(newContact);
//     await updateContacts(contacts);
//     return newContact;
// };

// const updateById = async (id, { name, email, phone }) => {
//     const contacts = await getAll();
//     const index = contacts.findIndex(item => item.id === id);
//     if (index === -1) {
//         return null;
//     }
//     contacts[index] = { id, name, email, phone };
//     await updateContacts(contacts);
//     return contacts[index];
// };


// const removeById = async (id) => {
//     const contacts = await getAll();
//     const index = contacts.findIndex(item => item.id === id);
//     if (index === -1) {
//         return null;
//     }
//     const [result] = contacts.splice(index, 1);
//     await updateContacts(contacts);
//     return result;
// };

// module.exports = {
//     getAll,
//     getById, 
//     add,
//     updateById,
//     removeById,
// };

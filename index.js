const { Command } = require("commander");
const program = new Command();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// const invokeAction= async({ action, id, name, email, phone })=> {
async function invokeAction({ action, id, name, email, phone }){
  switch (action) {
    case "list":
       const allContacts = await listContacts();
            console.log(allContacts);
      break;

    case "get":
      const oneContact = await getContactById(id);
            console.log(oneContact);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
            console.log(newContact); 
            break;

    case "remove":
       const removeById = await removeContact(id); 
            console.log(removeById); 
            break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};



invokeAction(argv);





// const contacts = require("./db");
// // const argv = require("yargs").argv;
// // const yargs = require("yargs")
// // const { hideBin } = require("yargs/helpers");

// const { program } = require('commander');

// const {
//   getAll,
//   getById,
//   add,
//     updateById,
//   removeById,
// } = require("./contacts");

// const invokeAction = async ({ action, id, name, email, phone }) => {
//     switch (action) {
//         case "getAll":
//             const allContacts = await contacts.getAll();
//             console.log(allContacts);
//             break;
//         case "getById":
//             const oneContact = await contacts.getById(id);
//             console.log(oneContact);
//             break;
//         case "add":
//             const newContact = await contacts.add({ name, email, phone });
//             console.log(newContact); 
//             break;
//          case "updateById":
//             const updateContact = await contacts.updateById(id,{ name, email, phone });
//             console.log(updateContact); 
//             break;
//         case "removeById":
//             const removeContact = await contacts.removeById(id); 
//             console.log(removeContact); 
//             break;
//         default:
//             console.warn("\x1B[31m Unknown action type!");
//     } 
// };


// program
//     .option('-a,--action <type>')
//     .option('-i,--id <type>')
//     .option('-n,--name <type>')
//     .option('-e,--email <type>')
//     .option('-ph--phone <type>');
// //   .option('-s, --separator <char>');

// program.parse(process.argv);

// const options = program.opts();



// // const limit = options.first ? 1 : undefined;
// // console.log(program.args[0].split(options.separator, limit));

// // const arr = hideBin(process.argv);
// // const { argv } = yargs(arr);

// // invokeAction(argv);

// // invokeAction({ action: 'getAll' });
// // invokeAction({ action: 'getById', id:'1' });
// // invokeAction({ action: "add", name:"John Dou", email:"john@mail.com", phone:"(294) 840-0049"});
// // invokeAction({ action: "updateById",id:"yDQEIjJpzZVrOhNRIoV_1", name:"Ivan", email:"ivan@mail.com", phone:"(294) 840-0079"});
// // invokeAction({ action: "removeById",id:"yDQEIjJpzZVrOhNRIoV_1"});

// // const action = process.argv.indexOf("--action");

// // if (actionIndex !== -1) {
// //     const action = process.argv[actionIndex + 1];
// //     invokeAction({ action });
// // }
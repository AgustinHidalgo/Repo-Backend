import FileSystem from '../FS/FileSystem.js';
import mongoDB, { initMongoDb } from './mongo/mongo.js';
import Memory from './memory/memory.js';
import {productsSchema} from './mongo/model/products.model.js'
import {Command} from 'commander'

const program = new Command();
program.option('-p', 'persistance', 'memory');
program.parse();

let persistence;

//sin commander const argv =  process.argv[2]
const argv = program.args[0]

switch(argv){
    case 'fs': 
        new FileSystem('./src/persistence/filesystem/db.json')
        console.log(argv)
        break;
    case 'mongo':
        initMongoDb()
        new mongoDB('productsCollectionClass26', productsSchema)
        console.log(argv)
        break;
    default:
        new Memory()
        break;
}


export  async function save(obj){
    return await persistence.save(obj)
}

export  async function getAll(){
    return await persistence.getAll()
}
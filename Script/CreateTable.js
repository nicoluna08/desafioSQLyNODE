const {options } = require('./ConfigDB/ConfigDB.js');

const knex  =require('knex') ;

const database = knex(options);


database.schema = database.schema.createTable("Productos",table=>{
    table.increments("id");
    table.string("title",30);
    table.integer("price");
    table.text("thumbnail");
}).then(() => console.log("la tabla fue creada"))
.catch((error) => console.log(error));



const fs = require('fs');

const moment = require('moment');
 
const {options} = require('./ConfigDB/ConfigDB');

const knex = require('knex');



class Productos{

  constructor(nombre,options){
this.NombreTabla = nombre;
this.databaseMariaDB = knex(options);
}

 async save(producto){
    try {
      console.log(producto);
      await   this.databaseMariaDB(this.NombreTabla).insert(producto);
 
    } catch (error) {
        return "el producto no se puede grabar"
    }
 }

  async getAll(){
  try {

 const resultado = await this.databaseMariaDB.from(this.NombreTabla).select("*");

  if (resultado.length > 0){

return resultado;
  
  
  } else{
    console.log("no hay productos");
    return "NO HAY PRODUCTOS"
  }   
   
  } catch (error) {
  console.log(error);
 
  return ""
  }

    }

    async getById(unID){
      try {
        const resultado = await this.databaseMariaDB.from(this.NombreTabla).select("*").where('id', '=', 1);
   if (resultado){
    return resultado;
    
   }else{
return "NO SE ENCUENTRA PRODUCTO"
   }
      } catch (error) {
        console.log("no se encuentra el producto");
      }
    }


    async deleteById(unID){
      try {
 
        const resultado = await this.databaseMariaDB.from(this.NombreTabla).where('id', '=', unID).del();
 
    
        return `Producto ID: ${unID}  fue eliminado con exito`
      } catch (error) {
        console.log("no se encuentra el producto para eliminar");
      }
    }


    async deleteAll(){
      try {
        const resultado = await this.databaseMariaDB.from(this.NombreTabla).del();
 
        
        return `Se Eliminaron Todos Los Productos`
      } catch (error) {
        console.log("no se puede eliminar los productos");
      }
    }

}


class Mensajes{
  constructor(nombre,options_SQL3){
this.NombreTabla = nombre;
this.DatabaseSQL3 = options_SQL3;
  }

async crearTabla(){
let chatTable = await this.DatabaseSQL3.schema.hasTable("chat");
if (chatTable) {
  await this.DatabaseSQL3.schema.dropTable("chat");
}
await this.DatabaseSQL3.schema.createTable("chat", table=>{
  table.increment("id");
  table.string("user",30);
  table.string("timestamp",20);
  table.string("message",200);
});
console.log("Tabla Creada de chat");
}


async save(mensaje){
  try {
   
      const fechaActual = moment().format('DD/MM/YYYY HH:mm:ss');
      mensaje.fecha = fechaActual;
      await   this.databaseMariaDB(this.NombreTabla).insert(mensaje);
 
     

  } catch (error) {
      return "el mensaje no se puede grabar"
  }
}


async getAll(){
try {
  const resultado = await fs.promises.readFile(this.NombreArchivo,"utf-8");
if (resultado.length > 0){
  const mensaJson = JSON.parse(resultado);
  return mensaJson;    

} else{
  console.log("no hay mensajes");
  return "EL ARCHIVO ESTA VACIO"
}   
 
} catch (error) {
  const archivoNuevo=  await fs.promises.writeFile(this.NombreArchivo,"");  
  return ""
}

  }

}



const producto = new Productos("productos",options.mariaDB);

//const listaMensajes = new Mensajes("Mensajes.txt");
const listaMensajes = new Mensajes("chat",options.sqlite3);

listaMensajes.crearTabla();

const database = knex(options);




const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const puerto = 8080;

const path = require ('path');
const dirViews = path.join(__dirname, "views");

const {Server} =require("socket.io");



app.use(express.json());
app.use(express.urlencoded({extended: true}));

 const servidor= app.listen(puerto, () => {  console.log(`EL Servidor esta escuchando en el puerto ${puerto}`)});

 app.use(express.static(__dirname+"/public"));

 const io = new Server(servidor);

io.on('connection', async(socket)=> {
  console.log('Un cliente se ha conectado');
 
  const productosTotal = await producto.getAll();
  socket.emit('productosAll', productosTotal);

  const mensajesTotales = await listaMensajes.getAll(); 
  socket.emit('mensajesChat', mensajesTotales);

  socket.on("productoNuevo",async(data) => {
    console.log("intentaAgregar");
  await producto.save(data);

  const productosTotal = await producto.getAll();

  socket.emit('productosAll', productosTotal);
  })

  socket.on("MensajeNuevo",async(data) => {
    
    await listaMensajes.save(data);
  
    const mensajesTotales = await listaMensajes.getAll();
    socket.emit('mensajesChat', mensajesTotales);

    })
  

}) 


app.engine("handlebars",handlebars.engine());

app.set("views",dirViews);
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
	res.render("productos");
});
app.get('/productos', async(req, res) => {
   
    const productosTotal = await producto.getAll();
 
    if ( productosTotal.length > 0) {
 
    res.render("listado",{
   product:  productosTotal     
    });
}else {
    res.render("listadoVacio");
}
});

/*
app.post("/productos", async(req,res)=> {
 await producto.save(req.body);
 console.log(await producto.getAll());
res.redirect("/");
})
*/
;



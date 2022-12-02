
     
class Productos{
    constructor(nombre){
this.NombreArchivo = nombre;
    }

 async save(producto){
    try {
    //id, timestamp, nombre, descripcion, código, foto (url), precio, stock
    if (producto.nombre == null || producto.descripcion == null || producto.codigo == null || producto.foto == null || producto.precio == null || producto. stock == null) {
           return "no se puede grabar , faltan datos"   
        } 
        const productosTotal = await this.getAll();
        
       if (productosTotal != "EL ARCHIVO ESTA VACIO" && productosTotal !== [] ){
        const ultimoID = productosTotal[productosTotal.length-1].id+1;
        producto.id = ultimoID;
        producto.timestamp = Date.now();
        productosTotal.push(producto);
     await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(productosTotal,null,2));
     return producto.id;

    }else {
        producto.id = 1;
        producto.timestamp = Date.now();
        await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify([producto],null,2));
     return producto.id;
    }
       

    } catch (error) {
        return "el producto no se puede grabar"
    }
 }

  async getAll(){
  try {
   
    const resultado = await fs.promises.readFile(this.NombreArchivo,"utf-8");

      if (resultado.length > 0){
    const prodJson = JSON.parse(resultado);
    return prodJson;    
  
  } else{
    console.log("no hay productos");
    return "EL ARCHIVO ESTA VACIO"
  }   
   
  } catch (error) {
    const archivoNuevo=  await fs.promises.writeFile(this.NombreArchivo,"");  
    return ""
  }

    }

    async getById(unID){
      try {
        const productosTotal = await this.getAll();
        const unProducto = productosTotal.find(elemnto=>elemnto.id == unID)
   if (unProducto){
    return unProducto;
    
   }else{
return "NO SE ENCUENTRA PRODUCTO"
   }
      } catch (error) {
        console.log("no se encuentra el producto");
      }
    }

    async deleteById(unID){
      try {
        const productosTotal = await this.getAll();

        const unProducto = productosTotal.find(elemnto=>elemnto.id == unID)
         if (unProducto){
            const Productos = productosTotal.filter(elemnto=>elemnto.id != unID)
            await fs.promises.writeFile(this.NombreArchivo,JSON.stringify(Productos,null,2));
       
            return `Producto ID: ${unID}  fue eliminado con exito`
            
          }else{
                   return "NO SE ENCUENTRA PRODUCTO"
           }

      } catch (error) {
        console.log("no se puede eliminar el producto");
        return ("no se puede eliminar el producto");
      }
    }

    async deleteAll(){
      try {
        const productosTotal = await this.getAll();
        
        await fs.promises.writeFile(this.NombreArchivo,"");
    
        return `Se Eliminaron Todos Los Productos`
      } catch (error) {
        console.log("no se puede eliminar los productos");
      }
    }

  async updateProduct(product){

    //id, timestamp, nombre, descripcion, código, foto (url), precio, stock
    const productosTotal = await this.getAll();
    const unProducto = productosTotal.find(elemnto=>elemnto.id == product.id)
    const indice = productosTotal.findIndex(elemnto=>elemnto.id == product.id);

    if (unProducto){
            const prodTemp = await this.getById(product.id);

            if (product.nombre != null) {productosTotal[indice].nombre = product.nombre}
            if (product.descripcion != null) {productosTotal[indice].descripcion = product.descripcion}
            if (product.codigo != null) {productosTotal[indice].codigo = product.codigo}
            if (product.foto != null) {productosTotal[indice].foto = product.foto}
            if (product.precio != null) {productosTotal[indice].precio = product.precio}
            if (product.stock != null) {productosTotal[indice].stock = product.stock}
  
            await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(productosTotal,null,2));
  
            return `El producto ${product.id}  fue actualizado con exito`
            
          }else{
                   return "NO SE ENCUENTRA PRODUCTO para actualizar"
           }
    }

}


// CARRITOS

class Carritos{
    constructor(nombre){
this.NombreArchivo = nombre;
    }

 async nuevo(carrito){
    try {
 //id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código,foto (url), precio, stock }
        const carritosTotal = await this.getAll();
        
       if (carritosTotal != "EL ARCHIVO ESTA VACIO" && carritosTotal !== [] ){
        const ultimoID = carritosTotal[carritosTotal.length-1].id+1;
        carrito.id = ultimoID;
        carrito.timestamp = Date.now();
        carrito.productos = [];
        carritosTotal.push(carrito);
     await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(carritosTotal,null,2));
     return carrito.id;

    }else {
        carrito.id = 1;
        carrito.timestamp = Date.now();
        carrito.productos = [];
        await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify([carrito],null,2));
     return carrito.id;
    }
       

    } catch (error) {
        return "el carrito no se puede grabar"
    }
 }

 
 async agregarProd(unID,carrito){
    try {
        const carritosTotal = await this.getAll();
        const indice = carritosTotal.findIndex(elemnto=>elemnto.id == unID);

    if (indice >=0){

        carritosTotal[indice].productos.push(carrito.producto);
        await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(carritosTotal,null,2));
return "Producto agregado con exito"  
        }else{

        return "NO existe el carrito"
    }
         
       

    } catch (error) {
        console.log("llegue aca");

        return "el  producto no se puede agregar al carrito"
    }
 }




  async getAll(){
  try {
   
    const resultado = await fs.promises.readFile(this.NombreArchivo,"utf-8");

      if (resultado.length > 0){
    const prodJson = JSON.parse(resultado);
    return prodJson;    
  
  } else{
    console.log("no hay carritos");
    return "EL ARCHIVO ESTA VACIO"
  }   
   
  } catch (error) {
    const archivoNuevo=  await fs.promises.writeFile(this.NombreArchivo,"");  
    return ""
  }

    }

    async getById(unID){
      try {
        const carritosTotal = await this.getAll();

        const unCarrito = carritosTotal.find(elemnto=>elemnto.id == unID)
   if (unCarrito){
    return unCarrito;
    
   }else{
return "NO SE ENCUENTRA EL CARRITO"
   }
      } catch (error) {
        console.log("no se encuentra el carrito");
      }
    }

    async deleteById(unID){
      try {
        const carritosTotal = await this.getAll();

        const unCarrito = carritosTotal.find(elemnto=>elemnto.id == unID)
         if (unCarrito){
            const Carritos = carritosTotal.filter(elemnto=>elemnto.id != unID)
            await fs.promises.writeFile(this.NombreArchivo,JSON.stringify(Carritos,null,2));
       
            return `carrito ID: ${unID}  fue eliminado con exito`
            
          }else{
                   return "NO SE ENCUENTRA el carrito"
           }

      } catch (error) {
        console.log("no se puede eliminar el carrito");
        return ("no se puede eliminar el carrito");
      }
    }


    async deleteAll(){
      try {
        const carritosTotal = await this.getAll();
        
        await fs.promises.writeFile(this.NombreArchivo,"");
    
        return `Se Eliminaron Todos Los Carritos`
      } catch (error) {
        console.log("no se puede eliminar los Carritos");
      }
    }

  async del_Prod_Carrito(id_Carrito,id_prod){

    const carritosTotal = await this.getAll();
    const indiceCarr = carritosTotal.findIndex(elemnto=>elemnto.id == id_Carrito);

    if (indiceCarr >=0){
        const indiceProd = carritosTotal[indiceCarr].productos.findIndex(elemnto =>elemnto== id_prod);

        if (indiceProd >= 0){
            carritosTotal[indiceCarr].productos.splice(indiceProd,1);
            await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(carritosTotal,null,2));
        return `Producto nro: ${id_prod} eliminado del carrito nro: ${id_Carrito}`  
        }else{
           return `Producto nro: ${id_prod} no existe}` 
        }            
        
    }else{

    return "NO existe el carrito"
    }
  

    }

}




// Constantes
const fs = require('fs');

const express = require("express");
const { Router } = express;
const app = express();
//const Puerto = 8080;
 const Puerto =process.env.PORT;
const productos = new Productos("ListadoProductos.txt");

const carritos = new Carritos("ListadoCarritos.txt");

//Routers
const routerProductos = Router();
const routerCarritos = Router();
app.use("/api/productos/",routerProductos);
app.use("/api/carrito/",routerCarritos);


routerProductos.use(express.urlencoded({extended: true}));
routerProductos.use(express.json());

routerCarritos.use(express.urlencoded({extended: true}));
routerCarritos.use(express.json());


// Configuraciones
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.listen(Puerto,()=>{
    console.log(`Server escuchando en puerto numero: ${Puerto}`);
});
// DEFINO PRIVILEGIO ADMINISTRADOR
const isAdmin = true;

// Petciones

routerProductos.get("/:id",async (req,res,err)=>{

    res.json(await productos.getById(req.params.id));
});
routerProductos.get("/",async (req,res)=>{

    res.json(await productos.getAll());
});


routerProductos.post("/",async(req,res)=>{
    if (isAdmin){
    const result = await productos.save(req.body);
    res.json(result);
    }else{
        const msjPrivilegio = {
            mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
            metodo: "POST" 
        }
        res.json(msjPrivilegio);

    }
});
routerProductos.put("/",async(req,res)=>{
    if (isAdmin){
        const result = await productos.updateProduct(req.body);
    
    res.json(result);
}else{
    const msjPrivilegio = {
        mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
        metodo: "PUT" 
    }
    res.json(msjPrivilegio);

}
});
routerProductos.delete("/:id",async(req,res)=>{
    if (isAdmin){
        const result = await productos.deleteById(req.params.id);
    res.json(result);
}else{
    const msjPrivilegio = {
        mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
        metodo: "DELETE" 
    }
    res.json(msjPrivilegio);

}

});

// Peticiones Carritos



routerCarritos.post("/",async(req,res)=>{
    if (isAdmin){
    const result = await carritos.nuevo(req.body);
    res.json(result);
    }else{
        const msjPrivilegio = {
            mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
            metodo: "POST" 
        }
        res.json(msjPrivilegio);

    }
});

routerCarritos.post("/:id/productos",async(req,res)=>{
// formato del producto   {"producto":3}


    if (isAdmin){
    const result = await carritos.agregarProd(req.params.id,req.body);
console.log(result);   
    res.json(result);
    }else{
        const msjPrivilegio = {
            mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
            metodo: "POST" 
        }
        res.json(msjPrivilegio);

    }
});



routerCarritos.delete("/:id",async(req,res)=>{
    if (isAdmin){
        const result = await carritos.deleteById(req.params.id);
    res.json(result);
}else{
    const msjPrivilegio = {
        mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
        metodo: "DELETE" 
    }
    res.json(msjPrivilegio);

}

});



routerCarritos.delete("/:id/productos/:id_prod",async(req,res)=>{
    if (isAdmin){
        const result = await carritos.del_Prod_Carrito(req.params.id,req.params.id_prod);
    res.json(result);
}else{
    const msjPrivilegio = {
        mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
        metodo: "DELETE" 
    }
    res.json(msjPrivilegio);

}

});


routerCarritos.get("/:id/productos",async (req,res)=>{

    res.json(await carritos.getById(req.params.id));
});

/*
routerProductos.get("/?/?",async (req,res)=>{

    res.json("ERROR");
});


*/
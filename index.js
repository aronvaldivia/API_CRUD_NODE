const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('/',(req,res) =>{
    res.send("hello from perrillo ahora? ");
});

app.get('/api/products', async(req,res)=>{
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }catch(error){
        res.status(500).send({message: error.message});
    }
});
//BUSCAR POR ID
app.get('/api/product/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).send({message: error.message});
    }
});

//ACTUALIZAR
 app.put('/api/product/:id', async(req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByIdAndUpdate(id, req.body);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// ELIMINAR PRODUCTO
  app.delete("/api/product/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


app.post('/api/products', async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch(error){
        res.status(400).json({message: error.message});
    }
    
    });



mongoose.connect("mongodb+srv://aronvaldivia0101:Md07qmuWRSZM6uWV@bdcrudapi.tezod26.mongodb.net/?retryWrites=true&w=majority&appName=BDcrudAPI")
.then(() =>{
console.log("connected to database");
app.listen(3000, () => {
 
    console.log('Server is running on port 3000');
    
});
})

.catch(() =>{
console.log("conection failed");
})
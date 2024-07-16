import express, { request, response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookmodels.js";


const app = express();

app.use(express.json());

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('Jesus Loves You')
});



//routing for saving a new book
app.post('/books',async(request,response)=>{
    try {

        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        )
        {
            return response.status(400).send({
                message: 'send all required fields: title,author,publishyear',
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//route for getting all books from database


app.get('/books',async(request,response)=>{
    try {
      
        const books=await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});



//to get one book from using id

app.get('/books/:id',async(request,response)=>{
    try {
      
        const {id}=request.params; 

        const book=await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


//to update book by id

app.put('/books/:id',async (request,reponse)=>{
    try {
        if(!request.body.title ||
           !request.body.author ||
           !request.body.publishYear
         ){
            
            return response.status(400).send({
                message: "all the required fields are not being fetched",

            });

          }

          const {id} = request.params;

          const result=await Book.findByIdAndUpdate(id,request.body);
          
          if(!result)
          {
            return response.status(404).json({message:"Book not found"});
          }

          return reponse.status(200).send({message:"Book updated succcssfully"});

        
    } catch (error) {

        console.log(error);
        response.status(500).send({message: error.message});
        
    }
})


mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB Atlas");
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

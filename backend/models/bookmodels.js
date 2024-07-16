import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },

        author:{
            type:String,
            requiired:true,
        },
        publishYear:{
            type: Number,
            required: true,
        },
    },

    {
        Timestamps:true,
    }

);

export const Book = mongoose.model('Book',bookSchema);
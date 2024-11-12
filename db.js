const mongoose=require('mongoose')

const connection = mongoose.connect('mongodb://0.0.0.0/men').then(()=>{
    console.log("Connected to database")
}) //this method can help us get connected to any database

module.exports = connection
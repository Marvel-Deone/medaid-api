require('dotenv').config();
const mongoose = require('mongoose')

const URI = process.env.URI
// mongoose.connect(URI, (err)=> {
//     {!err ? console.log("Connected Successfully") : console.log(err);}
// })

async function connect() {
    try {
        await mongoose.connect(URI);
        console.log("Connected Successfully");
    } catch (err) {
        console.log(err);
    };
}

connect();
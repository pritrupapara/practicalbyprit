const mongoose = require('mongoose')
    // let config=require("dotenv").config()

let dbUrl = "mongodb://localhost:27017/jwt-verific00";

mongoose.connect("mongodb+srv://pritrupapara:prit2601@prit.caygg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection successful!🛢');

}).catch((e) => {
    console.log('connection error', e);
    console.log('connection error');
});
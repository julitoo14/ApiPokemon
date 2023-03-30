const mongoose = require('mongoose');
let user= 'julito';
let password= '1234';
mongoose.connect(`mongodb+srv://${user}:${password}@julito.ue2rymh.mongodb.net/?retryWrites=true&w=majority`);


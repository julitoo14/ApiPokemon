const mongoose = require('mongoose');
let user= 'julito';
let password= '1234';
let databaseName = 'production';
if(process.env.NODE_ENV === 'test'){
    databaseName = 'testdb'
}
mongoose.connect(`mongodb+srv://${user}:${password}@julito.ue2rymh.mongodb.net/?retryWrites=true&w=majority`,
{dbName: databaseName});


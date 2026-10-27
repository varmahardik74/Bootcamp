// function callback(){
//     console.log("Hii there");
// }

// setTimeout(callback, 3000);



//Created a HTTP server (initialized the backend )
// imported express
const express = require ("express");
// initialized express 
const app = express();

app.listen(3000);
//

Path parametes, query parameters  




















const express = import ('express');

const app = express();

const port = 3000

app.get('/todos', (req, res) =>{
 
    const username = res.body.username;
    const email = res.body.email;
    const password = res.body.email;

})
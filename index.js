const express = require('express');
const app = express();

app.set('view', 'ejs');

app.get('/', function(req, res){
    res.send("Aqui foi");
});

app.listen(8080, function(erro){
    if(erro){
        console.log("problemas aqui");
    }else{
        console.log("running");
    }
    
});
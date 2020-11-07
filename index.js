const express = require('express');
const app = express();

app.set('view engine', 'ejs');//EJS ajuda a redenrizar interfaces na tela, onde o mesmo cria front com HTML, 
                        //e apara SETA-LO usamo o metodo set do expressps
                        //sempre tem que hgaver com pasta views por obrigação

app.get('/', (req, res)=>{
    /*res.send("Aqui foi");*/
    res.render('index')//repare que esse arquivo index é o index.ejs e não index.js e vc nem precisa colocar o caminho alem do nome
});

app.listen(8080,(erro) =>{
    if(erro)
    {   console.log("problemas aqui");
    }else{
        console.log("running");
        }
});
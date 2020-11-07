const express = require('express');
const app = express();

app.set('view engine', 'ejs');//EJS ajuda a redenrizar interfaces na tela, onde o mesmo cria front com HTML, 
                        //e apara SETA-LO usamo o metodo set do expressps
                        //sempre tem que hgaver com pasta views por obrigação


app.use(express.static('public')); // Para que usemos outros files(js e Css, img em geral) temos que usar essa linha e o caminho da pasta
                                    // Mas usaremos o nome public por ser refenciada

app.get('/:nome/:lang', (req, res)=>{

    var nome = req.params.nome;

    var produtos = [//esse é um array para ser trabalhado com forEach
        {nome:'Frango', preco:5.56, un:1},
        {nome:'Nootbook', preco:1.500, un:2},
        {nome:'Computador', preco:45.00, un:6},
        {nome:'boneco', preco:78.63, un:89}
    ]


    /*res.send("Aqui foi");*/

    res.render('index', {//Passando as variaveis para tela.
        nome:nome,
        langAquifora:req.params.lang,
        empresa:"Guia do Programador",
        inscritos:8000,
        conferirVlr:true,
        produtos:produtos
    });//repare que esse arquivo index é o index.ejs e não index.js e vc nem precisa colocar o caminho alem do nome

});

app.listen(8080,(erro) =>{
    if(erro)
    {   console.log("problemas aqui");
    }else{
        console.log("running");
        }
});
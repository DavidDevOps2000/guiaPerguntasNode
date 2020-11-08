const express = require('express');
const app = express();
const bodyParser = require('body-parser');/* Ele serve para vc pegar os dados decodificados */
const sequelize = require('sequelize');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

connection
    .authenticate()//Aqui ele Tentar logar
    .then(() =>{ console.log("conexao feita com sucesso")}) //conexao feita com sucesso
    .catch((msgErro)=>{ console.log(msgErro)});//Caso deu erro


//usando bodyParser para pegar os dados.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.set('view engine', 'ejs');//EJS ajuda a redenrizar interfaces na tela, onde o mesmo cria front com HTML, 
                        //e apara SETA-LO usamo o metodo set do expressps
                        //sempre tem que hgaver com pasta views por obrigação


app.use(express.static('public')); // Para que usemos outros files(js e Css, img em geral) temos que usar essa linha e o caminho da pasta
                                    // Mas usaremos o nome public por ser refenciada

app.get('/', (req, res)=>{

    //findALL é equivalente ao 'SELECT * FROM' dentro de uma tabela, ela nos tra os dados, MAS com muita informacao atoa, entao usemos o raw:true
    Pergunta.findAll({ raw: true, 
                    order:[['id', 'DESC']] })//ordenando listas do mais atual para mais antigo. ASC = CRESCENTE / DESC = DESCRECENTE
                    .then(perguntas =>{
        res.render("index",{//se arquivo index é o index.ejs e não index.js e vc nem precisa colocar o caminho alem do nom e
            perguntas:perguntas, //estou jogando os dados de perguntas trazidas como [] para perguntas
        });
    });
});

app.get('/perguntar',(req, res)=>{
    res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) =>{//Se no Formulario ha um methodo POST para pergarmos is valorres de lá temos que usa o POST tbm
    
    var titulo = req.body.nameTitulo;// esse nameTitulo vem la no name do input do /perguntar
    var descricao = req.body.nameDescricao; // esse nameDescricao vem la do name textArea do /perguntar.

    Pergunta.create({ // Nesse metodo create podemos inserir dados no BAnco
        titulo:titulo,  //estamos enviando dados para o campo titulo
        descricao:descricao //Estamos enviando dados apra o campo descrição
    }).then(()=>{ //Se tudo der certo, aqui faremos outra ação
        res.redirect('/');//aqui é o redirecionamento.
    })
});

app.get("/pergunta/:id", (req, res)=>{
    var id = req.params.id;

    Pergunta.findOne({// findOne faz pesquisas especificas usando CONDICIONAIS como o where
        where:{id:id}
    }).then( perguntas => {//pegaremos o resultado da tabela pergunta e usaremos o args 'args'

        if(perguntas != undefined){ // verificaremos se a tabela trouxe alguma coisa valida para levar a outra página
                                    //Se a codição der verdadeira ela levara a pagina em questão
            res.render('pergunta',{
                perguntas:perguntas
             });

        }else{// caso contrario
            res.redirect('/');//Aqui redirecionamos
        }
    })
});



app.listen(8888,(erro) =>{
    if(erro)
    {   console.log("problemas aqui");
    }else{
        console.log("running");
        }
});
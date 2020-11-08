const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");//importando o sequelize
const connection = require('./database');//importanto a connexao

//Esse arquivo aqui é um model onde ficará todo o modelo de conexao ou plano de negocio.

const Pergunta = connection.define('pergunta',{//criamos o nome da tabela como 'pergunta'
   titulo:{//nome do Campo
       type:Sequelize.STRING,//String é para textos curto
       allowNull:false // aqui impede que vc tenha inserido um valor nulo
   },
   descricao:{
       type:Sequelize.TEXT,//Text é para textos longos
       allowNull:false
   }
});
                //Aqui criará a sua tabela de fato no bd e se existir ele, nao seria cria por causa do false
Pergunta.sync({force:false}).then(()=>{
    console.log('tabela criada');
});

module.exports = Pergunta;

import Vaga from "../Modelo/vaga.js";

export default class VagaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const vaga_codigo = dados.vaga_codigo;
            const vaga_cargo = dados.vaga_cargo;
            const vaga_salario = dados.vaga_salario;
            const vaga_cidade = dados.vaga_cidade;
            const vaga_quantidade = dados.vaga_quantidade;
            if (vaga_cargo) {
                const vaga = new Vaga(0, vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade);
            
                vaga.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "cpfGerado": vaga.vaga_codigo,
                        "mensagem": "Vaga incluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a vaga:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados da vaga!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma vaga!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const vaga_codigo = dados.vaga_codigo;
            const vaga_cargo = dados.vaga_cargo;
            const vaga_salario = dados.vaga_salario;
            const vaga_cidade = dados.vaga_cidade;
            const vaga_quantidade = dados.vaga_quantidade;

            if (vaga_cargo && vaga_salario && vaga_cidade && vaga_quantidade) {
                
        	
                const vaga = new Vaga(vaga_codigo, vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade);
                
                vaga.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Vaga atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a vaga:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados da vaga!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma vaga!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const vaga_codigo = dados.vaga_codigo;
            if (vaga_codigo) {
                const vaga = new Vaga(vaga_codigo);
                
                vaga.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "vaga excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a vaga:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da vaga!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma vaga!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
      
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const vaga = new Vaga();
            vaga.consultar(termo).then((listavagas)=>{
                resposta.json(
                    {
                        status:true,
                        listavagas
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter as vagas: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar vagas!"
            });
        }
    }
}
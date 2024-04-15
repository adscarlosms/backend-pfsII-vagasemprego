//camada de interface da API que traduz HTTP
import Candidato from "../Modelo/candidato.js";

export default class CandidatoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cand_codigo = dados.cand_codigo;
            const cand_cpf = dados.cand_cpf;
            const cand_nome = dados.cand_nome;
            const cand_endereco = dados.cand_endereco;
            const cand_telefone = dados.cand_telefone;
            if (cand_nome) {
                const candidato = new Candidato(0, cand_nome, cand_cpf,cand_endereco, cand_telefone);
                //resolver a promise
                candidato.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "códigoInscricao": candidato.cand_codigo,
                        "mensagem": "Candidato incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o Candidato:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados do Candidato!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um Candidato!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cand_codigo = dados.cand_codigo;
            const cand_cpf = dados.cand_cpf;
            const cand_nome = dados.cand_nome;
            const cand_endereco = dados.cand_endereco;
            const cand_telefone = dados.cand_telefone;
            if (cand_cpf && cand_nome) {
                const candidato = new Candidato(cand_codigo,cand_cpf, cand_nome, cand_endereco, cand_telefone);
                
                candidato.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Candidato atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o Candidato:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados do Candidato!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um Candidato!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cand_codigo = dados.cand_codigo;
            if (cand_codigo) {
                const candidato = new Candidato(cand_codigo);
                
                candidato.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Candidato excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o Candidato:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do Candidato!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um Candidato!"
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
            const candidato = new Candidato();
            candidato.consultar(termo).then((listacandidatos)=>{
                resposta.json(
                    {
                        status:true,
                        listacandidatos
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os Candidatos: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar Candidatos!"
            });
        }
    }
}
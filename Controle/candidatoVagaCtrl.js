
import CandidatoVaga from '../Modelo/candidatoVaga.js';

export default class CandidatoVagaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            
            const cand_cpf = dados.cand_cpf;
            const vaga_codigo = dados.vaga_codigo;
            const data_inscricao = dados.data_inscricao;
            const horario_inscricao = dados.horario_inscricao;
            
            if (cand_cpf && vaga_codigo && data_inscricao && horario_inscricao) {
                const candidatoVaga = new CandidatoVaga(cand_cpf, vaga_codigo, data_inscricao, horario_inscricao);
            
                candidatoVaga.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "cpfGerado": {
                            "Código da Vaga":resposta.vaga_codigo,
                            "Cpf do Candidato":resposta.cand_cpf
                        },
                        
                        "mensagem": "Inscrição realizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a Inscrição:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados da Inscrição!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para se inscrever em uma vaga!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
               
            const cand_cpf = dados.cand_cpf;
            const vaga_codigo = dados.vaga_codigo;
            const data_inscricao = dados.data_inscricao;
            const horario_inscricao = dados.horario_inscricao;

            if (cand_cpf && vaga_codigo && data_inscricao && horario_inscricao) {
                
        	
                const candidatoVaga = new CandidatoVaga(cand_cpf, vaga_codigo, data_inscricao, horario_inscricao);
                
                candidatoVaga.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Inscrição atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a inscrição:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados da inscrição!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar a inscrição!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cand_cpf = dados.cand_cpf;
            const vaga_codigo = dados.vaga_codigo;

            if (cand_cpf &&vaga_codigo) {
                const candidatoVaga = new CandidatoVaga(vaga_codigo);
                
                candidatoVaga.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Inscrição excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a inscrição:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados da Inscrição corretamente!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma Inscrição!"
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
            const candidatoVaga = new CandidatoVaga();
            candidatoVaga.consultar(termo).then((listainscricoes)=>{
                listainscricoes.json(
                    {
                        status:true,
                        listainscricoes
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter as inscricoes: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar as inscricoes!"
            });
        }
    }
}
import Candidato from "../Modelo/candidato.js";
import Inscricao from "../Modelo/inscricao.js";
import Vaga from "../Modelo/vaga.js"
import candidatoVaga from "../Modelo/candidatoVaga.js"


export default class InscricaoCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;            
            const cand_codigo = dados.cand_codigo;
            const data_inscricao = dados.data_inscricao;
            const horario_inscricao = dados.hora_inscricao;
            const vagas = dados.vagas;
            const inscricao = new Inscricao(0, cand_codigo, data_inscricao, horario_inscricao, vagas);
            inscricao.gravar().then(() => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Inscrição realizada com sucesso!",
                    "codigo": inscricao.insc_codigo
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao gravar a Inscrição: " + erro.message
                })
            })
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const termo = requisicao.params.termo;
            if(!isNaN(termo)){
                const inscricao = new Inscricao(0);
                inscricao.consultar(termo).then((listavagas) => {
                    resposta.status(200).json({
                        "status": true,
                        "listavagas": listavagas
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar a inscrição: " + erro.message
                    });
                });
            }
        }
    }
}
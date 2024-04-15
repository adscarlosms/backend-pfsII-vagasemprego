import Inscricao from "../Modelo/inscricao.js";
import Candidato from "../Modelo/candidato.js";
import Vaga from "../Modelo/vaga.js"
import CandidatoVaga from "./candidatoVagaDAO.js";

import conectar from "./conexao.js";


export default class InscricaoDAO {
    async gravar(inscricao) {
        if (inscricao instanceof Inscricao) {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try {
                const sql1 = `INSERT INTO inscricao(                   	
                    cand_codigo,	
                    data_inscricao,	
                    horario_inscricao) VALUES(?,?,?)`;
                const parametros = [inscricao.cand_codigo, inscricao.data_inscricao, inscricao.hora_inscricao];
                const retorno = await conexao.execute(sql1, parametros);
                inscricao.insc_codigo = retorno[0].insertId;

                const sql2 = "INSERT INTO candidato_vaga(insc_codigo,vaga_codigo) VALUES(?,?)";
                for (const item of inscricao.vagas) {
                    let parametros2 = [inscricao.insc_codigo, item.vagas.vaga_codigo];
                    await conexao.execute(sql2, parametros2);
                }
                await conexao.commit();
                //console.log("Gravação concluida!")
            } catch (error) {
                await conexao.rollback();
                throw error;
            }
        }
    }


    async consultar(termoBusca) {
        const listainscricoes = [];
        if (!isNaN(termoBusca)) {
            const conexao = await conectar();
            const sql = ` SELECT 
            i.insc_codigo,i.cand_codigo, i.data_inscricao, 
            i.horario_inscricao, 
            v.vaga_codigo, v.vaga_cargo, v.vaga_salario, 
            v.vaga_cidade, v.vaga_quantidade,
            c.cand_codigo, c.cand_cpf,
            c.cand_nome,c.cand_endereco, c.cand_telefone, 
            cv.vaga_codigo, cv.insc_codigo
                 FROM inscricao as i 
                 INNER JOIN candidato as c 
                 ON i.cand_codigo = c.cand_codigo  
                 INNER JOIN candidato_vaga as cv
                 On cv.insc_codigo = i.insc_codigo          
                 INNER JOIN vaga as v           
                 ON v.vaga_codigo = cv.vaga_codigo 
                 WHERE i.insc_codigo =  ?`;
            const [registros, campos] = await conexao.execute(sql, [termoBusca]);
            if (registros.length > 0) {
                const candidato = new Candidato(registros[0].cand_codigo, registros[0].cand_cpf, registros[0].cand_nome, registros[0].cand_endereco, registros[0].cand_telefone);
                let listaItensVagas = [];
                for (const registro of registros) {
                    const vaga = new Vaga(registro.vaga_codigo, registro.vaga_cargo, registro.vaga_salario, registro.vaga_cidade, registro.vaga_quantidade);

                    //const candidato_vaga = new CandidatoVaga(vaga,registro.insc_codigo,registro.vaga_codigo); 
                    //listaItensVagas.push(candidato_vaga);
                    listaItensVagas.push(vaga);
                }
                const inscricao = new Inscricao(registros[0].insc_codigo, candidato, registros[0].data_inscricao, registros[0].horario_inscricao, listaItensVagas);
                listainscricoes.push(inscricao);
            }
        }
        return listainscricoes;
    }
}


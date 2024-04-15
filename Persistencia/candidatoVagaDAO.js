import Candidato_Vaga from "../Modelo/candidatoVaga.js";
import conectar from "./conexao.js";

export default class CandidatoVaga{
    async gravar(inscricao){
        if (inscricao instanceof Candidato_Vaga){
            const sql = "INSERT INTO candidato_vaga(cand_codigo,vaga_codigo) VALUES(?,?)";
            const parametros = [candidato.cand_codigo, candidato.vaga_codigo];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql,parametros);
            candidato.cand_codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }



    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
 
        if (!isNaN(parseInt(parametroConsulta))){
         
            sql='SELECT * FROM candidato_vaga WHERE cand_codigo = ? order by vaga_codigo';
            parametros = [parametroConsulta];
        }
        else{
            
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM candidato_vaga";

        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listacandidatosvaga = [];
        for (const registro of registros){
            const candidato = new Candidato_Vaga(registro.cand_codigo, registro.vaga_codigo);
            listacandidatosvaga.push(candidato);
        }
        return listacandidatosvaga;
    }
}
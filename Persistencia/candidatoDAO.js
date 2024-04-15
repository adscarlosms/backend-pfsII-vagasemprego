import Candidato from "../Modelo/candidato.js";
import conectar from "./conexao.js";

export default class CandidatoDAO{
    async gravar(candidato){
        if (candidato instanceof Candidato){
            const sql = "INSERT INTO candidato(cand_cpf,cand_nome,cand_endereco,cand_telefone) VALUES(?,?,?)"; 
            const parametros = [candidato.cand_cpf,candidato.cand_nome,candidato.cand_endereco,candidato.cand_telefone];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql,parametros);
            candidato.cand_cpf = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(candidato){
        if (candidato instanceof Candidato){
            const sql = "UPDATE candidato SET cand_nome = ?,  cand_endereco = ?,cand_telefone = ? WHERE cand_cpf = ?"; 
            const parametros = [candidato.cand_cpf,candidato.cand_nome, candidato.cand_endereco,candidato.cand_telefone, candidato.cand_codigo];
            const conexao = await conectar(); 
            await conexao.execute(sql,parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(candidato){
        if (candidato instanceof Candidato){
            const sql = "DELETE FROM candidato WHERE cand_codigo = ?"; 
            const parametros = [candidato.cand_cpf];
            const conexao = await conectar(); 
            await conexao.execute(sql,parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
 
        if (!isNaN(parseInt(parametroConsulta))){
         
            sql='SELECT * FROM candidato WHERE cand_cpf = ? order by cand_nome';
            parametros = [parametroConsulta];
        }
        else{
            
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM candidato";

        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listacandidatos = [];
        for (const registro of registros){
            const candidato = new Candidato(registro.cand_codigo,registro.cand_cpf, registro.cand_nome, registro.cand_endereco, registro.cand_telefone);
            listacandidatos.push(candidato);
        }
        return listacandidatos;
    }
}
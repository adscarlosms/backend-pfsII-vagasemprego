import Vaga from "../Modelo/vaga.js";
import conectar from "./conexao.js";

export default class VagaDAO{
    async gravar(vaga){
        if (vaga instanceof Vaga){
            const sql = "INSERT INTO vaga(vaga_cargo,vaga_salario,vaga_cidade,vaga_quantidade) VALUES(?,?,?,?)";
            const parametros = [vaga.vaga_cargo,vaga.vaga_salario,vaga.vaga_cidade,vaga.vaga_quantidade];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql,parametros);
            vaga.vaga_codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(vaga){
        if (vaga instanceof Vaga){
            const sql = "UPDATE vaga SET vaga_cargo = ?, vaga_salario = ?,vaga_cidade = ?,vaga_quantidade = ? WHERE vaga_codigo = ?";
            const parametros = [vaga.cand_nome, vaga.cand_endereco,vaga.cand_telefone, vaga.codigo];
            const conexao = await conectar(); 
            await conexao.execute(sql,parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(vaga){
        if (vaga instanceof Vaga){
            const sql = "DELETE FROM vaga WHERE cand_cpf = ?"; 
            const parametros = [vaga.vaga_codigo];
            const conexao = await conectar(); 
            await conexao.execute(sql,parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
 
        if (!isNaN(parseInt(parametroConsulta))){
         
            sql='SELECT * FROM vaga WHERE vaga_codigo = ? order by vaga_cargo';
            parametros = [parametroConsulta];
        }
        else{
            
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM vaga";

        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listavagas = [];
        for (const registro of registros){
            const vaga = new Vaga(registro.vaga_codigo, registro.vaga_cargo, registro.vaga_salario, registro.vaga_cidade, registro.vaga_quantidade);
            listavagas.push(vaga);
        }
        return listavagas;
    }
}
import CandidatoVagaDAO from "../Persistencia/candidatoVagaDAO.js";

export default class Candidato_Vaga {
    #cand_codigo;
    #vaga_codigo;
    

    constructor(cand_codigo, vaga_codigo) {
        this.#cand_codigo = cand_codigo;
        this.#vaga_codigo = vaga_codigo;
       
    }

    get cand_codigo() {
        return this.#cand_codigo;
    }

    set cand_codigo(cand_codigo) {
        this.#cand_codigo = cand_codigo;
    }

    get vaga_codigo() {
        return this.#vaga_codigo;
    }

    set vaga_codigo(vaga_codigo) {
        this.#vaga_codigo = vaga_codigo;
    }

   


    toJSON() {
        return {
            'cand_codigo': this.#cand_codigo,
            'vaga_codigo': this.#vaga_codigo,          
        };
    }

    async gravar() {
        const candidatoVagaDAO = new CandidatoVagaDAO();
        this.#cand_codigo = await candidatoVagaDAO.gravar(this);
    }

    async consultar(parametroConsulta) {
        const candidatoVagaDAO = new CandidatoVagaDAO();
        return await candidatoVagaDAO.consultar(parametroConsulta);
    }
}


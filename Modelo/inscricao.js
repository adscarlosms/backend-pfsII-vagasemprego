import InscricaoDAO from "../Persistencia/inscricaoDAO.js";
export default class inscricao {
    #insc_codigo;
    #cand_codigo;
    #data_inscricao;
    #hora_inscricao;
    #vagas;
    

    constructor(insc_codigo, cand_codigo, data_inscricao, hora_inscricao, vagas) {
        this.#insc_codigo = insc_codigo;
        this.#cand_codigo = cand_codigo;
        this.#data_inscricao = data_inscricao;
        this.#hora_inscricao = hora_inscricao;
        this.#vagas = vagas;
    }

    
    get insc_codigo() {
        return this.#insc_codigo;
    }

    set insc_codigo(insc_codigo) {
        this.#insc_codigo = insc_codigo;
    }

    get cand_codigo() {
        return this.#cand_codigo;
    }

    set cand_codigo(cand_codigo) {
        this.#cand_codigo = cand_codigo;
    }

    get data_inscricao() {
        return this.#data_inscricao;
    }

    set data_inscricao(data_inscricao) {
        this.#data_inscricao = data_inscricao;
    }

    get hora_inscricao() {
        return this.#hora_inscricao;
    }

    set hora_inscricao(hora_inscricao) {
        this.#hora_inscricao = hora_inscricao;
    }

    get vagas() {
        return this.#vagas;
    }

    set vagas(vagas) {
        this.#vagas = vagas;
    }


    toJSON() {
        return {
            "inscricao": this.#insc_codigo,
            "candidato": this.#cand_codigo,
            "data_inscricao": this.#data_inscricao,
            "hora_inscricao": this.#hora_inscricao,
            "vagas": this.#vagas
        };
    }

    async gravar() {
        const inscricaoDAO = new InscricaoDAO();
        this.insc_codigo = await inscricaoDAO.gravar(this);
    }

    async atualizar() {
        // const inscricaoDAO = new inscricaoDAO();
        // await inscricaoDAO.atualizar(this);
    }

    async excluir() {
        // const inscricaoDAO = new inscricaoDAO();
        // await inscricaoDAO.excluir(this);
    }

    async consultar(termoBusca) {
        const inscricaoDAO = new InscricaoDAO();
        const listainscricoes = await inscricaoDAO.consultar(termoBusca);
        return listainscricoes;
    }
    
}

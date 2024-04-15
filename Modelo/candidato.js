import CandidatoDAO from "../Persistencia/candidatoDAO.js";

export default class Candidato {
    #cand_codigo;
    #cand_cpf;
    #cand_nome;
    #cand_endereco;
    #cand_telefone;


    constructor(cand_codigo,cand_cpf, cand_nome, cand_endereco, cand_telefone) {
        this.#cand_codigo = cand_codigo;
        this.#cand_cpf = cand_cpf;
        this.#cand_nome = cand_nome;
        this.#cand_endereco = cand_endereco;
        this.#cand_telefone = cand_telefone;

    }

    get cand_codigo() {
        return this.#cand_codigo;
    }

    set cand_codigo(novoCandCodigo) {
        this.#cand_codigo = novoCandCodigo;
    }


    get cand_cpf() {
        return this.#cand_cpf;
    }

    set cand_cpf(novoCandCpf) {
        this.#cand_cpf = novoCandCpf;
    }


    get cand_nome() {
        return this.#cand_nome;
    }

    set cand_nome(novoCandNome) {
        if (novoCandNome === "") {
            console.log("campo nome não preenchido!");
        } else {
            this.#cand_nome = novoCandNome;
        }
    }

    get cand_endereco() {
        return this.#cand_endereco;
    }

    set cand_endereco(novoCandEndereco) {
        if (novoCandEndereco === "") {
            console.log("Dado não preenchido");
        } else {
            this.#cand_endereco = novoCandEndereco;
        }
    }

    get cand_telefone() {
        return this.#cand_telefone;
    }

    set cand_telefone(novoCandTelefone) {
        if (novoCandTelefone === "" || novoCandTelefone.length !== 11) {
            console.log("Digite apenas números! Total de 11 dígitos");
        } else {
            this.#cand_telefone = novoCandTelefone;
        }
    }





    toJSON() {
        return {
            'cand_codigo': this.#cand_codigo,
            'cand_cpf': this.#cand_cpf,
            'cand_nome': this.#cand_nome,
            'cand_endereco': this.#cand_endereco,
            'cand_telefone': this.#cand_telefone,
        };
    }

    async gravar() {
        const candidatoDAO = new CandidatoDAO();
        this.cand_codigo = await candidatoDAO.gravar(this);
    }

    async atualizar() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.atualizar(this);
    }

    async excluir() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.excluir(this);
    }

    async consultar(parametro) {
        const candidatoDAO = new CandidatoDAO();
        const listacandidatos = await candidatoDAO.consultar(parametro);
        return listacandidatos;
    }
}
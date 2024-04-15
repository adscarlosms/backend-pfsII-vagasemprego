import VagaDAO from "../Persistencia/vagaDAO.js";

export default class Vaga {
    #vaga_codigo;
    #vaga_cargo;
    #vaga_salario;
    #vaga_cidade;
    #vaga_quantidade;


    constructor(vaga_codigo, vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade) {

        this.#vaga_codigo = vaga_codigo;
        this.#vaga_cargo = vaga_cargo;
        this.#vaga_salario = vaga_salario;
        this.#vaga_cidade = vaga_cidade;
        this.#vaga_quantidade = vaga_quantidade;

    }


    get vaga_codigo() {
        return this.#vaga_codigo;
    }

    set vaga_codigo(vaga_codigo) {
        this.#vaga_codigo = vaga_codigo;
    }

    get vaga_cargo() {
        return this.#vaga_cargo;
    }

    set vaga_cargo(vaga_cargo) {
        this.#vaga_cargo = vaga_cargo;
    }

    get vaga_salario() {
        return this.#vaga_salario;
    }

    set vaga_salario(vaga_salario) {
        this.#vaga_salario = vaga_salario;
    }

    get vaga_cidade() {
        return this.#vaga_cidade;
    }

    set vaga_cidade(vaga_cidade) {
        this.#vaga_cidade = vaga_cidade;
    }

    get vaga_quantidade() {
        return this.#vaga_quantidade;
    }

    set vaga_quantidade(vaga_quantidade) {
        this.#vaga_quantidade = vaga_quantidade;
    }





    toJSON() {
        return {
            "vaga_codigo": this.#vaga_codigo,
            "vaga_cargo": this.#vaga_cargo,
            "vaga_salario": this.#vaga_salario,
            "vaga_cidade": this.#vaga_cidade,
            "vaga_quantidade": this.#vaga_quantidade
        };
    }

    async gravar() {
        const vagaDao = new VagaDAO();
        this.#vaga_codigo = await vagaDao.gravar(this);
    }

    async atualizar() {
        const vagaDao = new VagaDAO();
        await vagaDao.atualizar(this);
    }

    async excluir() {
        const vagaDao = new VagaDAO();
        await vagaDao.excluir(this);
    }

    async consultar(parametro) {
        const vagaDao = new VagaDAO();
        const listavagas = await vagaDao.consultar(parametro);
        return listavagas;
    }
}
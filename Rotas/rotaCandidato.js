import { Router } from "express";
import CandidatoCtrl from "../Controle/candidatoCtrl.js";

const candidatoCtrl = new CandidatoCtrl();
const rotaCandidato = new Router();

rotaCandidato
    .get('/', candidatoCtrl.consultar)
    .post('/', candidatoCtrl.gravar)
    .put('/', candidatoCtrl.atualizar)
    .delete('/', candidatoCtrl.excluir);

export default rotaCandidato;
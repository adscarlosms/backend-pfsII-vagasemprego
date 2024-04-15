import { Router } from "express";
import CandidatoVagaCtrl from "../Controle/candidatoVagaCtrl.js";

const candidatoVagaCtrl = new CandidatoVagaCtrl();
const rotaCandidatoVaga = new Router();

rotaCandidatoVaga
    .post('/', candidatoVagaCtrl.gravar)
    .get('/:termo', candidatoVagaCtrl.consultar)
    .get('/', candidatoVagaCtrl.consultar);

export default rotaCandidatoVaga;
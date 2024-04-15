import { Router } from "express";
import InscricaoCtrl from "../Controle/inscricaoCtrl.js";

const inscricaoCtrl = new InscricaoCtrl();
const rotainscricao = new Router();

rotainscricao
    .get('/:termo', inscricaoCtrl.consultar)
    .post('/', inscricaoCtrl.gravar)

export default rotainscricao;
import express from 'express';
import cors from 'cors';
import rotaCandidato from './Rotas/rotaCandidato.js';
import rotaVaga from './Rotas/rotaVaga.js';
import session from 'express-session';
import dotenv from 'dotenv';
import rotainscricao from './Rotas/rotaInscricao.js';
import { verificarAcesso } from './Seguranca/autenticacao.js';


const host = '0.0.0.0';
const porta = '4000';
const app = express();

dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}));

app.use('/candidatos', rotaCandidato);
app.use('/vagas', rotaVaga);
app.use('/inscricoes',  rotainscricao); 

app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
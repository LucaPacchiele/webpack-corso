/* ENTRY POINT 
devo mettere i riferimenti di tutti i file da caricare all'inizio del bundle */

import 'bootstrap';

import './styles/index.scss'; // è necessario inserirlo per far gestire lo stile, lo inserisce nel grafo delle dipendenze

import './images/logo.png'; //viene trovata nel bundle l'immagine
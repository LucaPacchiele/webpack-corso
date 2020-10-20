// è scritto in nodejs e serve per specificare il set di istruzioni che deve seguire il bundle


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //è un modulo per nodejs per richiedere i moduli, questo l'ho dovuto installare perchè di terze parti npm install html...

module.exports= {
    mode: process.env.NODE_ENV || 'development', // può contenere configurazioni dinamiche, se non trova la prima configurazione si imposta come development
    entry: './src/index.js',  //indico da quale fine iniziare (contiene import 'bootstrap';)
    output: {
        //il risultato del bundling viene esportato in questo file
        filename: 'bundle.js',
        /* che si trova in questa cartella, equivale a scrivere  '/Users/Luca/Desktop/....' ma permette di dare un percorso relativo
        che possono utilizzare tutti gli utilizzatori della webapp */
        path: path.resolve(__dirname, 'dist')  
    },
    /* configurazioni apposite del webserver di sviluppo:
    su http://localhost:3000 sarà disponibile il risultato del bundle presente nella cartella 'dist' 
    attraverso il server di sviluppo riesco a osservare come si comporta il bundle */
    devServer: {
        contentBase: 'dist/', // Relative directory for base of server
        publicPath: '/', // Live-reload
        inline: true,
        port: process.env.PORT || 3000, // Port Number
        host: 'localhost', // Change to '0.0.0.0' for external facing server (lo rendiamo disponibile su tutta la rete, abilitando il firewall, per vederlo ad es. dallo smartphone)
        historyApiFallback: true,
    },

    /* specifico qui la lista dei tipi di file che mi aspetto di utilizzare (che vengono interpretati dai loader
        già precedentemente installati: npm install babel-loader ...... ) */
    module: {
        rules: [ //la quadra indica che è una lista
            {
                /* posso applicare sullo stesso tipo di file più loaders per effettuare diverse trasformazioni:
                da SASS a CSS, poi da CSS a CSS (interpretabile) e da CSS a DOM (per iniettare i file CSS in modo che sia leggibile da browser) */
                test: /\.(scss)$/,
                use: [
                    {// Adds CSS to the DOM by injecting a `<style>` tag
                    loader: 'style-loader'
                }, 
                {
                    // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    loader: 'css-loader'
                },
                {
                    // Loads a SASS/SCSS file and compiles it to CSS
                    loader: 'sass-loader'
                }
                ]

            },
            {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
                use:
                    {
                    loader: 'babel-loader', //da javascript moderno a versioni più compatibili
                    options: {
                        presets: ['@babel/preset-env']  //questo loader ha delle opzioni
                    }
                }
    
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/, //espressioni regolari per matchare prozioni di testo
                    use: [
                            {
                            loader: 'file-loader',
                            options: {
                                /* (consultando la documentazione del plugin trovo alias e comandi da dare)

                                avrei potuto mettere un path che genera le imamgini, rinominandole nel modo a seguire,
                                ad esempio dentro img/[name].[ext]
                                Avrei potuto anche creare una funzione che dinamicamente creava cartelle o rinominava in un modo
                                specifico i file (programmando in node.js)  */
                                name: 'img_out/[name].[ext]',  
                            },
                        },
                        'image-webpack-loader',
                    ]
                },
        ]       

    },

    //sezione plugins
    plugins: [
        new HtmlWebpackPlugin({ //configurazione plugin, lo ripeto tante volte quanti i template
            // (consultando la documentazione del plugin trovo alias e comandi da dare)
            //è il nome della pagina di output, nella quale verrà iniettato il plugin (va a finire in dist)
            filename: 'index.html', 
            //è l'indirizzo del template, ovvero la pagina html che ha la struttura di base (head, body, div e tutto il resto)
            template: './src/index.html', 
        }),

        /* // va ripetuto per tutte le pagine html in src, ovvero tutti i template!

        new HtmlWebpackPlugin({ //configurazione plugin, lo ripeto tante volte quanti i template
            filename: 'altra_pagina.html', //nome della pagina desiderata che va a finire in dist
            template: './src/altra_pagina.html',
        }),


        */
    ]

};
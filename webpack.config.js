const path = require('path'); // ferramenta do Node.js para lidar com caminhos de arquivos.

module.exports = {
    mode: 'development', // Define o modo de execução do código - development / production 
    entry: './frontend/main.js', // Ponto de entrada do projeto (arquivo principal)
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'), // Pasta de saida para o pacote
        filename: 'bundle.js', // Nome do arquivo final
    },
    module:{
        rules: [{
            exclude: /node_modules/, // Ignora a pasta node_modules
            test: /\.js$/, // Alvo: arquivos .js
            use: {
                loader:'babel-loader', //Usa Babel para esses arquivos
                options: {
                    presets:['@babel/env'] // Usa o preset para transformar o JS moderno
                }
            }
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map', //mapeamento de erros e logs do bundle
};
/**
 * Init API to manager a VUTTR APP - testes/api.
 *
 * Inicialização da API 
 *
 * @version    1.0.0
 * @package    api-vuttr
 * @subpackage testes/api
 * @author     Alcindo Schleder <alcindoschleder@gmail.com>
 * @host       api.vocatio.com.br
 * @copyright  Vocatio Telecom <https://www.vocatiotelecom.com.br>
 *
 */

"use strict"

const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const HapiJwt = require('hapi-auth-jwt2');
const Vision = require('vision');
const Inert = require('inert');
const ApiUtils = require('../commom/utils');
const env = process.env.NODE_ENV || 'development';
const config = require('./src/db/config/config.json')[env];

// Get data from config file or environement variable and generate a DSN string
const DSN = (
    (config.use_env_variable) ?  ApiUtils.genDSN(process.env[config.use_env_variable]) : ApiUtils.genDSN(config)
);

/*****************************************
 * importa os scripts para gestão do banco de dados 
 * a ser usadas nas rotas
 ****************************************/
const Context = require('../commom/base/contextStrategy');
const Mongo = require('../commom/base/mongo/mongoDbStrategy');
/*****************************************
 * importa os schemas de cada tabela 
 * a ser usadas nas rotas
 ****************************************/
const ToolsSchema = require('./src/db/schemas/toolsSchema');
/*****************************************
 * importa as rotas
 ****************************************/
const genToken = require('./src/routes/genTokenRoutes');
const Tools = require('./src/routes/toolsRoutes');

const app = new Hapi.Server({
    port: 3000,
    routes: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type"],
            additionalHeaders: ["X-Requested-With"]
        }
    }
});

async function main() {
    const connection = await Mongo.connect(DSN);
    const ToolsModel = await Mongo.defineModel('tools', ToolsSchema);

    const MongoTools = new Context(new Mongo(connection, ToolsModel));

    const swaggerOptions = {
        info: {
            title: 'API Manutenção de uma Aplicação VUTTR',
            version: 'v2.0.0',
            description: 'API que manipula os dados utilizados para o funcionamento da app VUTTR.',
            contact: {
                name: 'Alcindo Schleder',
                url: 'https://www.vocatiotelecom.com.br',
                email: 'alcindo@vocatiotelecom.com.br'
            }
        },
        lang: 'pt'
    };
    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    
    const routes = [
        ...await ApiUtils.mapRoutes(new genToken(), genToken.methods()),
        ...await ApiUtils.mapRoutes(new Tools(MongoTools), Tools.methods())
    ];

    app.route(routes);

    await app.start();
    console.log('server running at', app.info.port);

    return app;
};
module.exports = main();

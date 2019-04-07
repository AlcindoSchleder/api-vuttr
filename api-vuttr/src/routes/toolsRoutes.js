/**
 * devicesRoutes - localInfo API.
 *
 * Rotas para Leitura e gravação do banco de dados local do minipc dos totens
 *
 * @version    2.0.0
 * @package    vktio-localinfo
 * @subpackage apis
 * @author     Alcindo Schleder <alcindoschleder@gmail.com>
 * @host       localhost
 * @copyright  Vocatio Telecom <https://www.vocatiotelecom.com.br>
 *
 */

"use strict"

const ACONST = require('/opt/node/apis/commom/consts');
const APATH = ACONST.localInfoPath();
const BaseRoute = require('/opt/node/apis/commom/base/baseRoute');
const Joi = require('joi');

class ToolsRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
        this.accessToken.table = 'tools';
        this.accessToken.api ='vuttr';
        this.accessToken.route = APATH + '/tools';
    };

    browse() {
        return {
            path: APATH + '/tools',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Listar as ferramentas do Sistema',
                notes: 'Necessário um token de acesso para a realização das chamadas!',
                validate: {
                    failAction: this._failAction,
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                    query: {
                        skip: Joi.number().integer().default(null),
                        limit: Joi.number().integer().default(null),
                        title: Joi.string().default(null),
                        link: Joi.string().default(null),
                        description: Joi.string().default(null),
                        tags: Joi.array().default(null),
                        insert_date: Joi.date().default(null),
                        update_date: Joi.date().default(null)
                    }
                }
            },
            handler: async (request, headers) => {
                // 1) Get Query Params Data
                const {
                    skip, 
                    limit,
                    title,
                    link,
                    description,
                    tags,
                    insert_date,
                    update_date
                } = request.query;

                // 1) Filter Data
                const raw = {
                    title,
                    link,
                    description,
                    tags,
                    insert_date,
                    update_date
                }
                const filter = this._removeNulls(raw);

                // 2) Get data from DB
                return await this.db.browse(filter, parseInt(((skip) ? skip: 0)), parseInt(((limit) ? limit: 10)));
            }
        };
    };
    insert() {
        return {
            path: APATH + '/tools',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Cadastrar ferramentas',
                notes: 'Necessário um token de acesso para chamada desta função!',
                validate: {
                    failAction: this._failAction,
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                    payload: {
                        title: Joi.string().min(5).required(),
                        link: Joi.string().uri().required(),
                        description: Joi.string().min(10).required,
                        tags: Joi.array().required()
                    }
                }
            },
            handler: async (request, headers) => {
                // 1) Token Access Validate
                const v = this._validateToken(headers.authorization, request.method);
                if (!v.sttCode === 200) return v;

                // 2) get Fields
                const data = {
                    title      : request.payload.title,
                    link       : request.payload.link,
                    description: request.payload.description
                }
        
                // 3) insertRecord
                return await this.db.insert(data);
            }
        }
    }
    insert() {
        return {
            path: APATH + '/toolsmany',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Cadastrar ferramentas',
                notes: 'Necessário um token de acesso para chamada desta função!',
                validate: {
                    failAction: this._failAction,
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                    payload: [{
                        title: Joi.string().min(5).required(),
                        link: Joi.string().uri().required(),
                        description: Joi.string().min(10).required(),
                        tags: Joi.array().required()
                    }]
                }
            },
            handler: (request, headers) => {
                // 1) Token Access Validate
                const v = this._validateToken(headers.authorization, request.method);
                if (!v.sttCode === 200) return v;

                // 2) get Fields
                request.payload.array.forEach(async element => {
                    // 3) insertRecord
                    return await this.db.insert(element);            
                });
        
            }
        }
    }
    update() {
        return {
            path: APATH + '/tools/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Edita um registro de forma parcial ou total',
                notes: 'Necessário um token de acesso para a realização das chamadas!',
                validate: {
                    failAction: this._failAction,
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                    params: {
                        id: Joi.object().required(),
                    },
                    payload: {
                        title: Joi.string().default(null),
                        link: Joi.string().default(null),
                        description: Joi.string().default(null),
                        tags: Joi.array().default(null),
                        update_date: Joi.date().default(null)
                    }
                }
            },
            handler: async (request, headers) => {
                // 1) Token Access Validate
                const v = this._validateToken(headers.authorization, request.method);
                if (!v.sttCode === 200) return v;

                // 2) Update record
                const data = request.payload;
                return await this.db.update(request.params, data);
            }
        }
    }
    delete() {
        return {
            path: APATH + '/tools/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Excluir Dipositivos do banco de dados local',
                notes: 'Necessário um token de acesso para a realização das chamadas!',
                validate: {
                    failAction: this._failAction,
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                    params: {
                        id: Joi.object().required(),
                    }
                }
            },
            handler: async (request, headers) => {
                // 1) Token Access Validate
                const v = this._validateToken(headers.authorization, request.method);
                if (!v.sttCode === 200) return v;

                // 2) Delete record
                return await this.db.delete(request.params);
            }
        };
    };

};
module.exports = ToolsRoutes;
// use admin
//
// db.createUser(
//     {
//         user: "admin",
//         pwd: "2203_90Am10@Mgr",
//         roles: [ 
//             "userAdminAnyDatabase",
//             "dbAdminAnyDatabase",
//             "readWriteAnyDatabase"
//         ]
//     }
// )

// use api-vuttr
// 
// db.createUser(
//     {
//         user: "sysdba",
//         pwd: "S76%$00_dba",
//         roles: [{
//             role: "readWrite",
//             db: "api-vuttr"
//         }]
//     }
// )
/**
 * genTokenRoutes.js - api_vuttr.
 *
 * Rota de geração de tokens. Geralmente esta rota é vinculada à uma tabela de usuários,
 * porém esta aplicação é somente de testes e o token é gerado para qualquer usuário
 * passado no parâmetro da rota.
 *
 * @version    0.0.1
 * @package    generic
 * @subpackage api_vuttr
 * @author     Alcindo Schleder <alcindoschleder@gmail.com>
 * @host       localhost
 * @copyright  Vocatio Telecom <https://www.vocatiotelecom.com.br>
 *
 */

"use strict"

const ACONST = require('../../../commom/consts');
const APATH = '/apiVuttr/v1.0.0';

const BaseRoute = require('../../../commom/base/baseRoute');
const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const USER_NAME = 'ApiVuttr';
const USER_PWRD = '1234567890';

class genTokenRoutes extends BaseRoute {
    constructor() {
        super()
        this.accessToken.table = 'n/a';
        this.accessToken.api ='api_vuttr';
    };

    getUserToken() {
        return {
            path: APATH + '/get_user_token',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Obter Token',
                notes: 'Gera um token para o usuário que solicitou!',
                validate: {
                    failAction: this._failAction,
                    query: {
                        username: Joi.string().required(),
                        password: Joi.string().required(),
                        userSigned: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                const {username, password, userSigned} = request.query;
                this.accessToken.route = APATH + '/get_user_token';

                // Autentica o usuário com a senha padrão
                const flagGen = ((username === USER_NAME) && (password === USER_PWRD));
                const userData = {
                    data: {
                        id: Math.floor(Math.random() * (1000 - 500) + 500), // Generate a ramdom number
                        user_name: ((flagGen) ? userSigned : null),
                        pwd: password,
                        access_token: null
                    },
                    status: {
                        sttCode: ((flagGen) ? 200 : 401),
                        sttMsgs: ((flagGen) ? 'Geração de Token Ok' : 'O usuario ou senha inválidos')
                    }
                };
                if ((userData.status.sttCode !== 200) || (!userData.data.user_name)) {
                    return ACONST.unauthorized('O usuario ou senha inválidos');
                };
                // Preparando para gerar o token de acesso
                const today = new Date();
                const emmitedAt = today.getTime();
                today.setMonth(today.getMonth() + 1) ;
                const expireAt = today.getTime();

                const token = Jwt.sign({
                    id: userData.data.id, // subject id
                    issuer: username, // Emissor do Token
                    userName: userData.data.user_name, // Nome do Usuário
                    emmitedAt: emmitedAt, // data de Emissão
                    expireAt: expireAt // data da Expiração
                }, this.accessToken.secretPhrase, {
                    algorithm: 'HS256'
                });

                return { token };
            }
        };
    };

};
module.exports = genTokenRoutes
/**
 * baseRoutes.js - Vocatio Commom.
 *
 * Script base para gerar as rotas da API
 *
 * @version    1.0.0
 * @package    vktio-commom
 * @subpackage vktio-main
 * @author     Alcindo Schleder <alcindoschleder@gmail.com>
 * @host       localhost
 * @copyright  Vocatio Telecom <https://www.vocatiotelecom.com.br>
 *
 */

"use strict"

const ACONST = require('/opt/node/apis/commom/consts');
const fs = require('fs');
const ApiUtils = require('/opt/node/apis/commom/utils')
const ValidateToken = require('/opt/node/apis/commom/validateToken');
const httpHelper = require('/opt/node/apis/commom/helpers/callHttp');

const PRIVATE_KEY = fs.readFileSync('/etc/vktioapi/private.key', "utf8").toString("utf8");
const SECRET_PHRASE = ApiUtils.getPhrase(PRIVATE_KEY);

class BaseRoute {

    constructor () {
        this.accessToken = {
            token: null,
            table: null,
            api: null,
            route: null,
            method: null,
            privateKey: PRIVATE_KEY,
            secretPhrase: SECRET_PHRASE
        }
        this.apiData = {};
    };
    /**
     * Retorna todos os métodos da rota, menos os privados e construtores
     */
    static methods() {
        return Object.getOwnPropertyNames(this.prototype)
            .filter(method => method !== 'constructor' && !method.startsWith('_'))
    };
    /**
     * Chama uma exception em caso de erro na validação
     * 
     * @param {object} request 
     * @param {object} headers 
     * @param {string} error 
     */
    _failAction(request, headers, error) {
        throw error;
    };
    /**
     * Remove Propriedades nulas de um objeto json
     * 
     * @param {json Object} obj 
     */
    _removeNulls(obj) {
        Object.keys(obj).forEach((key) => (obj[key] === null) && delete obj[key]);
        return obj;
    };
    /**
     * Retorna a validade de um token
     * 
     * @param {string} token 
     * @param {string} method 
     */
    async _validateToken(token, method, validateUser = false) {
        this.accessToken.token = token;
        this.accessToken.method = method;
        const VT = new ValidateToken(this.accessToken);
        const result = await VT.validate(validateUser);
        if (result.status.sttCode !== 200) return ACONST.unauthorized(result.status.sttMsgs);

        // set result data
        this.apiData = result;
        return result;
    };
    /**
     * Retorna as opções da requisição http
     * 
     * @param {string} aPath 
     * @param {object} headers 
     */
    _getHttpOptions(aHost, auth = null) {
        const head = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            authorization: ((auth) ? auth : '')
        };
        return {
            method: ((aHost.method) ? aHost.method : "GET"),
            protocol: 'https:',
            host: 'localhost',
            port: aHost.port,
            path: aHost.path,
            headers: head
        };
    };
    /**
     * Retorna o resultado de uma requisição http
     * 
     * @param {string} host 
     * @param {object} auth 
     */
    _getHttpRequest(host, auth = null) {
        return new Promise(async (resolve, reject) => {
            const httpOpt = this._getHttpOptions(host, auth);
            try {
                const result = await httpHelper.getHttp(httpOpt);
                if (result.status.sttCode !== 200) return reject(result);
                return resolve(result);
            } catch (error) {
                return reject(ACONST.internalError(error));
            };
        });
    };
};
module.exports = BaseRoute;

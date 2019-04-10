/**
 * validateToken.js - Generic.
 *
 * Script que valida o token, valida o usuário, 
 * verifica se o usuário está bloqueado e o motivo do bloqueio e
 * gera estatísticas sobre o uso da API
 *
 * @version    1.0.0
 * @package    generic
 * @subpackage vktio-main
 * @author     Alcindo Schleder <alcindoschleder@gmail.com>
 * @host       localhost
 * @copyright  Vocatio Telecom <https://www.vocatiotelecom.com.br>
 *
 */

"use strict"

const ACONST = require('./consts');
const Jwt = require('jsonwebtoken');
const HttpHelper = require('./helpers/callHttp')

class UserValidation {
    constructor (accessToken) {
        this._apiData = ACONST.success('Validação Realizada com Sucesso!');
        this._token = accessToken;
        this._pk_users = null;
    }

    async validate(validateUser = false) {
        try {
            // 1) Validar Token
            let result = await this._validateToken();
            if (result.status.sttCode !== 200) return ACONST.unauthorized(result.status.sttMsgs);

            if (validateUser) {
                // 2) Verificar se o Usuário existe na base de dados e 
                result.data = await this._validateUser();
                if (result.status.sttCode !== 200) return ACONST.unauthorized(result.status.sttMsgs);
                this._apiData.userData = {
                    pk_users: data.data[0].pk_users,
                    userName: data.data[0].user_name,
                    email: data.data[0].email,
                    userLevel: data.data[0].flag_tuser
                }
                // 3) Verificar se o Usuário não está bloqueado (caso contrário busca o motivo do bloqueio)
            }
            // 4) Preenche os dados para retornar
            return this._apiData;
        } catch (error) {
            return ACONST.unauthorized(error);
        }
    };
    _validateToken() {
        return new Promise((resolve, reject) => {
            try {
                const accessToken = Jwt.verify(this._token.token, this._token.secretPhrase, {
                    algorithms: ['HS256'],
                });  
                const expireAt = accessToken.expireAt;
                const today = new Date;
                if (expireAt < today) return reject('Seu Token de Acesso Expirou!');
    
                const expDt = new Date(expireAt);
                const diffDays = Math.ceil(Math.abs(expDt.getTime() - today.getTime()) / (1000 * 3600 * 24));

                this._pk_users = accessToken.id;
                this._apiData.token = accessToken;
                this._apiData.data = {
                    pk_users: accessToken.id,
                    userName: accessToken.userName,
                    email: accessToken.email,
                    expireAt: diffDays,
                    expireDate: expDt.toLocaleString(),
                    userLevel: accessToken.userLevel
                }
                return resolve(ACONST.success('Validação do token realizada com sucesso!'));
            } catch (err) {
                return reject(err);
            }
        });
    }
    _httpOptions () {
        const head = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'authorization': this._token
        };
        return {
            method: "GET",
            host: 'https://localhost',
            headers: head,
            path: ACONST.authPath() + "/users?pk_users=" + this._pk_users,
            port: 12200,
        }
    };
    _validateUser () {
        return new Promise(async (resolve, reject) => {
            const httpOpt = this._httpOptions();
            try {
                const result = JSON.parse(await HttpHelper.getHttp(httpOpt));
                if (result.status.sttCode !== 200) return reject(result.status.sttMsgs);
                return resolve(result.data[0]);                
            } catch (error) {
                return reject(error);                
            }
        });
    }
};
module.exports = UserValidation;

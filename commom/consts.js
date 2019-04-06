/**
 * const.js - Generic.
 *
 * Script que define constantes genéricas de todo o sistema
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

class APIConstants {
    static success(msg) {
        return this.resultConst(200, msg);
    };
    static unauthorized(msg) {
        return this.resultConst(401, msg);
    };
    static notFound(msg) {
        return this.resultConst(404, msg);
    };
    static internalError(msg) {
        return this.resultConst(500, msg);
    };
    static resultConst(code, msg) {
        return {
            data: {},
            status: {
                sttCode: code,
                sttMsgs: msg
            }
        };
    };
    static analiticsPath () {
        return '/vktio-analitics/v0.3.7';
    };
    static authPath () {
        return '/vktio-auth/v0.1.4';
    };
    static dbPath () {
        return '/vktio-handleDB/v0.1.5';
    };
    static localInfoPath () {
        return '/vktio-localinfo/v2.0.0';
    };
};
module.exports = APIConstants;

// const USER = {
//     id: 1,
//     clientId: 0,
//     username: 'local',
//     password: '90Am10@Mgr'
// };

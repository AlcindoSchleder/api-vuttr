/**
 * resultHelpers - generate constans to Result.
 *
 * Retorna um padrão para os resultados das APIS
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

class dbResult {
    static getResultModel(msg) {
        return {
            data: {},
            status: {
                sttCode: 400,
                sttMsgs: msg
            }
        }
    }
};
module.exports = dbResult;
/**
 * context.js - Vocatio Commom.
 *
 * Script base para gerenciar as conexões com o Banco de Dados
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

const IDatabases = require('./interfaceDb');
const Result = require('../helpers/resultHelper');

class ContextStrategy extends IDatabases {

    constructor(database) {
        super();
        this._database = database;
        this._result = {};
    };

    isConnected() {
        return this._database.isConnected();
    };
    connect() {
        return this._database.connect();
    };
    async insert(item) {
        try {
            this._result = Result.getResultModel('Insert Registry');
            this._result.data = await this._database.insert(item);
            this._result.status = {
                sttCode: 200,
                sttMsgs: 'Registry Inserted Successfully!'
            };
        }
        catch (error) {
            this._result.status = {
                sttCode: 500,
                sttMsgs: 'Error Inserting Registry: ' + error
            };
        };
        return this._result;
    };
    async browse(item, skip, limit) {
        try {
            this._result = Result.getResultModel('List Registry');
            this._result.data = await this._database.browse(item, skip, limit);
            this._result.status = {
                sttCode: 200,
                sttMsgs: 'List of Registrations Successfully Completed!'
            };
        }
        catch (error) {
            this._result.status = {
                sttCode: 500,
                sttMsgs: 'Error Listing Records: ' + error
            };
        };
        return this._result;
    };
    async update(aWhere, item) {
        try {
            this._result = Result.getResultModel('Update Registry');
            this._result.data = await this._database.update(aWhere, item);
            this._result.status = {
                sttCode: 200,
                sttMsgs: `Registry Updated Successfully!`,
            };
        }
        catch (error) {
            this._result.status = {
                sttCode: 500,
                sttMsgs: 'Error Updating Registry: ' + error
            };
        };
        return this._result;
    };
    async delete(aWhere) {
        try {
            this._result = Result.getResultModel('Delete Registry');
            this._result.data = await this._database.delete(aWhere);
            this._result.status = {
                sttCode: 200,
                sttMsgs: `Registry Deleted Successfully!`
            };
        }
        catch (error) {
            this._result.status = {
                sttCode: 500,
                sttMsgs: 'Error Deleting Registry: ' + error
            };
        };
        return this._result;
    };
};
module.exports = ContextStrategy;

/**
 * mongoDbStrategy.js - testes/api.
 *
 * Tratamento do manipulador do mongodb
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

const ICrud = require('../base/interfaceDb')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando',
}
class MongoDB extends ICrud {
    // 3o
    constructor(connection, schema) {
        super()
        // 4o
        this._connection = connection;
        this._collection = schema;
    }
    // 2o
    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]

    }
     // 1o 
    static connect(DSN) {
        Mongoose.connect(DSN, {
            useNewUrlParser: true
        }, function (error) {
            if (!error) return;
            console.log('Falha na conexão!', error)
        });
        const connection = Mongoose.connection;
        connection.once('open', () => console.log('database rodando!!'));
        return connection;
    }

    async create(item) {
        return this._collection.create(item);
    }
    async read(item = {}, skip = 0, limit = 10) {
        return this._collection.find(item).skip(skip).limit(limit);
    }
    async update(id, item) {
        return this._collection.updateOne({_id: id}, { $set: item});
    }
    
    async delete(id) {
        return this._collection.deleteOne({_id: id});
    }
}

module.exports = MongoDB
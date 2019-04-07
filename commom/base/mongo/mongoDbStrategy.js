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

const IDatabases = require('../../base/interfaceDb')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando',
}
class MongoDB extends IDatabases {
    
    constructor(connection, schema) {
        super()
        this.tableName = schema.collection.name;
        this._connection = connection;
        this._collection = schema;
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]

    }

    static async defineModel(connection, schema) {
        return Mongoose.model(schema.options.collection, schema);
    };

    static connect(DSN) {
        Mongoose.connect(DSN, {
            useNewUrlParser: true
        }, function (error) {
            if (!error) return;
            throw Exception('Erro: Erro quando tentando se conectar ao servidor! -> ' + error);
        });
        const connection = Mongoose.connection;
        connection.once('open', () => {let data = 0});
        return connection;
    }

    /**
     * Public Methods
     */
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
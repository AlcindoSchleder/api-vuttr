/**
 * devicesSchema - localInfo API.
 *
 * Define as propriedades da tabela de Dispositvos instalados nos Totens
 * 
 * @version    2.0.0
 * @package    vktio-localinfo
 * @subpackage vktio-totem
 * @author     Alcindo Schleder <alcindoschleder@gmail.com>
 * @host       localhost
 * @copyright  Vocatio Telecom <https://www.vocatiotelecom.com.br>
 *
 */

'use strict';

const Mongoose = require('mongoose')

const ToolsSchema = new Mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            required: true
        }
    }, {
        collection: 'tools',
        timestamps: {
            createdAt: 'insert_date',
            updatedAt: 'update_date'
        }
    }
);
module.exports = ToolsSchema; //Mongoose.model('tools', ToolsSchema);

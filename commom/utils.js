/**
 * utils.js - Generic.
 *
 * Script que define funções genéricas de uso em todo o sistema
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

const Bcrypt = require('bcrypt');
const { promisify } = require('util');
const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare);
const SALT = 3;

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var days = 0;

    while (hours > 24) {
        days++;
        hours = hours - 24;
    };

    if (days    < 10) {days    = "0"+days;}
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return ((days === "00") ? hours+':'+minutes+':'+seconds : days + ' day(s) ' + hours+':'+minutes+':'+seconds);
}

class APIUtils {
    static checkObject (aObj) {
        return (!!aObj) && (aObj.constructor === Object);
    };
    static getLevel(userType) {
        switch (userType) {
            case 0:
                userType = 0x0015;
                break;
            case 1:
                userType = 0x0007;
                break;
            case 2:
                userType = 0x0007;
                break;
            case 3:
                userType = 0x0003;
                break;
            case 4:
                userType = 0x0005;
                break;
            default:
                userType = 0x0001;
                break;
        }
        return userType;
    };
    static getPhrase(PRIVATE_KEY) {
        let phrase = ''; 
        let pos = PRIVATE_KEY.toString().indexOf('\n');
        if (pos != -1) phrase = PRIVATE_KEY.substr(pos + 1);
        if (phrase) {
            phrase = phrase.split('\n'); 
            phrase.splice(-2, 2);
        };
        return phrase.toString().substring(1, phrase.toString().length -1);
    };
    static  mapRoutes (instance, methods) {
        return new Promise((resolve, reject) => {
            try {
                resolve(methods.map(method => instance[method]()));
            } catch (error) {
                reject(error);
            };
        });
    };
    static snakeCase(text) {
        return text.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase());
    }
    static lowerHeaders(headers) {
        const result = {};
        for (const [key, value] of Object.entries(headers)) {
            result[key.toLowerCase()] = value;
        }
        return result;
    }
    static hashPassword(pass) {
        return hashAsync(pass, SALT);
    };
    static comparePassword(pass, hash) {
        return compareAsync(pass, hash);
    };
    static genUniqueID (str) {
        const date = new Date();
        return hashAsync(str + date.toString(), SALT);
    };
    static getUptime (time) {
        return (time + "").toHHMMSS();
    }
    static genDSN(obj) {
        return obj.dialect + '://' + obj.user + ':' +  obj.pwd + '@' + obj.host + ':' + obj.port + '/' + obj.database;
    } 
};
module.exports = APIUtils;

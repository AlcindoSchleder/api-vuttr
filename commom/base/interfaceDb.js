/**
 * interfaceDB.js - Vocatio Commom.
 *
 * Script abstrato que descreve os métodos da classe base de manipulação de tabelas
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

class NotImplementedException extends Error {
    constructor() {
      super('Not Implemented Exception');
    }
}

class NoPermissionException extends Error {
    constructor() {
      super('No Permission Exception');
    }
}

class NotAuthorizedException extends Error {
    constructor(op) {
      super('You has not permission to ' + op);
    }
}
const FLAG_BROWSE = 0x0001;
const FLAG_INSERT = 0x0002;
const FLAG_UPDATE = 0x0004;
const FLAG_DELETE = 0x0008;

const ADMIN_PERM  = (FLAG_BROWSE + FLAG_INSERT + FLAG_UPDATE + FLAG_DELETE); // 0x0015
const CLIENT_PERM = (FLAG_BROWSE + FLAG_INSERT + FLAG_UPDATE); // 0x0007
const WRITE_PERM  = (FLAG_BROWSE + FLAG_INSERT); // 0x0003
const UPDATE_PERM = (FLAG_BROWSE + FLAG_UPDATE); // 0x0005
const READ_PERM   = FLAG_BROWSE; // 0x0001

const DSC_PERM = { 
    FLAG_BROWSE: 'Read',
    FLAG_INSERT: 'Insert',
    FLAG_UPDATE: 'Edit',
    FLAG_DELETE: 'Delete',
    ADMIN_PERM : 'Administrator',
    CLIENT_PERM: 'Client'
};

class DBOperations {
    getValidPermissions() {
        return new Array(
            ADMIN_PERM, 
            CLIENT_PERM, 
            WRITE_PERM, 
            UPDATE_PERM,
            READ_PERM
        );
    }
}

//interface
class IDatabases {
    /**
     * Contructor of class
     */
    constructor(tableName) {
        const Perm = new DBOperations();
        const Permissions = Perm.getValidPermissions();
        this.Permission = READ_PERM; // default Permission
        this.hasPerm = false;
        this._tableName = tableName;
        this._result = {};
    }
    /**
     * Getters 
     */
    get tableName() {
        return this._tableName;
    }
    get result() {
        return this._result;
    }
    /**
     * Setters 
     */
    set tableName(V) {
        this._tableName = V;
    }
    set result(V) {
        this._result = V;
    }
    /**
     * Verifica se o flag está presente nas permissões do usuário
     * @param {Int} testPerm 
     */
    canExec(testPerm) {
        this.hasPerm = ((this.Permission & testPerm) ? true : false);
        return this.hasPerm;
    }
    /**
     * Objeto Item contém os dados a serem inseridos na tabela
     * @param {Object} item 
     */
    insert(item) {
        this.canExec(FLAG_INSERT);
        if (!this.hasPerm) throw new NotAuthorizedException(DSC_PERM.FLAG_INSERT);
        throw new NotImplementedException();
    }
    /**
     * Faz uma pesquisa no banco de dados utilizando o objeto item como parametros da query
     * @param {Object} item 
     * @param {int} skip // inicia o resultado da busca depois de n registros
     * @param {int} limit // limita o resulta da busca em n registros
     */
    browse(item, skip, limit) {
        this.canExec(FLAG_BROWSE);
        if (!this.hasPerm) throw new NotAuthorizedException(DSC_PERM.FLAG_BROWSE);
        throw new NotImplementedException();
    }
    /**
     * Atualiza um registro no banco de dados ou vários registros dependeno do objeto aWhere.
     * Os campos a serem atualizados estão dentro do objeto item
     * @param {Object} aWhere 
     * @param {Object} item 
     */
    update(aWhere, item) {
        this.canExec(FLAG_UPDATE);
        if (!this.hasPerm) throw new NotAuthorizedException(DSC_PERM.FLAG_UPDATE);
        throw new NotImplementedException();
    }
    /**
     * Exclui um registro do banco de dados conforme a seleção feita no objeto aWhare.
     * @param {Object} aWhere 
     */
    delete(aWhere) {
        this.canExec(FLAG_DELETE);
        if (!this.hasPerm) throw new NotAuthorizedException(DSC_PERM.FLAG_DELETE);
        throw new NotImplementedException();
    }
    /**
     * Retorna true se o banco de dados está conectado
     */
    isConnected() {
        throw new NotImplementedException();
    }
    /**
     * Adiociona um conjunto de permissões para o usuário
     * @param {int} perm 
     */
    setPermission(perm) {
        if (!perm in this.Permissions) throw new NoPermissionException();
        this.Permission = perm;
    }
}
module.exports = IDatabases;

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
    constructor() {
        const Perm = new DBOperations();
        const Permissions = Perm.getValidPermissions();
        this.Permission = READ_PERM; // default Permission
        this.hasPerm = false;
    }
    canExec(testPerm) {
        this.hasPerm = ((this.Permission & testPerm) ? true : false);
        return this.hasPerm;
    }
    insert(item) {
        this.canExec(FLAG_INSERT);
        if (!this.hasPerm) throw new NotAuthorizedException(DSC_PERM.FLAG_INSERT);
        throw new NotImplementedException();
    }
    browse(item, skip, limit) {
        this.canExec(FLAG_BROWSE);
        if (!this.hasPerm) throw new NotAuthorizedException(DSC_PERM.FLAG_BROWSE);
        throw new NotImplementedException();
    }
    update(aWhere, item) {
        this.canExec(FLAG_UPDATE);
        if (!this.hasPerm) throw new NotAuthorizedException(DSC_PERM.FLAG_UPDATE);
        throw new NotImplementedException();
    }
    delete(aWhere) {
        this.canExec(FLAG_DELETE);
        if (!this.hasPerm) throw new NotAuthorizedException(DSC_PERM.FLAG_DELETE);
        throw new NotImplementedException();
    }
    isConnected() {
        throw new NotImplementedException();
    }
    setPermission(perm) {
        if (!perm in this.Permissions) throw new NoPermissionException();
        this.Permission = perm;
    }
}

module.exports = IDatabases;

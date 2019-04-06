const ACONST = require('../../commom/consts')
const APATH = ACONST.localInfoPath();
const TMP_ACCESS_TOKEN = 
    '-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJpZCI6MiwiaXNzdWVyIjoiVm9jYXRpbyBUZWxlY29tIiwidXNlck5hbWUiOiJBbGNpbmRvIFNjaGxlZGVyIiwiZW1haWwiOiJhbGNpbmRvQHZvY2F0aW90ZWxlY29tLmNvbS5iciIsImVtbWl0ZWRBdCI6MTU1MTM2MTEyMjIyMCwiZXhwaXJlQXQiOjE1NTM3ODAzMjIyMjAsInVzZXJMZXZlbCI6MjEsImlhdCI6MTU1MTM2MTEyMn0.' +
    '068VsiIDDXzGHNfRvFQO_tQ-DVryEJ7z-qpihL0KrG4';

const { equal, deepEqual, ok } = require('assert');
const api = require('../api');
let app = {};

const date_install = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

const MOCK_UPDATE = { 
    public_key: '90Am10Mgr',
    private_key: 'vktio',
    insert_date: date_install,
    update_date: date_install
};
const MOCK_ID_UPDATE = 2;
const MOCK_ID_DELETE = 3;
const MOCK_DEVICES = { 
    pk_devices: null,
    fk_countries: 55,
    fk_states: 'RS',
    fk_cities: 67040,
    dsc_cities: 'Bento Gonçalves',
    fk_registers: 1,
    dsc_reg: 'IceHot',
    hostname: 'totem0001.vocatio.com.br',
    ip_host: '192.168.101.100',
    dsc_device: 'Totem água raspberry pi3B+',
    addr_dev: 'Praça da Prefeitura',
    date_install: date_install,
    public_key: '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIBOAIBAAJATfbyFeMCP0Znto7Pl+lWVC2mlXyB1Mr+AdkjTCbR5kqGvkjo01ts\n' +
    'gYgArRr9r1ML76owZs+6TZh3MUb5zSltCQIDAQABAkA3IrujJM4zB0xTO32t1dM6\n' +
    'ZqpXLxz16rRlhDTFJvLr4+KxWN9bg03RWtWPfZ8UgmlLqgkpkq/hrtat8gUuiU4t\n' +
    'AiEAkPcDw3z8/Os6ug6cntmuA7fn4SBVGx3qCRjGblYCMUMCIQCJrmT5Y88/PzPy\n' +
    'AIZMkq4QblA0gqXaJerSk2iHFnSNwwIgIu+Etq3+gi1mX8R5tkabi0Xc2gJiwEA7\n' +
    'UKnp2Fld+eUCICdaPWo66QW+3u4Q0FIaqr3vieU4YodTxyahE4NpG69ZAiBWtt+F\n' +
    '6vF1e1g3sdzLjlSB4bltZ76NdI+lbFmPeFCnSw==\n' +
    '-----END RSA PRIVATE KEY-----',
    private_key: '-----BEGIN PUBLIC KEY-----\n' +
    'MFswDQYJKoZIhvcNAQEBBQADSgAwRwJATfbyFeMCP0Znto7Pl+lWVC2mlXyB1Mr+\n' +
    'AdkjTCbR5kqGvkjo01tsgYgArRr9r1ML76owZs+6TZh3MUb5zSltCQIDAQAB\n' +
    '-----END PUBLIC KEY-----',
    html_wether: '<br /><p></p><br />',
    device_path: 'http://localhost/videos'
};

var context = {}

var pkDevices = 0;

describe('Sqlite Devices Strategy -> Connection', function() {
    this.timeout(Infinity);
    before(async () => {      
        app = await api;
    });

    it('Listar Dispositivos', async () => {
        const result = await app.inject({
            method: 'GET',
            url: APATH + '/devices',
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        // console.log("*----------->> List Message: \n", data)

        deepEqual(statusCode, 200);
        ok(data.status.sttCode === 200);
    });

    it('Filtrar Dispositivos', async () => {
        const result = await app.inject({
            method: 'GET',
            url: APATH + '/devices?skip=0&limit=1&hostname=totem0001.vocatio.com.br',
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        // console.log("*----------->> Filter Message: \n", data.status.sttMsgs)

        deepEqual(statusCode, 200);
        ok(data.status.sttCode === 200);
    });

    it('Inserir dispositivos', async () => {
        const result = await app.inject({
            method: 'POST',
            url: APATH + '/devices',
            headers: {'authorization': TMP_ACCESS_TOKEN },
            payload: MOCK_DEVICES,
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        // pkDevices = data.data.pk_devices;
        // console.log("*----------->> Insert Message: \n", data)

        deepEqual(statusCode, 200);
        ok(data.status.sttCode === statusCode);
    });

    it('Atualizar devices', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: APATH + `/devices/${MOCK_ID_UPDATE}`,
            headers: {'authorization': TMP_ACCESS_TOKEN },
            payload: MOCK_UPDATE,
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        // console.log("*----------->> Update Message: \n", data)

        deepEqual(statusCode, 200);
        ok(data.status.sttCode === statusCode);
    });

    it('Deletar Devices', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: APATH + `/devices/${MOCK_ID_DELETE}`,
            headers: {'authorization': TMP_ACCESS_TOKEN },
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        // console.log("*----------->> Delete Message: \n", data)

        deepEqual(statusCode, 200);
        ok(data.status.sttCode === statusCode);
    });

});

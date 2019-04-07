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
    title: 'gitHub',
    link: 'https://github.com/AlcindoSchleder',
    description: 'Um site para que você possa criar seus repositórios públicos ou privados das suas aplicações.',
    tags: [
        'código',
        'repositório',
        'aplicativos',
        'apis',
        'clones'
    ]
};

var context = {}

var pkDevices = 0;

describe('Mongo Tools Strategy -> Connection', function() {
    this.timeout(Infinity);
    before(async () => {      
        app = await api;
    });

    it('Listar Ferramentas', async () => {
        const result = await app.inject({
            method: 'GET',
            url: APATH + '/tools',
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        // console.log("*----------->> List Message: \n", data)

        deepEqual(statusCode, 200);
        ok(data.status.sttCode === 200);
    });

    // it('Filtrar Dispositivos', async () => {
    //     const result = await app.inject({
    //         method: 'GET',
    //         url: APATH + '/devices?skip=0&limit=1&hostname=totem0001.vocatio.com.br',
    //     });

    //     const statusCode = result.statusCode;
    //     const data = JSON.parse(result.payload);
    //     // console.log("*----------->> Filter Message: \n", data.status.sttMsgs)

    //     deepEqual(statusCode, 200);
    //     ok(data.status.sttCode === 200);
    // });

    // it('Inserir dispositivos', async () => {
    //     const result = await app.inject({
    //         method: 'POST',
    //         url: APATH + '/devices',
    //         headers: {'authorization': TMP_ACCESS_TOKEN },
    //         payload: MOCK_DEVICES,
    //     });

    //     const statusCode = result.statusCode;
    //     const data = JSON.parse(result.payload);
    //     // pkDevices = data.data.pk_devices;
    //     // console.log("*----------->> Insert Message: \n", data)

    //     deepEqual(statusCode, 200);
    //     ok(data.status.sttCode === statusCode);
    // });

    // it('Atualizar devices', async () => {
    //     const result = await app.inject({
    //         method: 'PATCH',
    //         url: APATH + `/devices/${MOCK_ID_UPDATE}`,
    //         headers: {'authorization': TMP_ACCESS_TOKEN },
    //         payload: MOCK_UPDATE,
    //     });

    //     const statusCode = result.statusCode;
    //     const data = JSON.parse(result.payload);
    //     // console.log("*----------->> Update Message: \n", data)

    //     deepEqual(statusCode, 200);
    //     ok(data.status.sttCode === statusCode);
    // });

    // it('Deletar Devices', async () => {
    //     const result = await app.inject({
    //         method: 'DELETE',
    //         url: APATH + `/devices/${MOCK_ID_DELETE}`,
    //         headers: {'authorization': TMP_ACCESS_TOKEN },
    //     });

    //     const statusCode = result.statusCode;
    //     const data = JSON.parse(result.payload);
    //     // console.log("*----------->> Delete Message: \n", data)

    //     deepEqual(statusCode, 200);
    //     ok(data.status.sttCode === statusCode);
    // });

});

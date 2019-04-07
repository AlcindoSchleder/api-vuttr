const ACONST = require("../../commom/consts")
const APATH = "/apiVuttr/v1.0.0";
const TMP_ACCESS_TOKEN = 
    "-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJpZCI6MiwiaXNzdWVyIjoiVm9jYXRpbyBUZWxlY29tIiwidXNlck5hbWUiOiJBbGNpbmRvIFNjaGxlZGVyIiwiZW1haWwiOiJhbGNpbmRvQHZvY2F0aW90ZWxlY29tLmNvbS5iciIsImVtbWl0ZWRBdCI6MTU1MTM2MTEyMjIyMCwiZXhwaXJlQXQiOjE1NTM3ODAzMjIyMjAsInVzZXJMZXZlbCI6MjEsImlhdCI6MTU1MTM2MTEyMn0." +
    "068VsiIDDXzGHNfRvFQO_tQ-DVryEJ7z-qpihL0KrG4";

const { equal, deepEqual, ok } = require("assert");
const api = require("../api");
let app = {};

const date_install = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");

const MOCK_UPDATE = { 
    description: "Várias ferramentas de exemplo do Arquiteto de Soluções Alcindo Schleder",
    update_date: new Date()
};
const MOCK_ID_UPDATE = '5caa61fd56998d3723886872';
const MOCK_ID_DELETE = '5caa5d60e2553032bc77dab4';
const MOCK_TOOLS = { 
    title: "gitHub",
    link: "https://github.com",
    description: "Um site para que você possa criar seus repositorios publicos ou privados das suas aplicacoes.",
    tags: [
        "codigo",
        "repositorio",
        "aplicativos",
        "apis",
        "clones"
    ]
};

var context = {}

var id = 0;

describe("Mongo Tools Strategy -> Connection", function() {
    this.timeout(Infinity);
    before(async () => {      
        app = await api;
    });

    it("Listar Ferramentas", async () => {
        const result = await app.inject({
            method: "GET",
            url: APATH + "/tools",
            headers: {"authorization": TMP_ACCESS_TOKEN }
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        // console.log("*----------->> List Message: \n", data)

        deepEqual(statusCode, 200);
        ok(data.status.sttCode === 200);
    });

    it("Filtrar Dispositivos", async () => {
        const result = await app.inject({
            method: "GET",
            url: APATH + "/tools?skip=0&limit=1&title=gitHub",
            headers: {"authorization": TMP_ACCESS_TOKEN }
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        // console.log("*----------->> Filter Message: \n", data)

        deepEqual(statusCode, 200);
        ok(data.status.sttCode === 200);
    });

    it("Inserir dispositivos", async () => {
        const result = await app.inject({
            method: "POST",
            url: APATH + "/tools",
            headers: {"authorization": TMP_ACCESS_TOKEN },
            payload: MOCK_TOOLS,
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        // console.log("*----------->> Insert Message: \n", data)
        // id = data.data._id;

        deepEqual(statusCode, 200);
        ok(data.status.sttCode === statusCode);
    });

    it("Atualizar Ferramentas", async () => {
        const result = await app.inject({
            method: "PATCH",
            url: APATH + `/tools/${MOCK_ID_UPDATE}`,
            headers: {"authorization": TMP_ACCESS_TOKEN },
            payload: MOCK_UPDATE,
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        // console.log("*----------->> Update Message: \n", data)

        deepEqual(statusCode, 200);
        ok(data.status.sttCode === statusCode);
    });

    it("Deletar Devices", async () => {
        const result = await app.inject({
            method: "DELETE",
            url: APATH + `/tools/${MOCK_ID_DELETE}`,
            headers: {"authorization": TMP_ACCESS_TOKEN },
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        // console.log("*----------->> Delete Message: \n", data)

        deepEqual(statusCode, 200);
        ok(data.status.sttCode === statusCode);
    });

});

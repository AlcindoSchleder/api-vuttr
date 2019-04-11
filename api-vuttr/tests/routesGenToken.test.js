const APATH = "/apiVuttr/v1.0.0";

const { equal, deepEqual, ok } = require("assert");
const api = require("../api");
let app = {};

const date_install = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");

const MOCK_GEN = { 
    username: "ApiVuttr",
    password: "1234567890",
    userSigned: "Alcindo Schleder"
};

var context = {}

var id = 0;

describe.only("Generate AccessToken -> JWT", function() {
    this.timeout(Infinity);
    before(async () => {      
        app = await api;
    });

    it("Gerar Access Token", async () => {
        const result = await app.inject({
            method: "GET",
            url: APATH + "/get_user_token?username=ApiVuttr&password=1234567890&userSigned=Alcindo Schleder",
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
        console.log("*----------->> List Message: \n", data)

        deepEqual(statusCode, 200);
        ok(data.token);
    });

});

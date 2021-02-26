"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
// Routes
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const empresa_routes_1 = __importDefault(require("./routes/empresa.routes"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const trabajador_routes_1 = __importDefault(require("./routes/trabajador.routes"));
const gestion_routes_1 = __importDefault(require("./routes/gestion.routes"));
const contrasena_routes_1 = __importDefault(require("./routes/contrasena.routes"));
const cors_1 = __importDefault(require("cors"));
// middleware
const customMiddleware_1 = require("./jwt-simple/customMiddleware");
const util_1 = __importDefault(require("util"));
const readFile = util_1.default.promisify(fs_1.default.readFile);
class App {
    constructor(port) {
        this.port = port;
        this.key = fs_1.default.readFileSync('./security/key.pem');
        this.cert = fs_1.default.readFileSync('./security/cert.pem');
        this.express = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.express.set('port', this.port || process.env.PORT || 8443);
    }
    middlewares() {
        this.express.use(cors_1.default({
            allowedHeaders: ['X-JWT-Token', 'Content-Type', 'access-control-allow-headers', 'Content-length'],
            exposedHeaders: ['X-JWT-Token', 'X-Renewed-JWT-Token'],
            methods: ['POST', 'GET', 'DELETE', 'PUT']
        }));
        this.express.use(morgan_1.default('dev'));
        this.express.use(express_1.default.json());
    }
    routes() {
        this.express.use('/posts', customMiddleware_1.requireJwtMiddleware);
        this.express.use('/empresa', customMiddleware_1.requireJwtMiddleware);
        this.express.use('/usuario', customMiddleware_1.requireJwtMiddleware);
        this.express.use('/gestion', customMiddleware_1.requireJwtMiddleware);
        this.express.use('/trabajador', customMiddleware_1.requireJwtMiddleware);
        this.express.use(index_routes_1.default);
        this.express.use('/posts', post_routes_1.default);
        this.express.use('/contrasena', contrasena_routes_1.default);
        this.express.use('/empresa', empresa_routes_1.default);
        this.express.use('/usuario', usuario_routes_1.default);
        this.express.use('/gestion', gestion_routes_1.default);
        this.express.use('/trabajador', trabajador_routes_1.default);
    }
    listen() {
        const server = https_1.default.createServer({ key: this.key, cert: this.cert }, this.express).listen(this.express.get('port'));
    }
}
exports.App = App;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
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
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(cors_1.default({
            allowedHeaders: ['token', 'Content-Type', 'access-control-allow-headers', 'Content-length'],
            exposedHeaders: ['X-JWT-Token', 'X-Renewed-JWT-Token'],
            methods: ['POST', 'GET', 'DELETE', 'PUT']
        }));
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/posts', customMiddleware_1.requireJwtMiddleware);
        this.app.use('/empresa', customMiddleware_1.requireJwtMiddleware);
        this.app.use('/usuario', customMiddleware_1.requireJwtMiddleware);
        this.app.use('/gestion', customMiddleware_1.requireJwtMiddleware);
        this.app.use('/trabajador', customMiddleware_1.requireJwtMiddleware);
        this.app.use(index_routes_1.default);
        this.app.use('/posts', post_routes_1.default);
        this.app.use('/contrasena', contrasena_routes_1.default);
        this.app.use('/empresa', empresa_routes_1.default);
        this.app.use('/usuario', usuario_routes_1.default);
        this.app.use('/gestion', gestion_routes_1.default);
        this.app.use('/trabajador', trabajador_routes_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('Server on port', this.app.get('port'));
        });
    }
}
exports.App = App;

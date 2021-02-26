import express, { Application } from 'express'
import morgan from 'morgan'
import https, { Server } from 'https'
import fs from 'fs'

// Routes
import IndexRoutes from './routes/index.routes'
import PostRoutes from './routes/post.routes'
import EmpresaRoutes from './routes/empresa.routes'
import UsuarioRoutes from './routes/usuario.routes'
import TrabajadorRoutes from './routes/trabajador.routes'
import GestionRoutes from './routes/gestion.routes'
import ContrasenaRoutes from './routes/contrasena.routes'
import cors from 'cors'
// middleware
import { requireJwtMiddleware } from './jwt-simple/customMiddleware'
import util from 'util'
import { server } from 'typescript'
const readFile = util.promisify(fs.readFile);

export class App {
    app: https.Server | undefined;
    express: Application;
    key = fs.readFileSync('./security/key.pem');
    cert = fs.readFileSync('./security/cert.pem');


    constructor(
        private port?: number | string
    ) {
        this.express = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.express.set('port', this.port || process.env.PORT || 8443);
    }

    private middlewares() {
        this.express.use(cors({
            allowedHeaders: ['X-JWT-Token', 'Content-Type', 'access-control-allow-headers', 'Content-length'],
            exposedHeaders: ['X-JWT-Token', 'X-Renewed-JWT-Token'],
            methods: ['POST', 'GET', 'DELETE', 'PUT']
        }));
        this.express.use(morgan('dev'));
        this.express.use(express.json());
    }

    private routes() {
        this.express.use('/posts', requireJwtMiddleware);
        this.express.use('/empresa', requireJwtMiddleware);
        this.express.use('/usuario', requireJwtMiddleware);
        this.express.use('/gestion', requireJwtMiddleware);
        this.express.use('/trabajador', requireJwtMiddleware);
        this.express.use(IndexRoutes);
        this.express.use('/posts', PostRoutes);
        this.express.use('/contrasena', ContrasenaRoutes);
        this.express.use('/empresa', EmpresaRoutes);
        this.express.use('/usuario', UsuarioRoutes);
        this.express.use('/gestion', GestionRoutes);
        this.express.use('/trabajador', TrabajadorRoutes);
    }

    listen() {
        const server = https.createServer({key: this.key, cert: this.cert }, this.express).listen(this.express.get('port'));
        
        
    }

}




import express, { Application } from 'express'
import morgan from 'morgan'

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
import {requireJwtMiddleware} from './jwt-simple/customMiddleware'

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(cors({
            allowedHeaders: ['X-JWT-Token','Content-Type','access-control-allow-headers','Content-length'],
            exposedHeaders: ['X-JWT-Token','X-Renewed-JWT-Token'],
            methods:['POST','GET','DELETE','PUT']
        }));
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    private routes() {
        this.app.use('/posts',requireJwtMiddleware);
        this.app.use('/empresa', requireJwtMiddleware);
        this.app.use('/usuario', requireJwtMiddleware);
        this.app.use('/gestion', requireJwtMiddleware);
        this.app.use('/trabajador', requireJwtMiddleware);
        this.app.use(IndexRoutes);
        this.app.use('/posts', PostRoutes);
        this.app.use('/contrasena', ContrasenaRoutes);
        this.app.use('/empresa', EmpresaRoutes);
        this.app.use('/usuario', UsuarioRoutes);
        this.app.use('/gestion', GestionRoutes);
        this.app.use('/trabajador', TrabajadorRoutes);
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}
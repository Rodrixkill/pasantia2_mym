import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Trabajador } from '../interface/Trabajador'

export async function getTrabajadores(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT *  FROM trabajador');
        return res.json(posts[0]);
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function createTrabajador(req: Request, res: Response) {
    const newTrabajador: Trabajador = req.body;
    try {
        const conn = await connect();
        const results = await conn.query('INSERT INTO trabajador SET ? ', [newTrabajador]);
        res.json({
            message: results
        });
    }
    catch (e) {
        return res.json(e);
    }
}

export async function getTrabajador(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT *  FROM trabajador WHERE ci = ?', [id]);
        res.json(posts[0]);
    } catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function deleteTrabajador(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const conn = await connect();
        const results = await conn.query('DELETE FROM trabajador WHERE ci = ?', [id]);
        res.json({
            message: results
        });
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function updateTrabajador(req: Request, res: Response) {
    const id = req.params.id;
    const updateTrabajador: Trabajador = req.body;
    try {
        const conn = await connect();
        const results = await conn.query('UPDATE trabajador set ? WHERE ci = ?', [updateTrabajador, id]);
        res.json({
            message: results
        });
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function getTrabajadorByEmpresa(req: Request, res: Response) {
    const empresa = req.params.empresa;
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM trabajador WHERE empresa = ?', [empresa]);
        res.json(posts[0]);
    } catch (e) {
        console.log(e)
        return res.json(e);
    }
}
export async function getTrabajadorByGestion(req: Request, res: Response) {
    const empresa = req.params.empresa;
    const gestion = req.params.gestion;
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM trabajador INNER JOIN gestion ON trabajador.ci = gestion.ci WHERE trabajador.empresa = ? AND ( trabajador.ano_activo = ? OR gestion.gestion = ?)', [empresa,gestion,gestion]);
        res.json(posts[0]);
    } catch (e) {
        console.log(e)
        return res.json(e);
    }
}

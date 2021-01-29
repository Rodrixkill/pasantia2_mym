import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Usuario } from '../interface/Usuario'

export async function getUsuarios(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM usuario');
        return res.json(posts[0]);
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function createUsuario(req: Request, res: Response) {
    const newUsuario: Usuario = req.body;
    try {
        const conn = await connect();
        const results = await conn.query('INSERT INTO usuario SET ? ', [newUsuario]);
        res.json({
            message: results
        });
    }
    catch (e) {
        return res.json(e);
    }
}

export async function getUsuario(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM usuario WHERE ci = ?', [id]);
        res.json(posts[0]);
    } catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function deleteUsuario(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const conn = await connect();
        const results = await conn.query('DELETE FROM empresa WHERE ci = ?', [id]);
        res.json({
            message: results
        });
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function updateUsuario(req: Request, res: Response) {
    const id = req.params.id;
    const updateUsuario: Usuario = req.body;
    try {
        const conn = await connect();
        const results = await conn.query('UPDATE empresa set ? WHERE ci = ?', [updateUsuario, id]);
        res.json({
            message: results
        });
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}
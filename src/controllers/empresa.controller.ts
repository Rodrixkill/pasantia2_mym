import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Empresa } from '../interface/Empresa'

export async function getEmpresas(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM empresa');
        return res.json(posts[0]);
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function createEmpresa(req: Request, res: Response) {
    const newEmpresa: Empresa = req.body;
    try {
        const conn = await connect();
        const results = await conn.query('INSERT INTO empresa SET ? ', [newEmpresa]);
        res.json({
            message: results
        });
    }
    catch (e) {
        return res.json(e);
    }
}

export async function getEmpresa(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM empresa WHERE id = ?', [id]);
        res.json(posts[0]);
    } catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function deleteEmpresa(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const conn = await connect();
        const results2 = await conn.query('DELETE FROM gestion WHERE empresa = ?', [id]);
        const results3 = await conn.query('DELETE FROM trabajador WHERE empresa = ?', [id]);
        const results4 = await conn.query('DELETE FROM usuario WHERE empresa = ?', [id]);
        const results = await conn.query('DELETE FROM empresa WHERE id = ?', [id]);
        res.json({
            message: results
        });
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function updateEmpresa(req: Request, res: Response) {
    const id = req.params.id;
    const updatePost: Empresa = req.body;
    try {
        const conn = await connect();
        const results = await conn.query('UPDATE empresa set ? WHERE id = ?', [updatePost, id]);
        res.json({
            message: results
        });
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}
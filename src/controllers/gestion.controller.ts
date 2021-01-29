import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Gestion } from '../interface/Gestion'

export async function getGestiones(req: Request, res: Response): Promise<Response | void> {
    const empresa = req.body.empresa;
    const gestion = req.body.gestion;
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM gestion WHERE gestion = ? AND empresa = ?', [gestion,empresa]);
        return res.json(posts[0]);
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function createGestion(req: Request, res: Response) {
    const newEmpresa: Gestion = req.body;
    try {
        const conn = await connect();
        const results = await conn.query('INSERT INTO gestion SET ? ', [newEmpresa]);
        res.json({
            message: results
        });
    }
    catch (e) {
        return res.json(e);
    }
}

export async function getGestion(req: Request, res: Response) {
    const empresa = req.body.empresa;
    const gestion = req.body.gestion;
    const ci = req.body.ci;
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM gestion WHERE ci = ? AND gestion = ? AND empresa = ?', [ci,gestion,empresa]);
        res.json(posts[0]);
    } catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function deleteGestion(req: Request, res: Response) {
    const ci = req.body.ci;
    const gestion= req.body.gestion;
    try {
        const conn = await connect();
        const results = await conn.query('DELETE FROM gestion WHERE ci = ? AND gestion = ?', [ci,gestion]);
        res.json({
            message: results
        });
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}

export async function updateGestion(req: Request, res: Response) {
    const updateGestion: Gestion = req.body;
    try {
        const conn = await connect();
        const results = await conn.query('UPDATE gestion set ? WHERE ci = ? AND gestion = ?', [updateGestion, updateGestion.ci,updateGestion.gestion]);
        res.json({
            message: results
        });
    }
    catch (e) {
        console.log(e)
        return res.json(e);
    }
}
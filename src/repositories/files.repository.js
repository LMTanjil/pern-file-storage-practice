import pool from '../config/db.js'

export const insertFile = async (filename,url,public_id,size) => {
    const result = await pool.query(
        `INSERT INTO files(filename, url, public_id, size) 
        VALUES ($1,$2,$3,$4) RETURNING *`,
        [filename,url,public_id,size],
    );
    return result.rows[0];
}

export const getAllFiles = async () => {
    const result = await pool.query(
        `SELECT * FROM files WHERE deleted_at IS NULL ORDER BY uploaded_at DESC`,
    );
    return result.rows;
}

export const getFileById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM files WHERE id= $1 AND deleted_at IS NULL`,
    )
    return result.rows[0];
}
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
        [id]
    )
    return result.rows[0];
}

export const softDelete = async (id) => {
    const result = await pool.query(
        `UPDATE files
         SET deleted_at = NOW()
         WHERE id = $1
           AND deleted_at IS NULL RETURNING *`,
        [id]
    )
    return result.rows[0];
}
export const restoreFile = async (id) => {
    const result = await pool.query(
        `UPDATE files SET deleted_at = NULL WHERE id = $1 AND deleted_at IS NOT NULL RETURNING *`,
        [id]
    )
    console.log('Restore query result:', result.rows);
    return result.rows[0];
}
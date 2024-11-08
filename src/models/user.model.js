import db from '../database.js';

export const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        db.get(query, [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};

export const createUser  = (user) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO users (full_name, email, password, role_id)
            VALUES (?, ?, ?, ?)
        `;
        const params = [user.full_name, user.email, user.password, user.role_id];
        db.run(query, params, function (err) {
            if (err) {
                return reject(err);
            }
            resolve(this.lastID);
        });
    });
};

export const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE id = ?`;
        db.get(query, [id], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};
import sqlite3 from 'sqlite3';

const dbName = 'database.db';

const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        console.error("Error al conectar a la base de datos", err.message);
    } else {
        console.log("Conectado a la base de datos SQLite.");
    }
});

// Crear la tabla de usuarios si no existe
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role_id TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
        )
    `);

    
    // Crear el trigger para actualizar solo `updated_at`
    db.run(`
        CREATE TRIGGER IF NOT EXISTS update_timestamp
        AFTER UPDATE ON users
        FOR EACH ROW
        BEGIN
            UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END
    `);
    
    

    // Crear la tabla de roles si no existe
    db.run(`
        CREATE TABLE IF NOT EXISTS roles (
            id TEXT NOT NULL,
            name TEXT NOT NULL,
            permissions TEXT NOT NULL
        )
    `);

    // Verificar si la tabla de roles está vacía antes de insertar
    db.get("SELECT COUNT(*) AS count FROM roles", (err, row) => {
        if (err) {
            console.error("Error al verificar la tabla roles", err.message);
        } else if (row.count === 0) {
            db.run(`
                INSERT INTO roles (id, name, permissions) 
                VALUES ('S01', 'Supervisor', 'sup'), ('A01', 'Auditor', 'audi'), ('C02', 'Ciudadano', 'ciu')
            `, (insertErr) => {
                if (insertErr) {
                    console.error("Error al insertar roles", insertErr.message);
                } else {
                    console.log("Roles insertados correctamente.");
                }
            });
        } else {
            console.log("La tabla de roles ya tiene datos.");
        }
    });

});

export default db;
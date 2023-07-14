import dotenv from "dotenv";
dotenv.config();
import mongoose, { Connection } from "mongoose";

let _db: Connection;

const initDb = (callback: (err: Error | null, db?: Connection) => void): void => {
    if (_db) {
        return callback(null, _db);
    }
    mongoose
        .connect(process.env.MONGODB_URI as string)
        .then((client) => {
            _db = client.connection;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = (): Connection => {
    if (!_db) {
        throw Error("Db not initialized");
    }
    return _db;
};

const closeDb = (): void => {
    if (_db) {
        _db.close();
        console.log("Database connection closed successfully.");
    }
};

export { initDb, getDb, closeDb };

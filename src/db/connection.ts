import dotenv from "dotenv";
dotenv.config();
import mongoose, { Connection } from "mongoose";

let _db: Connection | undefined;

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

const closeDb = () => {
    if (_db) {
        mongoose
            .disconnect()
            .then(() => {
                _db = undefined;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const getDb = (): Connection => {
    if (!_db) {
        throw Error("Db not initialized");
    }
    return _db;
};

export { initDb, getDb, closeDb };

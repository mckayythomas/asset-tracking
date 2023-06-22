import dotenv from "dotenv" ;
dotenv.config() ;
import { MongoClient, Db } from "mongodb" ;

let _db: Db ;

const initDb = ( callback: ( err: Error | null, db?: Db ) => void ): void => {
    if ( _db ) {
        return callback( null, _db ) ;
    } ;
    MongoClient.connect( process.env.MONGODB_URI as string )
        .then( ( client ) => {
            _db = client.db() ;
            callback( null, _db ) ;
        } )
        .catch( ( err ) => {
            callback( err ) ;
        } ) ;
} ;

const getDb = (): Db => {
    if ( !_db ) {
        throw Error( "Db not initialized" ) ;
    } ;
    return _db ;
} ;

export { initDb, getDb } ;
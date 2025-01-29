import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

let sqliteConnection;
let db;

export const initSQLite = async () => {
  try {
    if (!sqliteConnection) {
      sqliteConnection = new SQLiteConnection(CapacitorSQLite);
    }

    if (!db) {
      db = await sqliteConnection.createConnection('myDatabase', false, 'no-encryption', 1);
      await db.open();
      console.log('✅ Base de datos inicializada');
    } else {
      console.log('⚠️ La conexión ya existe, reutilizándola.');
    }

    return db;
  } catch (error) {
    console.error('❌ Error al inicializar SQLite:', error);
  }
};

<script setup>
import { CapacitorSQLite } from '@capacitor-community/sqlite';

const dbSetup = async () => {
  const db = await CapacitorSQLite.createConnection({
    database: 'mydb',
    version: 1,
  });

  await db.open();
  await db.execute(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT);`);
  await db.run(`INSERT INTO users (name) VALUES ('Juan Pérez');`);
  const result = await db.query('SELECT * FROM users;');

  console.log(result.values);
};

dbSetup();
</script>

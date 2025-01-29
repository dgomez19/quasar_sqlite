<script setup>
import { onMounted, ref } from 'vue';

import { initSQLite } from 'boot/sqlite';

const users = ref([]);

const name = ref(null);

const dialog = ref(false);

const openUser = () => {
  dialog.value = true;
}

const createUser = async () => {
  if (!name.value) {
    return false;
  }

  const db = await initSQLite();

  // Insertar un usuario
  await db.run(`INSERT INTO users (name) VALUES (?)`, [name.value]);
  await getUsers();
  dialog.value = false;
}

const getUsers = async () => {
  const db = await initSQLite();

  // Leer los usuarios
  const result = await db.query(`SELECT * FROM users`);
  users.value = result.values;
}

onMounted(async () => {
  const db = await initSQLite();

  // Crear una tabla de ejemplo
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
    );
  `);

  getUsers()
});
</script>

<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-pa-md">
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-center" id="id">ID</th>
                <th class="text-center" id="id">NOMBRE</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(row, idx) in users" :key="idx">
                <td class="text-center">{{row.id}}</td>
                <td class="text-center">{{row.name}}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div> <br> <br>

    <div class="row">
      <div class="col-12 col-md-12">
        <q-btn label="CREAR USUARIO" @click="openUser" icon="add" color="positive" />
      </div>
    </div>

    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 1500px; max-width: 80vw">
        <q-linear-progress :value="10" color="blue" />

        <q-card-section class="row items-center">
          <div class="text-h6">CREAR USUARIO</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-md-12">
              <q-input
                white
                color="blue"
                dense
                v-model="name"
                label="Nombres *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'El campo es obligatorio',
                ]"
              />
            </div>

            <div class="col-md-6">
              <q-btn unelevated rounded icon="add" color="positive" @click="createUser" label="GUARDAR USUARIO"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

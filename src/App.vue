<script setup>
import { ref, onMounted } from "vue";

import api from "./services/api";

import EmployeeForm from "./components/EmployeeForm.vue";
import EmployeeList from "./components/EmployeeList.vue";

const employees = ref([]);

const selectedEmployee = ref(null);

const search = ref("");

const sortBy = ref("name");

const order = ref("asc");

const loading = ref(false);

const error = ref("");

async function loadEmployees() {

  try {

    loading.value = true;

    const response = await api.get("/employees", {
      params: {
        q: search.value,
        sortBy: sortBy.value,
        order: order.value
      }
    });

    employees.value = response.data;

  } catch (err) {

    error.value = err;

  } finally {

    loading.value = false;
  }
}


async function saveEmployee(data) {

  try {

    if (selectedEmployee.value) {

      await api.put(
        `/employees/${selectedEmployee.value.id}`,
        data
      );

    } else {

      await api.post("/employees", data);
    }

    selectedEmployee.value = null;

    loadEmployees();

  } catch (err) {

    error.value = err;
  }
}


function editEmployee(emp) {

  selectedEmployee.value = { ...emp };
}


async function deleteEmployee(id) {

  const confirmed = confirm(
    "Delete employee?"
  );

  if (!confirmed) return;

  try {

    await api.delete(`/employees/${id}`);

    loadEmployees();

  } catch (err) {

    error.value = err;
  }
}

onMounted(loadEmployees);
</script>

<template>

  <div class="container">

    <h1>
      Employee Directory
    </h1>

    <div
      v-if="loading"
      class="loading"
    >
      Loading employees...
    </div>

    <div
      v-if="error"
      class="error"
    >
      {{ error }}
    </div>

    <div class="card">

      <div class="toolbar">

        <input
          v-model="search"
          placeholder="Search employee..."
        >

        <select v-model="sortBy">
          <option value="name">Name</option>
          <option value="hireDate">Hire Date</option>
          <option value="salary">Salary</option>
        </select>

        <select v-model="order">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button @click="loadEmployees">
          Search
        </button>

      </div>

    </div>

    <div class="card">

      <EmployeeForm
        :employee="selectedEmployee"
        @save="saveEmployee"
      />

    </div>

    <div class="card">

      <EmployeeList
        :employees="employees"
        @edit="editEmployee"
        @delete="deleteEmployee"
      />

    </div>

  </div>

</template>
<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  employee: Object
});

const emit = defineEmits(["save"]);

const form = reactive({
  empId: "",
  name: "",
  email: "",
  department: "",
  position: "",
  hireDate: "",
  salary: null,
  active: true
});

const errors = reactive({});

watch(() => props.employee, (newVal) => {

  if (newVal) {
    Object.assign(form, newVal);
  }

}, { immediate: true });

function validate() {

  errors.empId =
    /^EMP[0-9]{3,5}$/.test(form.empId)
    ? ""
    : "Invalid Employee ID";

  errors.name =
    form.name.length >= 3
    ? ""
    : "Name must be at least 3 characters";

  errors.email =
    /\S+@\S+\.\S+/.test(form.email)
    ? ""
    : "Invalid email";

  errors.department =
    form.department
    ? ""
    : "Department required";

  errors.position =
    form.position
    ? ""
    : "Position required";

  errors.hireDate =
    new Date(form.hireDate) <= new Date()
    ? ""
    : "Future date not allowed";

  errors.salary =
    form.salary >= 1500 &&
    form.salary <= 50000
    ? ""
    : "Salary must be between RM1500 and RM50000";

  return Object.values(errors).every(v => !v);
}

function submitForm() {

  if (!validate()) return;

  emit("save", { ...form });
}
</script>

<template>

  <div>

    <h2>Add / Edit Employee</h2>

    <div class="form-grid">

      <div>
        <input v-model.trim="form.empId" placeholder="Employee ID">
        <p class="error">{{ errors.empId }}</p>
      </div>

      <div>
        <input v-model.trim="form.name" placeholder="Name">
        <p class="error">{{ errors.name }}</p>
      </div>

      <div>
        <input v-model.trim="form.email" placeholder="Email">
        <p class="error">{{ errors.email }}</p>
      </div>

      <div>
        <select v-model="form.department">
          <option value="">Department</option>
          <option>IT</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Marketing</option>
          <option>Operations</option>
        </select>

        <p class="error">{{ errors.department }}</p>
      </div>

      <div>
        <input v-model.trim="form.position" placeholder="Position">
        <p class="error">{{ errors.position }}</p>
      </div>

      <div>
        <input type="date" v-model="form.hireDate">
        <p class="error">{{ errors.hireDate }}</p>
      </div>

      <div>
        <input
          type="number"
          v-model.number="form.salary"
          placeholder="Salary"
        >

        <p class="error">{{ errors.salary }}</p>
      </div>

    </div>

    <br>

    <label>
      <input type="checkbox" v-model="form.active">
      Active Employee
    </label>

    <br><br>

    <button @click="submitForm">
      Save Employee
    </button>

  </div>

</template>
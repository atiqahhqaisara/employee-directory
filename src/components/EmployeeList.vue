<script setup>

defineProps({
  employees: Array
});

const emit = defineEmits([
  "edit",
  "delete"
]);

function formatSalary(value) {

  return new Intl.NumberFormat(
    "ms-MY",
    {
      style: "currency",
      currency: "MYR"
    }
  ).format(value);
}
</script>

<template>

  <table border="1" width="100%">

    <thead>
      <tr>
        <th>Emp ID</th>
        <th>Name</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>

      <tr
        v-for="emp in employees"
        :key="emp.id"
      >

        <td>{{ emp.empId }}</td>
        <td>{{ emp.name }}</td>
        <td>{{ emp.department }}</td>

        <td>
          {{ formatSalary(emp.salary) }}
        </td>

        <td>
          <span
  v-if="emp.active"
  class="active-badge"
>
  Active
</span>

<span
  v-else
  class="inactive-badge"
>
  Inactive
</span>
        </td>

        <td>

          <button @click="$emit('edit', emp)">
            Edit
          </button>

          <button @click="$emit('delete', emp.id)">
            Delete
          </button>

        </td>

      </tr>

    </tbody>

  </table>

</template>
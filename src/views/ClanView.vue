<template>
  <div class="error-message">
    <p>Временно не работает</p>
  </div>
</template>

<script>
export default {
  name: 'TemporarilyUnavailable',
};
</script>

<style scoped>
.error-message {
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin: 20px auto;
  width: fit-content;
}
</style>

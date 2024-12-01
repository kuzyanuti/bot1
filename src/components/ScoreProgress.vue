<template>
  <div class="progress">
    <h4 class="progress-level">
      <span>{{ store.levelName }}</span>
    </h4>
    <div class="progress-container">
      <div class="progress-value" :style="{ width: store.progress + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { useScoreStore } from '@/stores/score'

const store = useScoreStore()
</script>

<style scoped>
.progress {
  width: 100%;
  margin: 20px 0;
}

.progress-level {
  text-align: center;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.progress-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 25px;
  overflow: hidden;
}

.progress-value {
  height: 25px;
  background-color: #76c7c0;
  width: 0;
  border-radius: 25px;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
}
</style>

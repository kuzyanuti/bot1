<template>
  <div class="text-content">
    <h1>Your tasks</h1>
    <h3 v-if="tasks.length === 0">No tasks available</h3>
    <ul class="list">
      <li class="list-item" v-for="(task, index) in tasks" :key="index">
        {{ task.title }}
        <span>
          <button @click="openCustomLink(task.link)" class="list-btn">
            {{ task.linkText }}
          </button>
        </span>
        <span>
          <button @click="completeTask(index)" class="complete-btn">
            {{ task.reward }}
          </button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScoreStore } from '@/stores/score'

const scoreStore = useScoreStore()

// Пример заданий
const tasks = ref([
  {
    title: 'чзх арбуз комфортики',
    link: 'https://t.me/+EqvioTozL3s1MjI6',
    linkText: '>',
    completed: false,
    reward: 100, // Сумма монет за выполнение задания
  },
  {
    title: 'Task 2',
    link: 'https://example.com/task2',
    linkText: '>',
    completed: false,
    reward: 200, // Сумма монет за выполнение задания
  },
  {
    title: 'Task 3',
    link: 'https://example.com/task3',
    linkText: '>',
    completed: false,
    reward: 300, // Сумма монет за выполнение задания
  },
])

function openCustomLink(link) {
  window.open(link, '_blank')
}

function completeTask(index) {
  const task = tasks.value[index]
  if (!task.completed) {
    task.completed = true
    scoreStore.add(task.reward)
  }
}
</script>

<style scoped>
.text-content {
  padding: 20px;
  background-color: #2A2A2A;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h3 {
  font-size: 18px;
  margin-bottom: 20px;
}

.list {
  list-style-type: none;
  padding: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #444;
}

.list-item:last-child {
  border-bottom: none;
}

.list-btn {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  margin-right: 10px;
}

.list-btn.done {
  background-color: #28a745;
}

.complete-btn {
  background-color: #ffc107;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  border: none;
}
</style>

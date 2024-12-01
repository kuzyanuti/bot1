<template>
  <main class="game" v-if="loaded">
    <div class="page">
      <RouterView />
    </div>
    <TheMenu />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheMenu from './components/TheMenu.vue'
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useTelegram } from '@/services/telegram'

const loaded = ref(false)
const app = useAppStore()

const { tg } = useTelegram()

const urlParams = new URLSearchParams(window.location.search)

app.init(urlParams.get('ref')).then(() => {
  loaded.value = true
})

onMounted(() => {
  tg.ready()
  tg.expand()
})
</script>

<style>
/* Общие стили */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #1B1B1B;
  color: #fff;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(176.47deg, #222427 17.47%, #1B1B1B 30.76%, #242424 42.37%, #474747 74.29%);
  border-radius: 40px 40px 0px 0px;
}

.page {
  width: 100%;
  max-width: 440px;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  background-color: #2A2A2A;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>

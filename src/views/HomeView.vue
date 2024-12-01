<template>
  <div class="home-view">
    <div class="info-buttons">
      <button class="info-button left-button" @click="showClickValue">
        {{ store.clickValue }}
      </button>
      <button class="info-button right-button" @click="showHourlyIncome">
        {{ store.autoIncome }}
      </button>
    </div>
    <div class="game-container">
      <ScoreProgress />
      <div class="header">
        <img src="../assets/coin.png" alt="coin" />
        <h2 class="score" id="score">{{ store.score }}</h2>
      </div>
      <div class="circle">
        <img @click="increment" ref="img" id="circle" :src="imgSrc" />
      </div>
      <div class="upgrade-section">
        <button @click="openUpgradeTab" class="upgrade-button">Boost</button>
      </div>
      <div class="click-limit">
        <p>Clicks Remaining: {{ store.clickLimit - store.clickCount }} / {{ store.clickLimit }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ScoreProgress from '@/components/ScoreProgress.vue'
import { useScoreStore } from '@/stores/score'
import frog from '@/assets/frog.png'
import lizard from '@/assets/lizard.png'
import { useRouter } from 'vue-router'

const img = ref(null)
const imgSrc = computed(() => (store.score > 25 ? lizard : frog))

const store = useScoreStore()
const router = useRouter()

onMounted(() => {
  store.loadState()
  store.startClickRestore()
  store.startAutoIncome()
})

onUnmounted(() => {
  store.stopClickRestore()
  store.stopAutoIncome()
})

function increment(event) {
  store.incrementClick()
  const rect = event.target.getBoundingClientRect()

  const offsetX = event.clientX - rect.left - rect.width / 2
  const offsetY = event.clientY - rect.top - rect.height / 2

  const DEG = 40

  const tiltX = (offsetY / rect.height) * DEG
  const tiltY = (offsetX / rect.width) * -DEG

  const plusOne = document.createElement('div')
  plusOne.classList.add('plus-one')
  plusOne.textContent = `+${store.clickValue}`
  plusOne.style.left = `${event.clientX - rect.left}px`
  plusOne.style.top = `${event.clientY - rect.top}px`

  img.value.parentElement.appendChild(plusOne)

  setTimeout(() => plusOne.remove(), 2000)
}

function openUpgradeTab() {
  router.push('/upgrades')
}

function showClickValue() {
  alert(`You earn ${store.clickValue} per click.`)
}

function showHourlyIncome() {
  alert(`Your hourly income is ${store.autoIncome}.`)
}
</script>

<style scoped>
.home-view {
  position: relative;
}

.info-buttons {
  position: absolute;
  top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.info-button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4e4d52;
  color: #fff;
  border: none;
  border-radius: 20px;
  transition: background-color 0.3s;
}

.info-button:hover {
  background-color: #fff;
  color: #4e4d52;
}

.left-button {
  left: 10px;
}

.right-button {
  right: 10px;
}

.upgrade-section {
  text-align: center;
  margin-top: 20px;
}

.upgrade-button {
  position: absolute;
  width: auto;
  height: 24px;
  left: 306px;
  top: 773px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
}

.upgrade-button::before {
  content: '🚀';
  margin-right: 8px;
  font-size: 24px;
}

.click-limit {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #fff;
}
</style>

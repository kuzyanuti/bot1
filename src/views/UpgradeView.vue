<template>
  <div class="upgrade-container">
    <h2>Upgrades</h2>
    <div class="upgrade-item">
      <button @click="upgradeClickValue" :disabled="store.score < store.clickUpgradeCost" class="upgrade-button">
        🫵
      </button>
      <div class="upgrade-text">
        <p>Multitap</p>
        <p class="cost-text">
          <img src="../assets/free-icon-dollar-3611780.png" alt="coin" class="coin-icon" />
          {{ store.clickUpgradeCost }} - 
          {{ store.clickLimit / 500 }} <span class="lvl-text">lvl</span>
        </p>
      </div>
    </div>
    <div class="upgrade-item">
      <button @click="upgradeClickLimit" :disabled="store.score < store.limitUpgradeCost" class="upgrade-button">
        🔋
      </button>
      <div class="upgrade-text">
        <p>Energy limit</p>
        <p class="cost-text">
          <img src="../assets/free-icon-dollar-3611780.png" alt="coin" class="coin-icon" />
          {{ store.limitUpgradeCost }} -
          {{ store.clickLimit / 500 }} <span class="lvl-text">lvl</span>
        </p>
      </div>
    </div>
    <div class="upgrade-item">
      <button @click="upgradeClickRestoreSpeed" :disabled="store.score < store.clickRestoreUpgradeCost" class="upgrade-button">
        ⏳
      </button>
      <div class="upgrade-text">
        <p>Recharging speed</p>
        <p class="cost-text">
          <img src="../assets/free-icon-dollar-3611780.png" alt="coin" class="coin-icon" />
          {{ store.clickRestoreUpgradeCost }} -
          {{ store.clickRestoreLevel }} <span class="lvl-text">lvl</span>
        </p>
        <p>Speed: {{ 1000 / store.clickRestoreSpeed }} clicks/sec</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScoreStore } from '@/stores/score'

const store = useScoreStore()

function upgradeClickValue() {
  store.upgradeClickValue()
}

function upgradeClickLimit() {
  store.upgradeClickLimit()
}

function upgradeClickRestoreSpeed() {
  store.upgradeClickRestoreSpeed()
}
</script>

<style scoped>
.upgrade-container {
  position: absolute;
  width: 400px;
  height: 650px;
  left: 20px;
  top: 153px;
  background-color: #2a292e;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.upgrade-container h2 {
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
}

.upgrade-item {
  position: relative;
  width: 236px;
  height: 50px;
  margin-bottom: 70px;
  display: flex;
  align-items: center;
}

.upgrade-button {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0;
  top: 0;
  background-color: #4e4d52;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upgrade-button:hover {
  background-color: #fff;
  color: #4e4d52;
}

.upgrade-button:disabled {
  background-color: #888;
  cursor: not-allowed;
}

.upgrade-text {
  margin-left: 60px;
  color: #fff;
}

.cost-text {
  display: flex;
  align-items: center;
}

.coin-icon {
  width: 25px;
  height: 25px;
  margin-right: 8px;
}

.lvl-text {
  margin-left: 8px;
}
</style>

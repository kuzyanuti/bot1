<template>
  <div class="shop-view">
    <div class="info-buttons">
      <button class="info-button left-button" @click="showClickValue">
        {{ store.clickValue }}
      </button>
      <button class="info-button right-button" @click="showHourlyIncome">
        {{ store.autoIncome }}
      </button>
    </div>
    <div class="score-container">
      <img src="../assets/coin.png" alt="coin" />
      <h2 class="score">{{ store.score }}</h2>
    </div>
    <div class="upgrade-container">
      <h2>Auto Income Upgrade</h2>
      <div class="upgrade-item">
        <button @click="upgradeAutoIncome" :disabled="store.score < store.autoIncomeUpgradeCost" class="upgrade-button">
          💸
        </button>
        <div class="upgrade-text">
          <p>Auto Income</p>
          <p class="cost-text">
            <img src="../assets/free-icon-dollar-3611780.png" alt="coin" class="coin-icon" />
            {{ store.autoIncomeUpgradeCost }} -
            {{ store.autoIncomeLevel }} <span class="lvl-text">lvl</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScoreStore } from '@/stores/score'

const store = useScoreStore()

function upgradeAutoIncome() {
  store.upgradeAutoIncome()
}

function showClickValue() {
  alert(`You earn ${store.clickValue} per click.`)
}

function showHourlyIncome() {
  alert(`Your hourly income is ${store.autoIncome}.`)
}
</script>

<style scoped>
.shop-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2a292e;
}

.info-buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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

.score-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.score-container img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.score {
  color: #fff;
  font-size: 36px;
  font-weight: 800;
  user-select: none;
}

.upgrade-container {
  background-color: #2a292e;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.upgrade-container h2 {
  color: #fff;
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

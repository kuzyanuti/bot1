import { defineStore } from 'pinia'
import debounce from 'lodash.debounce'
import { updateScore } from '@/api/app'

const debouncedUpdateScore = debounce(updateScore, 500)

const baseLevelScore = 25
const levels = new Array(15)
    .fill(0)
    .map((_, i) => baseLevelScore * Math.pow(2, i))

const levelScores = levels.map((_, level) => {
    let sum = 0
    for (let [index, value] of levels.entries()) {
        if (index >= level) {
            return sum + value
        }
        sum += value
    }
    return sum
})

function computeLevelByScore(score) {
    for (let [index, value] of levelScores.entries()) {
        if (score <= value) {
            return {
                level: index,
                value: levels[index],
            }
        }
    }
}

export const useScoreStore = defineStore('score', {
    state: () => ({
        score: 0,
        progressScore: 0,
        clickValue: 1,
        clickLimit: 2000,
        clickCount: 0,
        lastClickTime: Date.now(),
        lastClickTimestamp: 0,
        clickUpgradeCost: 100,
        limitUpgradeCost: 500,
        clickRestoreSpeed: 1000,
        clickRestoreUpgradeCost: 1000,
        clickRestoreLevel: 1,
        clickRestoreInterval: null,
        autoIncome: 0, // Новое состояние для автоматического заработка
        autoIncomeUpgradeCost: 1000, // Стоимость улучшения автоматического заработка
        autoIncomeLevel: 1, // Уровень улучшения автоматического заработка
    }),
    getters: {
        level: (state) => computeLevelByScore(state.progressScore),
        currentScore(state) {
            if (this.level.level === 0) {
                return state.progressScore
            }
            return state.progressScore - levelScores[this.level.level - 1]
        },
        canClick(state) {
            const now = Date.now()
            const timePassed = now - state.lastClickTime
            const clicksRestored = Math.floor(timePassed / state.clickRestoreSpeed)
            state.clickCount = Math.max(0, state.clickCount - clicksRestored)
            state.lastClickTime = now
            return state.clickCount < state.clickLimit
        },
        progress(state) {
            const currentLevel = this.level.level
            const currentLevelScore = levelScores[currentLevel]
            const previousLevelScore = currentLevel > 0 ? levelScores[currentLevel - 1] : 0
            const scoreInCurrentLevel = state.progressScore - previousLevelScore
            return (100 * scoreInCurrentLevel) / (currentLevelScore - previousLevelScore)
        },
        levelName(state) {
            const levels = [
                { min: 0, max: 10000, name: 'Бронза' },
                { min: 10000, max: 50000, name: 'Серебро' },
                { min: 50000, max: 100000, name: 'Золото' },
                { min: 100000, max: 250000, name: 'Платина' },
                { min: 250000, max: 500000, name: '2-я Платина' },
                { min: 500000, max: 1000000, name: 'Алмаз' },
                { min: 1000000, max: 2000000, name: 'Платина 2' },
            ]
            const level = levels.find(level => state.score >= level.min && state.score < level.max)
            return level ? level.name : 'Неизвестный уровень'
        },
    },
    actions: {
        add(score = 1) {
            this.score += score
            this.progressScore += score
            debouncedUpdateScore(this.score)
        },
        setScore(score) {
            this.score = score
        },
        incrementClick() {
            const now = Date.now()
            if (now - this.lastClickTimestamp < 50) {
                return
            }
            if (this.canClick) {
                this.score += this.clickValue
                this.progressScore += this.clickValue
                this.clickCount += this.clickValue
                this.lastClickTimestamp = now
                debouncedUpdateScore(this.score)
                this.saveState()
            }
        },
        upgradeClickValue() {
            if (this.score >= this.clickUpgradeCost) {
                this.score -= this.clickUpgradeCost
                this.clickValue++
                    this.clickUpgradeCost *= 2
                debouncedUpdateScore(this.score)
                this.saveState()
            }
        },
        upgradeClickLimit() {
            if (this.score >= this.limitUpgradeCost) {
                this.score -= this.limitUpgradeCost
                this.clickLimit += 500
                this.limitUpgradeCost *= 2
                debouncedUpdateScore(this.score)
                this.saveState()
            }
        },
        upgradeClickRestoreSpeed() {
            if (this.score >= this.clickRestoreUpgradeCost) {
                this.score -= this.clickRestoreUpgradeCost
                this.clickRestoreSpeed = Math.max(100, this.clickRestoreSpeed - 100)
                this.clickRestoreUpgradeCost *= 2
                this.clickRestoreLevel++
                    debouncedUpdateScore(this.score)
                this.saveState()
                this.restartClickRestore()
            }
        },
        upgradeAutoIncome() {
            if (this.score >= this.autoIncomeUpgradeCost) {
                this.score -= this.autoIncomeUpgradeCost
                this.autoIncome += 10
                this.autoIncomeUpgradeCost *= 2
                this.autoIncomeLevel++
                    debouncedUpdateScore(this.score)
                this.saveState()
            }
        },
        saveState() {
            localStorage.setItem('clickValue', this.clickValue)
            localStorage.setItem('clickLimit', this.clickLimit)
            localStorage.setItem('clickCount', this.clickCount)
            localStorage.setItem('lastClickTime', this.lastClickTime)
            localStorage.setItem('lastClickTimestamp', this.lastClickTimestamp)
            localStorage.setItem('clickUpgradeCost', this.clickUpgradeCost)
            localStorage.setItem('limitUpgradeCost', this.limitUpgradeCost)
            localStorage.setItem('progressScore', this.progressScore)
            localStorage.setItem('clickRestoreSpeed', this.clickRestoreSpeed)
            localStorage.setItem('clickRestoreUpgradeCost', this.clickRestoreUpgradeCost)
            localStorage.setItem('clickRestoreLevel', this.clickRestoreLevel)
            localStorage.setItem('autoIncome', this.autoIncome)
            localStorage.setItem('autoIncomeUpgradeCost', this.autoIncomeUpgradeCost)
            localStorage.setItem('autoIncomeLevel', this.autoIncomeLevel)
        },
        loadState() {
            this.clickValue = parseInt(localStorage.getItem('clickValue')) || 1
            this.clickLimit = parseInt(localStorage.getItem('clickLimit')) || 2000
            this.clickCount = parseInt(localStorage.getItem('clickCount')) || 0
            this.lastClickTime = parseInt(localStorage.getItem('lastClickTime')) || Date.now()
            this.lastClickTimestamp = parseInt(localStorage.getItem('lastClickTimestamp')) || 0
            this.clickUpgradeCost = parseInt(localStorage.getItem('clickUpgradeCost')) || 100
            this.limitUpgradeCost = parseInt(localStorage.getItem('limitUpgradeCost')) || 500
            this.progressScore = parseInt(localStorage.getItem('progressScore')) || 0
            this.clickRestoreSpeed = parseInt(localStorage.getItem('clickRestoreSpeed')) || 1000
            this.clickRestoreUpgradeCost = parseInt(localStorage.getItem('clickRestoreUpgradeCost')) || 1000
            this.clickRestoreLevel = parseInt(localStorage.getItem('clickRestoreLevel')) || 1
            this.autoIncome = parseInt(localStorage.getItem('autoIncome')) || 0
            this.autoIncomeUpgradeCost = parseInt(localStorage.getItem('autoIncomeUpgradeCost')) || 1000
            this.autoIncomeLevel = parseInt(localStorage.getItem('autoIncomeLevel')) || 1
        },
        startClickRestore() {
            if (this.clickRestoreInterval) {
                clearInterval(this.clickRestoreInterval)
            }
            this.clickRestoreInterval = setInterval(() => {
                if (this.clickCount > 0) {
                    this.clickCount--
                        this.saveState()
                }
            }, this.clickRestoreSpeed)
        },
        stopClickRestore() {
            if (this.clickRestoreInterval) {
                clearInterval(this.clickRestoreInterval)
                this.clickRestoreInterval = null
            }
        },
        restartClickRestore() {
            this.stopClickRestore()
            this.startClickRestore()
        },
        startAutoIncome() {
            if (this.autoIncomeInterval) {
                clearInterval(this.autoIncomeInterval)
            }
            this.autoIncomeInterval = setInterval(() => {
                    this.score += this.autoIncome
                    this.progressScore += this.autoIncome
                    debouncedUpdateScore(this.score)
                    this.saveState()
                }, 3600000) // 1 час
        },
        stopAutoIncome() {
            if (this.autoIncomeInterval) {
                clearInterval(this.autoIncomeInterval)
                this.autoIncomeInterval = null
            }
        },
        restartAutoIncome() {
            this.stopAutoIncome()
            this.startAutoIncome()
        },
    },
})
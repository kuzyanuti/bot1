<template>
  <div class="text-content">
    <h1>Your Friends</h1>

    <div class="center">
      <button class="referal" @click="copy">{{ referalText }}</button>
    </div>

    <p>If your friend joins, you and your friend will each receive 5000 coins.</p>
    <p>If your friend has Telegram Premium, you and your friend will each receive 25000 coins.</p>

    <h3 v-if="friends.length === 0">No friends yet</h3>

    <ul class="list">
      <li class="list-item" v-for="friend in friends" :key="friend.id">
        {{ friend.name }}
        <span class="list-btn done">{{ friend.reward }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTelegram } from '@/services/telegram'
import { useAppStore } from '@/stores/app'
import { ref, computed } from 'vue'

const app = useAppStore()
const { user } = useTelegram()

const referalText = ref('Your referal')

// Пример друзей
const friends = computed(() =>
  Object.keys(app.user.friends).map((id) => ({
    id,
    name: app.user.friends[id],
    reward: app.user.friends[id].isPremium ? 25000 : 5000, // Награда в зависимости от наличия Telegram Premium
  }))
)

function copy() {
  navigator.clipboard.writeText(
    'https://t.me/MonkeyKoin_bot?start=' + user?.id
  )
  referalText.value = 'Copied!'
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

.center {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.referal {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

p {
  font-size: 16px;
  margin-bottom: 10px;
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
  background-color: #28a745;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
}
</style>

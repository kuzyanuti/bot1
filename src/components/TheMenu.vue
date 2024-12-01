<template>
  <div class="menu">
    <RouterLink to="/" custom v-slot="{ isActive, navigate }">
      <div
        class="menu-button"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      >
        <img src="@/assets/free-icon-font-growth-chart-invest.png" alt="Stock market" class="menu-icon" />
        <span class="menu-label">Stock market</span>
      </div>
    </RouterLink>
    <RouterLink to="/shop" custom v-slot="{ isActive, navigate }">
      <div
        class="menu-button"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      >
        <img src="@/assets/free-icon-font-seller-store.png" alt="Shop" class="menu-icon" />
        <span class="menu-label">Shop</span>
      </div>
    </RouterLink>
    <RouterLink to="/shield" custom v-slot="{ isActive, navigate }">
      <div
        class="menu-button"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      >
        <img src="@/assets/shield.png" alt="Shield" class="menu-icon" />
        <span class="menu-label">Clans</span>
      </div>
    </RouterLink>
    <RouterLink to="/tasks" custom v-slot="{ isActive, navigate }">
      <div
        class="menu-button"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      >
        <img src="@/assets/free-icon-font-book-bookmark.png" alt="Tasks" class="menu-icon" />
        <span class="menu-label">Tasks</span>
      </div>
    </RouterLink>
    <RouterLink to="/friends" custom v-slot="{ isActive, navigate }">
      <div
        class="menu-button"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      >
        <img src="@/assets/free-icon-font-users-alt.png" alt="Friends" class="menu-icon" />
        <span class="menu-label">Friends</span>
      </div>
    </RouterLink>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.menu {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-around;
  background-color: #303030;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.menu-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-button.active {
  background: #383838;
  border-radius: 20px;
}

.menu-icon {
  width: 24px;
  height: 24px;
}

.menu-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  color: #FFFFFF;
  margin-top: 5px;
}

.menu-button:not(.active) .menu-label {
  color: #848484;
}

.menu-button + .menu-button::before {
  content: '';
  position: absolute;
  width: 1px;
  height: 50px;
  background: #505050;
  border-radius: 24px;
  left: -2px;
  top: 5px;
}
</style>

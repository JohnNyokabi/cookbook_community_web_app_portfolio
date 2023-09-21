<template>
  <nav>
    <div class="container">
      <router-link to="/" class="logo">Cook-Book</router-link>
      <router-link to="/recipe" class="recipe">Recipe</router-link>
      <div class="profile">
        <router-link to="/UserProfile">Profile</router-link>
      </div>
      <div class="menu">
        <router-link to="/about" class="menu-item">About</router-link>
      </div>
      <div class="user">
        <router-link v-if="!user" to="/Login">Login</router-link>
        <router-link v-if="!user" to="/SignUp">Sign Up</router-link>
        <a v-if="user" href="javascript:void(0)" @click="handleClick">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  
  methods: {
    handleClick() {
      localStorage.removeItem('token');
      this.$store.dispatch('user', null);
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>
nav {
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.logo {
  font-size: 24px;
  font-weight: bold;
  color: #1808fc;
  text-decoration: none;
}

.menu {
  display: flex;
  gap: 20px;
}

.menu-item {
  color: #555;
  text-decoration: none;
  transition: color 0.3s;
}

.menu-item:hover {
  color: #888;
}
.user {
  display: flex;
  gap: 10px;
}

.menu-item ul {
  display: none;
}

.menu-item:hover ul {
  display: block;
}
</style>
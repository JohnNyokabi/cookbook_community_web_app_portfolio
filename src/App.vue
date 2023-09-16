<template>
  <Nav />
  <router-view />
  <Footer />
</template>

<script>
import Nav from './components/Nav.vue'
import axios from 'axios'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  },

  async created() {
    const res = await axios.get('user');

    this.$store.dispatch('user',res.data);
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

body {
  /*background-color: #030e1b;*/
  background: url("./assets/images/wallpaperflare.com_wallpaper (3).jpg") no-repeat center / cover;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #999999 #f5f5f5;
}
a {
  color: #2aeb74;
  text-decoration: none;
}
button {
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;

  background-color: #2aeb74;
  font-size: 1.125rem;
  color: #030e1b;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-top: 10px;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  width: 100%;
  height: 100%;
}

.auth-inner {
  width: 350px;
  height: 450px;
  margin: auto;
  background: url("./assets/images/Beautiful HD Wallpapers Free Laptop Free Wallpapers.jpg") no-repeat center / cover;
  box-shadow: 8px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}

.form-group {
  position: relative;
  width: 100%;
  height: 100%;
}

.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  color: magenta;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #0af545;
  margin: 0;
}

h1, h2, h3, h4, h5, h6, label, span {
  font-weight: 600;
  font-family: 'Fira Sans', sans-serif;
}

label {
  color: #f5f5f5;
  justify-content: center;
  display: flex;
  margin: 5px;
}

input {
  width: 100%;
  height: 25px;
  background-color: antiquewhite;
  justify-content: center;
  margin: auto;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.search-box {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 50%;
  padding: 15px;
   
  color: #ee0be3;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.993);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgb(255, 255, 255);
  border-radius: 16px 0px 16px 0px;
}
</style>

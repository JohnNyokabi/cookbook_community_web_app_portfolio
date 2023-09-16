<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit">
        <error v-if="error" :error="error"/>
        <h3>Login to Cook Book Community</h3>

        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="Email" required />
          <div v-if="!isEmailValid" class="error-message">Invalid email address.</div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="password" required />
          <div v-if="!isPasswordValid" class="error-message">Password must be at least 8 characters.</div>
        </div>

        <button>Login</button>

        <p class="forgot-password text-right">
          <RouterLink to="forgotPassword">Forgot Password?</RouterLink>
        </p>
      </form>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
import Error from '../Error.vue'

export default {
  name: 'LoginPage',
  components: {
    Error
  },
  data () {
    return {
      email: '',
      password: '',
      error: '',
      isEmailValid: true,
      isPasswordValid: true
    }
  },

  methods: {
    async handleSubmit() {
      this.isEmailValid = this.isValidEmail(this.email);
      this.isPasswordValid = this.isValidPassword(this.password);

      if (!this.isEmailValid || !this.isPasswordValid) {
        return;
      }

      try {
        const res = await axios.post('login', {
          email: this.email,
          password: this.password
        });

        localStorage.setItem('token', res.data.token);
        console.log('My most boring token generated during login: ', res.data.token);
        this.$store.dispatch('user', res.data.user);
        this.$router.push('/');
      }catch (e) {
        this.error = 'Invalid username/password!'
      }
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    isValidPassword(password) {
      return password.length >= 8;
    }
  }
}
</script>
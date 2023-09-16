<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit">
        <error v-if="error" :error="error"/>
        <h3>Sign up to Cook Book Community</h3>
        <div class="form-group">
          <label>First Name</label>
          <input type="text" class="form-control" v-model="firstName" placeholder="First Name" required>
        </div>

        <div class="form-group">
          <label>Last Name</label>
          <input type="text" class="form-control" v-model="lastName" placeholder="Last Name" required>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="Email" required>
          <div v-if="!isEmailValid" class="error-message">Invalid email address.</div>
        </div>
              
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password" required>
          <div v-if="!isPasswordValid" class="error-message">Password must be at least 8 characters.</div>
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input type="password" class="form-control" v-model="confirmPassword" placeholder="Confirm Password" required>
        </div>

        <div v-if="passwordsMatchError" class="alert alert-danger" role="alert">
          Passwords do not match.
        </div>

        <button>Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Error from '../Error.vue';

export default {
  name: 'signupPage',
  components: {
    Error
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordsMatchError: false,
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

      // Check if passwords match
      if (this.password !== this.confirmPassword) {
        this.passwordsMatchError = true;
        return;
      }

      try {
        await axios.post('http://localhost:5000/signup', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        });

        alert("Sign up successful");

        this.$router.push('/login');
      } catch (e) {
        // Handle sign-up error
        this.error = 'Error occured!'
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
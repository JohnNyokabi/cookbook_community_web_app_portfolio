<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit">
        <h3>Reset Password</h3>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password"/>
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input type="password" class="form-control" v-model="confirmPassword" placeholder="Confirm Password"/>
        </div>

        <button class="btn btn-primary btn-block">Submit</button>
      </form>
    </div>
  </div>
  
</template>
<script>
import axios from 'axios'

export default {
  name: 'ResetPassword',
  data() {
    return {
      password: '',
      confirmPassword: ''
    }
  },

  methods: {
    async handleSubmit() {
      const res = await axios.post('reset', {
        password: this.password,
        confirmPassword: this.confirmPassword,
        token: this.$route.params.token
      });

      console.log(res);
      this.$router.push('/login');
    }
  }
}
</script>

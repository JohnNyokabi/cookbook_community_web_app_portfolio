<template>
  <div class="user-profile">
    <h2>User Profile</h2>
    <div v-if="!editMode" class="user-info">
      <p>Name: {{ user.firstName }} {{ user.lastName }}</p>
      <p>Email: {{ user.email }}</p>
      <img v-if="user.profilePicture" :src="user.profilePicture" alt="Profile Picture" />
      <button @click="toggleEditMode" class="edit-button">Edit</button>
    </div>

    <div v-else>
      <form @submit.prevent="updateUserProfile" class="edit-form">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="editedUser.firstName" />
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="editedUser.lastName" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="editedUser.email" />
        </div>
        <div>
          <label for="profilePicture">Profile Picture:</label>
          <input type="file" id="profilePicture" @change="handleFileUpload" />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {},
      editedUser: {
        firstName: '',
        lastName: '',
        email: '',
        profilePicture: null,
      },
      editMode: false,
    };
  },
  methods: {
    async fetchUserData() {
      const response = await axios.get('/api/user');
      console.log('User Data:', response.data);
      this.user = response.data;
    },
    
    toggleEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        this.editedUser = { ...this.user };
      }
    },
    async handleFileUpload(event) {
      this.editedUser.profilePicture = event.target.files[0];
    },
    async updateUserProfile() {
      const formData = new FormData();
      formData.append('firstName', this.editedUser.firstName);
      formData.append('lastName', this.editedUser.lastName);
      formData.append('email', this.editedUser.email);
      formData.append('profilePicture', this.editedUser.profilePicture);

      try {
        const response = await axios.put('/api/user', formData);
        this.user = response.data;
        this.editMode = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: cyan;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.user-info p {
  margin: 10px 0;
}

.user-info img {
  max-width: 200px;
  border-radius: 50%;
  margin: 20px 0;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: #0056b3;
}

.edit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-form label {
  font-weight: bold;
  margin-top: 10px;
  color: black;
}

.edit-form input[type="text"],
.edit-form input[type="email"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.edit-form input[type="file"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  font-size: 16px;
}

.save-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #1e7e34;
}
</style>
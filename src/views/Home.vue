<template>
  <div class="home">
    <h1>Welcome to Our Recipe Sharing Platform</h1>

    <!-- Recommended or Trending Recipes Section -->
    <section class="recommended-recipes">
      <h2>Recommended Recipes</h2>
      <div class="recipe-list">
        <!-- Display recommended or trending recipes here -->
        <div class="recipe-card" v-for="recipe in recommendedRecipes" :key="recipe.id">
          <img :src="recipe.imageUrl" alt="Recipe Image" />
          <h3>{{ recipe.title }}</h3>
          <p>{{ recipe.description }}</p>
          <router-link :to="`/recipe/${recipe.id}`">View Recipe</router-link>
        </div>
      </div>
    </section>

    <!-- Featured Recipes or User Posts Section -->
    <section class="featured-recipes">
      <h2>Featured Recipes</h2>
      <div class="recipe-list">
        <!-- Display featured recipes or user posts here -->
        <div class="recipe-card" v-for="recipe in featuredRecipes" :key="recipe.id">
          <img :src="recipe.imageUrl" alt="Recipe Image" />
          <h3>{{ recipe.title }}</h3>
          <p>{{ recipe.description }}</p>
          <router-link :to="`/recipe/${recipe.id}`">View Recipe</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {

  name: 'HomePage',

  data() {
    return {
      recommendedRecipes: [],
      featuredRecipes: [],
    };
  },
  // You can fetch data and populate the above arrays in the "mounted" hook
  mounted() {
    // Example: Fetch recommended recipes from an API
    // Replace with your actual API call
    this.fetchRecommendedRecipes();

    // Example: Fetch featured recipes or user posts from an API
    // Replace with your actual API call
    this.fetchFeaturedRecipes();
  },
  methods: {
    fetchRecommendedRecipes() {
      // Make an API request to get recommended or trending recipes
      // Update this.recommendedRecipes with the received data
    },
    fetchFeaturedRecipes() {
      // Make an API request to get featured recipes or user posts
      // Update this.featuredRecipes with the received data
    },
  },
};
</script>

<style scoped>
/* General Styles */
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: antiquewhite;
}

/* Header Styles */
h1 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
}

/* Section Styles */
section {
  margin-bottom: 40px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

/* Recipe Card Styles */
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.recipe-card {
  width: calc(33.33% - 20px); /* Adjust as needed for responsiveness */
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.recipe-card img {
  max-width: 100%;
  height: auto;
  border-radius: 5px 5px 0 0;
}

.recipe-card h3 {
  font-size: 18px;
  padding: 10px;
}

.recipe-card p {
  font-size: 14px;
  padding: 0 10px 10px;
}

.recipe-card a {
  display: block;
  padding: 10px;
  text-align: center;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 0 0 5px 5px;
  transition: background-color 0.3s ease-in-out;
}

.recipe-card a:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  /* Adjust layout for smaller screens */
  .recipe-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 576px) {
  /* Further adjust layout for mobile screens */
  .recipe-card {
    width: 100%;
  }
}
</style>

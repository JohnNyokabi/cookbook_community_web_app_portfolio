<template>
  <div class="recipe">
    <router-link to="/">&lt; Back</router-link>
    <h1>{{ recipe ? recipe.title : 'Loading...' }}</h1>
    <p class="desc">{{ recipe ? recipe.description : 'Loading...' }}</p>
    <hr />
    <div class="ingredients" v-if="recipe && recipe.ingredients">
      <h3>Ingredients</h3>
      <ul>
        <li v-for="(ingredient, i) in recipe.ingredients" :key="i">
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <div class="method" v-if="recipe && recipe.method">
      <h3>Method</h3>
      <ol>
        <li v-for="(step, i) in recipe.method" :key="i">
          <span v-html="cleanText(step)"></span>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>

export default {
	name: 'RecipeCard',

	computed: {
		recipe () {
			const id = this.$route.params.id;
			console.log('Route parameter ID:', id);
			return this.$store.state.recipes.find(recipe => recipe._id === id);
		}
	},
	methods: {
		cleanText (text) {
			return text.replace(/\n/g, '<br />')
		}
	}
}
</script>

<style scoped>
.recipe {
	padding: 1rem;
	max-width: 768px;
	margin: 0 auto;
	color: aliceblue;
}

.desc {
	font-size: 1.125rem;
	line-height: 1.4;
	margin-bottom: 1rem;
}

hr {
	margin-bottom: 1rem;
}

h3 {
	margin-bottom: 1rem;
}

.ingredients {
	padding: 1rem;
	background-color: #081c33;
	border-radius: 0.5rem;
	margin-bottom: 2rem;
}

.ingredients ul li {
	list-style-position: inside;
	line-height: 1.4;
	margin-bottom: 1rem;
}

.method ol li {
	margin-bottom: 2rem;
	padding-bottom: 1rem;
	list-style-position: inside;
	border-bottom: 1px solid #EEE;
}
</style>
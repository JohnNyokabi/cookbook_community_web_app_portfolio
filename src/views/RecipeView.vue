<template>
  <div class="home">
    <div class="search-box">
      <input 
        type="text" 
        class="search-bar" 
        placeholder="Search recipe by name or ingredient"
        v-model="searchQuery"
      />
    </div>
    <h1>Available Recipes</h1>
    <button @click="togglePopup">Add new Recipe</button>

    <div class="recipes">
      <div class="card" v-for="recipe in filteredRecipes" :key="recipe._id">
        <h2>{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
        <router-link :to="`/recipe/${recipe._id}`">
          <span class="btn" id="btn1">View</span>
        </router-link>
        <span class="btn" id="btn2" @click="editRecipe(recipe)">Edit</span>
        <span class="btn" id="btn3" @click="deleteRecipe(recipe._id)">Delete</span>
      </div>
    </div>

    <div class="add-recipe-popup" v-if="popupOpen">
      <div class="popup-content">
        <h2>Add new Recipe</h2>

        <form @submit.prevent="addNewRecipe">
          <div class="group">
            <label>Title</label>
            <input type="text" v-model="newRecipe.title" />
          </div>

          <div class="group">
            <label>Description</label>
            <textarea v-model="newRecipe.description"></textarea>
          </div>

          <div class="group">
            <label>Ingredients</label>
            <div class="ingredient" v-for="i in newRecipe.ingredientRows" :key="i">
              <input type="text" v-model="newRecipe.ingredients[i - 1]" />
            </div>
            <button type="button" @click="addNewIngredient">Add Ingredient</button>
          </div>

          <div class="group">
            <label>Method</label>
            <div class="method" v-for="i in newRecipe.methodRows" :key="i">
              <textarea v-model="newRecipe.method[i - 1]"></textarea>
            </div>
            <button type="button" @click="addNewStep">Add Step</button>
          </div>

          <button type="submit">Add Recipe</button>
          <button type="button" @click="togglePopup">Close</button>
        </form>
      </div>
    
    </div>

    <div class="edit-recipe-popup" v-if="editPopupOpen">
      <div class="popup-content">
        <h2>Edit Recipe</h2>

        <form @submit.prevent="saveEditedRecipe">
          <div class="group">
            <label>Title</label>
            <input type="text" v-model="editedRecipe.title" />
          </div>

          <div class="group">
            <label>Description</label>
            <textarea v-model="editedRecipe.description"></textarea>
          </div>

          <div class="group">
            <label>Ingredients</label>
            <div class="ingredient" v-for="(ingredient, index) in editedRecipe.ingredients" :key="index">
              <input type="text" v-model="editedRecipe.ingredients[index]" />
            </div>
            <button type="button" @click="editNewIngredient">Add Ingredient</button>
          </div>

          <div class="group">
            <label>Method</label>
            <div class="method" v-for="(step, index) in editedRecipe.method" :key="index">
              <textarea v-model="editedRecipe.method[index]"></textarea>
            </div>
            <button type="button" @click="editNewStep">Add Step</button>
          </div>

          <button type="submit">Save Changes</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted,computed } from 'vue';
import { useStore } from 'vuex';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'RecipeView',

  computed: {
    ...mapGetters(['user'])
  },

  setup () {
    const store = useStore();

    const newRecipe = ref({
      title: '',
      description: '',
      ingredients: [],
      method: [],
      ingredientRows: 1,
      methodRows: 1
    });

    const editedRecipe = ref({
      title: '',
      description: '',
      ingredients: [],
      method: [],
      ingredientRows: 1,
      methodRows: 1,
    });

    const popupOpen = ref(false);
    const editPopupOpen = ref(false);
    const searchQuery = ref('');

    const filteredRecipes = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return store.state.recipes.filter((recipe) => {
        return (
          recipe.title.toLowerCase().includes(query) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(query)
          )
        );
      });
    });

    const togglePopup = () => {
      popupOpen.value = !popupOpen.value;
    };

    const toggleEditPopup = () => {
      editPopupOpen.value = !editPopupOpen.value;
    };

    const addNewIngredient = () => {
      newRecipe.value.ingredientRows++;
    };

    const addNewStep = () => {
      newRecipe.value.methodRows++;
    };

    const editRecipe = async (recipe) => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/${recipe._id}`);
        editedRecipe.value = response.data;
        toggleEditPopup();
      } catch (error) {
        console.error(error);
      }
    };

    const editNewIngredient = () => {
      editedRecipe.value.ingredients.push('');
    };

    const editNewStep = () => {
      editedRecipe.value.method.push('');
    };

    const saveEditedRecipe = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:5000/recipes/${editedRecipe.value._id}`,
          editedRecipe.value
        );

        const updatedRecipe = response.data;
        const index = store.state.recipes.findIndex((r) => r._id === updatedRecipe._id);

        if (index !== -1) {
          store.commit('UPDATE_RECIPE', { index, updatedRecipe });
        }

        toggleEditPopup();
      } catch (error) {
        console.error(error);
      }
    };

    const cancelEdit = () => {
      toggleEditPopup();
    };

    const deleteRecipe = async (id) => { 
      if (confirm("Are you sure you want to delete this recipe?")) {
        try {
          await axios.delete(`http://localhost:5000/recipes/${id}`);
          store.commit('DELETE_RECIPE', id);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const addNewRecipe = async () => {
      try {
        const response = await axios.post('http://localhost:5000/recipes', newRecipe.value);
        store.commit('ADD_RECIPE', response.data);
      } catch (error) {
        console.error(error);
      }

      newRecipe.value = {
        title: '',
        description: '',
        ingredients: [],
        method: [],
        ingredientRows: 1,
        methodRows: 1
      };

      togglePopup();
    };

    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recipes');
        console.log('Fetched recipes:', response.data);
        store.commit('SET_RECIPES', response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    onMounted(() => {
      fetchRecipes();
    });

    return {
      newRecipe,
      togglePopup,
      popupOpen,
      addNewIngredient,
      addNewStep,
      editPopupOpen,
      editedRecipe,
      editRecipe,
      toggleEditPopup,
      editNewIngredient,
      editNewStep,
      saveEditedRecipe,
      cancelEdit,
      deleteRecipe,
      addNewRecipe,
      searchQuery,
      filteredRecipes,
    };
  }
}
</script>

<style scoped>
.home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-size: 3rem;
  margin-bottom: 32px;
  color: #ccc;
  font-weight: 600;
}

.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
}

.recipes .card {
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  background-color: #1b77e0;
}

h2 {
  font-weight: 600;
  color: #ccc;
}
.recipes .card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.recipes .card p {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.add-recipe-popup, .edit-recipe-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
}

.add-recipe-popup .popup-content, .edit-recipe-popup .popup-content {
  background-color: #081c33;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 768px;
}

.popup-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.popup-content .group {
  margin-bottom: 1rem;
}

.popup-content .group label {
  display: block;
  margin-bottom: 0.5rem;
  color: aliceblue;
}

.popup-content .group input,
.popup-content .group textarea {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.popup-content .group textarea {
  height: 100px;
  resize: none;
}

.popup-content button[type="submit"] {
  margin-right: 1rem;
}

.btn {
  margin: 50px;
  cursor: pointer;
  position: relative;
  padding: 10px 30px;
  background: rgb(173, 172, 172);
  font-size: 15px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  transition: all 1s;
  color: black;
}

.btn:after, .btn:before {
  content: " ";
  width: 10px;
  height: 10px;
  position: absolute;
  border: 0px solid #9a1b1b;
  transition: all 1s;
}

.btn:after {
  top: -1px;
  left: -1px;
}

.btn:before {
  bottom: -1px;
  right: -1px;
}

#btn1:after {
  border-top: 2px solid #7EDD03;
  border-left: 2px solid #7EDD03;
}

#btn1:before {
  border-bottom: 2px solid #7EDD03;
  border-right: 2px solid #7EDD03;
}

#btn2:after {
  border-top: 2px solid #03e9f4;
  border-left: 2px solid #03e9f4;
}

#btn2:before {
  border-bottom: 2px solid #03e9f4;
  border-right: 2px solid #03e9f4;
}

#btn3:after {
  border-top: 2px solid #FF36FF;
  border-left: 2px solid #FF36FF;
}

#btn3:before {
  border-bottom: 2px solid #FF36FF;
  border-right: 2px solid #FF36FF;
}

.btn:hover {
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
  letter-spacing: 3px;
}

#btn1:hover {
  background: #011627;
  color: #7EDD03;
}

#btn2:hover {
  background: #011627;
  color: #03e9f4;
}

#btn3:hover {
  background: #011627;
  color: #FF36FF;
}

.btn:hover:before, .btn:hover:after {
  width: 100%;
  height: 100%;
}
</style>

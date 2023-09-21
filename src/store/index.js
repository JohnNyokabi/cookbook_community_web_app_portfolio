import { createStore } from 'vuex';

const state = {
  user: null,
  recipes: []
}
export default createStore({
  state,
  getters: {
    user: (state) => {
      return state.user;
    },
  },
  mutations: {
    SET_RECIPES(state, recipes) {
      console.log('SET_RECIPES mutation called with:', recipes);
      state.recipes = recipes;
    },
    ADD_RECIPE (state, recipe) {
      state.recipes.push(recipe)
    },
    UPDATE_RECIPE(state, { index, updatedRecipe }) {
      if (index >= 0 && index < state.recipes.length) {
        state.recipes[index] = { ...updatedRecipe };
      }
    },

    DELETE_RECIPE(state, id) {
      const index = state.recipes.findIndex((r) => r._id === id);
      if (index !== -1) {
        state.recipes.splice(index, 1);
      }
    },    
    
    user(state, user) {
      state.user = user;
    },
  },

  actions: {
    user(context, user) {
      context.commit('user', user);
    },
  },
  modules: {
  }
})
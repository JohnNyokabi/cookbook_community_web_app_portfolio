import { createStore } from 'vuex';

const state = {
  user: null,
  recipes: [
    {
      slug: 'katsu-curry',
      title: 'katsu curry',
      description: 'A delicious curry made with chicken, potatoes, and a special sauce',
      ingredients: [
        '1 tablespoon olive oil',
        '1 onion, chopped',
        '2 cloves garlic, chopped',
        '1 tablespoon curry powder',
      ],
      method: [
        'Heat oil in a large skillet over medium heat.',
        'Add onion and garlic and cook, stirring often, until softened, about 5 minutes.',
        'Add curry powder and cook, stirring until fragrant,about 1 minute.',
        'Add chicken and potatoes and cook, stirring, until heated through, about 5 minutes.' 
      ]
    },
    {
      slug: 'ramen-noodle-soup',
      title: 'ramen noodle soup',
      description: 'A delicious curry made with chicken, potatoes, and a special sauce',
      ingredients: [
        '1 tablespoon olive oil',
        '1 onion, chopped',
        '2 cloves garlic, chopped',
        '1 tablespoon curry powder',
      ],
      method: [
        'Heat oil in a large skillet over medium heat.',
        'Add onion and garlic and cook, stirring often, until softened, about 5 minutes.',
        'Add curry powder and cook, stirring until fragrant,about 1 minute.',
        'Add chicken and potatoes and cook, stirring, until heated through, about 5 minutes.' 
      ]
    }
  ]
}
export default createStore({
  state,
  getters: {
    user: (state) => {
      return state.user;
    },
  },
  mutations: {
    ADD_RECIPE (state, recipe) {
      state.recipes.push(recipe)
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

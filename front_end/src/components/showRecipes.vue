<template>
  <div class="recipes">
    <section class="recipe-gallery">
      <div v-if="likes">
        <div class="recipe-box" v-for="recipe in likedRecipes" :key="recipe.id">
          <h2>{{printRecipe(recipe.title)}}</h2>
          <!-- <router-link :to="{name: 'recipe', params: {recipe}}"><h2>{{printRecipe(recipe.title)}}</h2></router-link> -->
          <p>By: {{recipe.author}}</p>
          <img :src="recipe.path" />
        </div>
      </div>
      <div v-else>
        <div class="recipe-box" v-for="recipe in suggestions" :key="recipe.id">
          <h2>{{printRecipe(recipe.title)}}</h2>
          <!-- <router-link :to="{name: 'recipe', params: {title} }"><h2>{{printRecipe(recipe.title)}}</h2></router-link> -->
          <p>By: {{recipe.author}}</p>
          <img :src="recipe.path" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'showRecipes',
  props: ["findTitle", "likes"],
  data() {
    return {
     recipes: [],
     title: "stupid"
    }
  },
  computed: {
    suggestions() {
      let recipes = this.recipes.filter(recipe => recipe.title.toLowerCase().includes(this.findTitle.toLowerCase()));
      return recipes.sort((a, b) => a.title > b.title);
    },
    likedRecipes() {
      let recipes = this.recipes.filter(recipe => recipe.liked);
      return recipes.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getRecipes();
  },
  methods: {
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    printRecipe(title) {
      if (title.length > 21) return title.substring(0, 18) + "...";
      return title;
    },
    emitEventChanged () {
        this.$emit('CustomEventInputChanged', this.findTitle);
    }
  }
}
</script>


<style scoped>

a {
  text-decoration: none;
  color: #2c3e50;
}

.recipe-box h1 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.recipe-gallery {
  column-gap: 1.5em;
  padding: 15px;
}

.recipe-box {
  display: inline-block;
  width: 100%;
  background-color: #ffe99c;
  border-radius: 15px;
  margin-bottom: 25px;
  height: 350px;
}

.recipe-box img {
  width: 220px;
  height: 220px;
  border-radius: 5px;
  object-fit: cover;
}



/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .recipe-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .recipe-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .recipe-gallery {
    column-count: 2;
  }
}

</style>

<template>
  <div class="recipeThing">
    <p>{{title}}</p>
    <div class="image">
    </div>
    <div class="details">
    </div>
    <!-- <section class="recipe-gallery">
      <div v-if="likes">
        <div class="recipe-box" v-for="recipe in likedRecipes" :key="recipe.id">
          <h1>{{printRecipe(recipe.title)}}</h1>
          <p>By: {{recipe.author}}</p>
          <img :src="recipe.path" />
        </div>
      </div>
      <div v-else>
        <div class="recipe-box" v-for="recipe in suggestions" :key="recipe.id">
          <h1>{{printRecipe(recipe.title)}}</h1>
          <p>By: {{recipe.author}}</p>
          <img :src="recipe.path" />
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'RecipeDetails',
  props: ["title"],
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

.recipeThing {
  background-color: blue;
}

.image {
  width: 200px;
  height: 500px;
  background-color: blue;
}

.details {
  background-color: green;
  height: 500px;
  min-width: 100px;
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

<template>
  <div class="book">
    <h1>Check out your personal cook book!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add an Recipe to our library!</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Title">
        <p></p>
        <input v-model="author" placeholder="Author">
        <p></p>
        <textarea v-model="recipe" name="recipe" rows="4" cols="25"
        placeholder="Enter your recipe here"></textarea>
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
      </div>
      <button type="button" @click="upload">Save Recipe!</button>
      <div class="upload" v-if="addRecipe">
        <h2>{{addRecipe.title}}</h2>
        <h2>{{addRecipe.author}}</h2>
        <h2>{{addRecipe.recipe}}</h2>
        <img :src="addRecipe.path" />
      </div>
    </div>

    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Item</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectRecipe(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findRecipe">
        <input v-model="findRecipe.title">
        <p></p>
        <textarea v-model="findRecipe.recipe" name="recipe" rows="4" cols="25"></textarea>
        <p></p>
        <img :src="findRecipe.path" />
      </div>
      <div class="actions" v-if="findRecipe">
        <button @click="deleteItem(findRecipe)">Delete</button>
        <button @click="editItem(findRecipe)">Edit</button>
      </div>
    </div>

    <br><hr><br>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'BookView',
  data() {
    return {
      title: "",
      author: "",
      recipe: "",
      file: null,
      addRecipe: null,
      recipes: [],
      findTitle: "",
      findRecipe: null,
    }
  },
  computed: {
    suggestions() {
      let recipes = this.recipes.filter(recipe => recipe.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return recipes.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getRecipes();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/recipes', {
          title: this.title,
          author: this.author,
          recipe: this.recipe,
          path: r1.data.path
        });
        this.addRecipe = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectRecipe(recipe) {
      this.findTitle = "";
      this.findRecipe = recipe;
    },
    async deleteItem(recipe) {
      try {
        await axios.delete("/api/recipes/" + recipe._id);
        this.findRecipe = null;
        this.getRecipes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editRecipes(recipe) {
      try {
        await axios.put("/api/recipes/" + recipe._id, {
          title: this.findRecipe.title,
          author: this.findRecipe.author,
          recipe: this.findRecipe.recipe,
        });
        this.findRecipe = null;
        this.getRecipes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>

.book {
  padding: 40px;
}

.book img {
  max-width: 400px;
  max-height: 400px;
}

.description {
  width: 200px;
  height: 100px;
  line-height: 12px;
}
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 2px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  display: flex;
  flex-direction: column;
  margin-right: 30px;
}

.form {
  min-width: 400px;
  min-height: 300px;
}

.form input {
  max-width: 300px;
}

.add button {
  max-height: 35px;
}
</style>

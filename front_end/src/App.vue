<template>
  <div id="app">
    <div class="appHeader">
      <h1><faIcons icon="faThermometer" /></h1>
      <nav>
        <router-link to="/"><img src="../public/home.png" alt=""></router-link>
        <router-link to="/book"> <img src="../public/cookBook.png" alt=""> </router-link>
      </nav>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0px;
  margin: 0px;
}

/* Header */
.appHeader {
  position: sticky;
  display: flex;
  /* background-image: linear-gradient(to bottom, rgb(255, 233, 156, .5), rgb(255, 233, 156, .5)); */
  background-color: #ffe99c;
  top: 0px;
  width: 100%;
  height: 100px;
  color: #1C454F;
  object-fit: fill;
  justify-content: flex-end;
}

.appHeader img {
  width: 40px;
  height: 40px;
}

nav {
  padding: 35px;
}

nav a {
  font-weight: bold;
  color: white;
  font-size: 20px;
  margin-right: 15px;
  text-decoration: none;
}

nav a:hover {
  filter: invert(.3);
}

nav a.router-link-exact-active {
  filter: invert(.5);
  font-size: 25px;
}

</style>

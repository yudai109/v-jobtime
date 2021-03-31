<template>
    <header class="text-gray-600 body-font">
      <nav class="bg-white shadow dark:bg-gray-800">
          <div class="container px-6 py-3 md:flex">
              <div class="flex items-center justify-between">
                  <div class="w-full sm:w-40">
                      <a class="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300" href="#">Visionary勤怠</a>
                  </div>
                  
                  <!-- Mobile menu button -->
                  <!-- <div class="flex md:hidden">
                      <button @click="isOpen = !isOpen" type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                          <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                              <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                          </svg>
                      </button>
                  </div> -->

                  <!-- Mobile menu button -->
                  <!-- <div class="flex md:hidden">
                      <button @click="isOpen = !isOpen" type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                          <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                              <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                          </svg>
                      </button>
                  </div> -->
              </div>

              <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
              <!-- <div :class="isOpen ? 'block' : 'hidden'" class="md:block w-full md:flex md:items-center md:justify-between">
                  <div class="flex flex-col px-2 py-3 -mx-4 md:flex-row md:mx-0 md:py-0">
                      <a href="#" class="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2">Home</a>
                      <a href="#" class="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2">About</a>
                      <a href="#" class="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2">Contact</a>
                  </div>
              </div> -->
          </div>
      </nav>
    </header>
</template>

<script>
import Sidebar from './Sidebar.vue'

export default {
  name: "Header",
  data() {
    return {
        isOpen : false,
    }
  },
  components: {
    Sidebar,
  },
  // methods: {
  //   showSidebar: function() {
  //     console.log(this.isOpen)
  //     this.$emit('showSidebar')
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

@media (min-width: 480px) {
  .container {
      margin: 0 auto;
  }
}

</style>

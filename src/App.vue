<template>
  <div id="app">
  
  <!-- Modal Component -->
      
  <!-- <img src="./assets/logo.png"> -->
    <NavBar id="navBar"/>
    <!--create event bus to determine geotheme edit state for conditional 
    transiion of map and geotheme edit page-->
    <transition name="pageMapToggle" mode="out-in" >
        <div v-if="!editState" key="spinalMapDiv" style="height:100%">
          <SpinalMap id="spinalMap"/>
        </div>
        <div v-else key="editDomainDiv" style="height:100%">
          <EditGeotheme id="editGeotheme"/>
        </div>
    </transition>
    
  </div>
</template>

<script>
import SpinalMap from './components/SpinalMap';
import EditGeotheme from './components/EditGeotheme';
import NavBar from './components/NavBar';
import { EventBus } from './event-bus.js';
var vm;
EventBus.$on('i-got-clicked', data => {
  console.log('editState: ' + data);
  vm.$data.editState = data;
});
export default {
  name: 'app'
  , data: function () {
        return {
            editState: false
        }
    }
    , created : function(){
      vm = this;
      console.log("vm: " + JSON.stringify(vm.$data));
  }
  , methods: {
    
  }
  , components: {
    SpinalMap
    , NavBar
    , EditGeotheme
    // , Icon
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav-link, .navbar-brand{ 
  color: white;
}
html, body, #app {
  height: 100%;
  margin: 0;
}
#navBar{
  height: 7%;
  min-height: 40px
  
}
#spinalMap{
  height: 93%
}
.pageMapToggle-enter-active, .pageMapToggle-leave-active {
  transition: opacity 0.5s ease;
}
.pageMapToggle-enter, .pageMapToggle-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>

<template>
  <v-map :zoom=13 :center="[35.791538, -78.781120]" id="map">
    <v-tilelayer url="https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=b91af2ae14734b8ca925193df7b940d7"></v-tilelayer>
    </v-map>
</template>

<script>
export default {
    name: 'SpinalMap'
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

@import "~leaflet/dist/leaflet.css";
#map{
  height:100%
}
</style>

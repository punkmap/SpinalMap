<template>
  <v-map :zoom=13 :center="[35.791538, -78.781120]" id="map">
    <!-- you need to get a thunderforest.com api key for the full effect or you can just use something like stamen in the line below-->
    <!--forSpinalMap-->
    <!--<v-tilelayer url="https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=<get thunderforest.com API key to go to 11"></v-tilelayer>-->
    <!--else you can always be boring and use the following line of code-->
    <!--<v-tilelayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"></v-tilelayer>-->
    
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

<template>
    <div>
    <b-container class="bv-example-row">
        <b-row>
            <b-col>Geotheme name: {{this.$store.state.selectedGeotheme.name}}  </b-col>
        </b-row>
        <b-row>
            <b-col>Description: {{this.$store.state.selectedGeotheme.desc}}  </b-col>
        </b-row>
        <b-row>
            <b-col>
              Fields:
              <ul>
                <li v-for="field in this.$store.state.selectedGeotheme.fields" v-bind:key="field.fieldName">{{field.fieldName}} <b-button class="pencilEdit" @click="doEditItem('geothemeDesc')"><icon class="pencilIcon" name="pencil"></icon></b-button></li>
              </ul>
            </b-col>
        </b-row>
    </b-container>
    
    <b-container fluid>
        <b-row>
          <b-col>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group id="nameGroup"
                              label="geotheme name::"
                              label-for="nameInput"
                              description="::::::::::">
                  <b-form-input id="nameInput"
                                placeholder="stored.geotheme.name here">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="descGroup"
                              label="description::"
                              label-for="descInput"
                              description="::::::::::">
                  <b-form-input id="descInput"
                                placeholder="stored.geotheme.desc here">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="fieldsGroup"
                              label="fields::"
                              label-for="descInput"
                              description=":|:|:|:|:|:|:|:|:|:">
                  <b-form-input id="fieldsInput"
                                placeholder="v-for stored.geotheme.fields here">
                  </b-form-input>
                </b-form-group>
                
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Vue from 'vue'
import Icon from 'vue-awesome/components/Icon'
import { EventBus } from '../event-bus.js';
var vm;

//var loggedIn = false; 
export default {
    name: 'EditGeotheme'
    , props: ['geothemeField']
  , data: function () {
        return {
            selectedGeotheme:''
            ,form: {
                email: '',
                name: '',
                food: null,
                checked: []
            },
            foods: [
                { text: 'Select One', value: null },
                'Carrots', 'Beans', 'Tomatoes', 'Corn'
            ],
            show: true
        }
    }
    , components: {
            //draggable,
        }
  , created : function(){
      vm = this;
      console.log("vm.$data: " + JSON.stringify(vm.$data));
  //*****TODO use the vuex store to pass data from navbar.vue to editgeotheme.vue    
      this.$store.commit('setTest',"thisisatest");
      console.log("the store is: " + JSON.stringify(this.$store.state.selectedGeotheme));
      //console.log("shared: " + JSON.stringify(shared));
      EventBus.$on('selectGeotheme', data => {
        console.log('editgeotheme: ' + data);
        console.log('data: ' + JSON.stringify(data));
        this.setGeotheme(data);
        //vm.$data.selectedGeotheme = data;
        //console.log('editgeotheme vm.$data.selectedGeotheme: ' + JSON.stringify(vm.$data));
      });
  }   
  ,methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
    , setGeotheme(data){
      console.log("setGeotheme data: " + JSON.stringify(data));
      vm.data.selectedGeotheme = data;
      console.log('setGeotheme vm.data.selectedGeotheme: ' + JSON.stringify(vm.data.selectedGeotheme));
    }
    , doEditItem(itemType){
      console.log("itemType: " + itemType);
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.pencilEdit{
  padding: 3px 6px 0px 6px;
  background-color: transparent;
  border-color:transparent;
}
.pencilIcon{
  color:cadetblue 
}


</style>

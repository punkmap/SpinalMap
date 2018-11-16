<template>
    <b-card no-body
        style="min-width: 20rem;" header-tag="header" border-variant="primary" align="left"
        class="mb-2">
      <h6 slot="header"
                  class="mb-0">{{geothemeField.fieldLabel}}</h6>
    <div style="padding-left:1rem">
      <p class="card-text">
          {{geothemeField.fieldDesc}}
      </p>
      
      <b-card no-body
        style="width: 34rem;" 
        border-variant="secondary" 
        align="left"
        class="mb-2">
              

        <div>
          <b-container class="bv-example-row">
            <b-row>
                  <!-- <b-container>
                  <b-row>
                    <b-col> -->
                    <b-col col="1"><strong> Pick List: </strong><b-button v-if="!editField" variant="primary" class="domainEditButton" @click="handleFieldToggle()" size="sm"><icon name="pencil"></icon></b-button></b-col>
                    <b-col cols="6"><b-input size="sm" v-if="editField" class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="add picklist value" /></b-col>
                    <b-col col="1"><b-button v-if="editField" @click="handleAddDomainValue(geothemeField.domainValues)" variant="primary" size="sm">+</b-button></b-col>
                    
                    <!-- </b-col>
                  </b-row>
                  </b-container> -->
                
            </b-row>
          </b-container>
        </div>
              <b-container fluid>
                <b-row>
                  
                  <!--<draggable v-model="geothemeField.domainValues" @start="drag=true" @end="drag=false">-->
                      <div v-for="domainValue in geothemeField.domainValues" :key="domainValue" style="padding: 0.5rem">
                          <h6><b-badge class="domainTile">{{domainValue}}<transition name="editGeothemeDomain" mode="out-in"><b-button v-if="editField" class="domainDeleteButton" @click="handleDeleteDomain(domainValue, geothemeField.domainValues)"><icon name="window-close"></icon></b-button></transition></b-badge></h6>
                      </div>
                  <!--</draggable>-->
                  <!--<div v-for="domainValue in geothemeField.domainValues" :key="domainValue" style="padding: 0.5rem">
                    <h6><b-badge class="domainTile">{{domainValue}}<b-button v-if="editField" class="domainDeleteButton" @click="handleDeleteDomain(domainValue, geothemeField.domainValues)"><icon name="window-close"></icon></b-button></b-badge></h6>
                  </div>-->
                </b-row> 
                <b-button v-if="editField" variant="primary" size="sm">Save</b-button> 
              </b-container>
      </b-card>
      
      
      <transition name="editGeothemeDomain" mode="out-in">
        <div v-if="editField"><p>{{geothemeField.fieldDesc}}</p><p>{{geothemeField.fieldDesc}}</p><p>{{geothemeField.fieldDesc}}</p></div>
        <div v-else><p>{{geothemeField.defaultValue}}</p></div>
      </transition>
    </div>
    </b-card>
</template>

<script>
import Vue from 'vue'
import Icon from 'vue-awesome/components/Icon'
import draggable from 'vuedraggable'
var vm;
//var loggedIn = false; 
export default {
    name: 'FieldEdit'
    , props: ['geothemeField']
  , data: function () {
        return {
            editField: false
        }
    }
    , components: {
            draggable,
        }
  , created : function(){
      vm = this;
      console.log("vm: " + JSON.stringify(vm.$data));
  }   
  ,methods: {
    handleFieldToggle: function () {
      console.log('handleFieldToggle this.editField: ' + this.editField);
      this.editField = this.editField ? false : true;
    }
    , handleAddDomain: function(domain){
      
    }
    , handleDeleteDomain: function(field, values){
      console.log("handleDeleteDomain field: " + field);
      console.log("handleDeleteDomain values: " + values)
      values.splice(values.indexOf(field), 1);
      console.log("handleDeleteDomain values: " + values)
      
      //values.splice($.inArray(itemtoRemove, values),1);
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.editGeothemeDomain-enter-active, .editGeothemeDomain-leave-active {
  transition: opacity .5s;
}
.editGeothemeDomain-enter, .editGeothemeDomain-leave-to  {
  opacity: 0;
}
.domainTile{
  line-height: 2;
}
.domainDeleteButton{
  padding: 0;
  line-height: 0;
  color: #a03535;
}
.domainEditButton{
  padding: 0.25rem;
  line-height: 0;
}

</style>

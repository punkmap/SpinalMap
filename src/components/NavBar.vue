<template>
  <b-navbar toggleable="md" type="dark" variant="info">

  <!--login modal-->
  <b-modal id="loginModal" ref="loginModal" size="lg" centered hide-footer title="Login">
    <b-container fluid>
    <form 
      class="pure-form pure-form-stacked"   
      v-on:submit.prevent="doLogin" 
      id="loginForm">
      <b-row>
        <b-col>
              <div style="padding:0.5em">  
                <b-form-input 
                              id="username"
                              v-model="username"
                              ref="username"
                              type="text"
                              size="lg"
                              class="form-control" 
                              name="user"
                              placeholder="username"></b-form-input>
              </div>
              <div style="padding:0.5em">
                <b-form-input id="password"
                            v-model="password"
                            ref="password"
                            type="password"
                            size="lg"
                            class="form-control"
                            name="user"
                            placeholder="password"></b-form-input>
              </div>
        </b-col>
        <b-col>
          <b-button type="submit" 
                    id="btnLogin"
                    class="btn btn-default" 
                    value="Submit" 
                    :size="'lg'" 
                    :variant="'primary'" 
                    >go to 11</b-button>
        </b-col>
      </b-row>
    </form>
    </b-container>
  </b-modal>

  <!--create geo-theme modal-->
  <b-modal id="createGeoThemeModal" ref="createGeoThemeModal" size="lg" centered hide-footer title="create geo-theme">
    <b-container fluid>
    <form 
      class="pure-form pure-form-stacked"   
      v-on:submit.prevent="doCreateGeoTheme" 
      id="createGeothemeForm">
      <b-row>
        <b-col>
          <b-col><b-form-input v-model="createGeothemeName"
                  type="text"
                  placeholder="geo-theme name"></b-form-input></b-col>
     
        </b-col>
        <b-col>
          <b-button type="submit" 
                    id="submitGeoTheme"
                    class="btn btn-default" 
                    value="Submit" 
                    :size="'lg'" 
                    :variant="'primary'" 
                    >create new geo-theme</b-button>
          <!--
            *****TODO 

          1. add the proper for fields to this modal as follows:
                    "name": geotheme.name
                  , "label": geotheme.name
                  , "desc": geotheme.desc
                  , "fields" : geotheme.fields 

          2. create a node function for adding geothemes. 
          -->
        </b-col>
      </b-row>
    </form>
    </b-container>
  </b-modal>
  <!--*****TODO set title to selected geotheme-->
  <b-modal id="editGeoThemeModal" ref="editGeoThemeModal" size="lg" centered hide-footer title="edit geo-theme">
    <b-container fluid>
    <form 
      class="pure-form pure-form-stacked"   
      v-on:submit.prevent="doEditGeoTheme" 
      id="editGeothemeForm">

      <b-col style="padding-top: 1rem"> 
            <b-col align-h="start"><b-row align-v="center"><p>Add Field:</p></b-row></b-col>
            <b-row align-v="center">
              <b-col align-h="start" cols="10"><b-form-input v-model="createGeothemeFieldName"
                  type="text" ref="geothemeFieldNameValue"
                  placeholder="field name"></b-form-input></b-col>
                  <!-- <b-form-group >
      <b-form-radio-group v-model="selected"
                          :options="options" 
                          size="sm"
                          name="radiosMd">
      </b-form-radio-group>
    </b-form-group> -->
              <b-col align-h="end"><b-button size="sm" @click="doCreateGeothemeField" variant="primary">+</b-button></b-col>
            </b-row>
            <div id="nav-scroller"
          ref="content"
          style="position:relative; height:200px; overflow-y:scroll;" >
              <b-card-group deck>
                <div v-for="geothemeField in geothemeFields" :key="geothemeField.fieldName">
                <!--<FieldEdit v-bind:geothemeField="geothemeField"></FieldEdit>
                <b-card v-bind:title= geothemeField.fieldLabel
                      style="max-width: 20rem;"
                      class="mb-2">
                  <p class="card-text">
                    {{geothemeField.fieldDesc}}
                  </p>
                  <p class="card-text">
                    <strong> Pick List: </strong>{{geothemeField.domainValues}}
                  </p>
                  <b-button variant="primary" @click="doGeothemeFieldEdit(geothemeField.fieldName)"><icon name="pencil"></icon></b-button>
                  <p>{{geothemeField.editDomain}}</p>
                  <transition name="editGeothemeDomain" mode="out-in">
                    <component v-bind:is="transitionVue" v-bind:field="geothemeField"></component>
                  </transition>
                </b-card>-->
              </div>    
            </b-card-group>  
          </div>
          </b-col>
      <!--
        *****TODO 
          add list of geotheme fields as cards; each both edit and delete buttons
          
          add geothemefield
            SubType button
            on click 

            edit/add geotheme form
              geothemeName
              geothemeDatatype
              geothemeSubtype
               

      -->
    </form>
    </b-container>
  </b-modal>

  <b-navbar-brand href="#"><a class="brand" href="http://disputebills.com"><img src="../assets/thesegoto11_1.png" id="logo" alt="Dispute Bills"></a>  punkmap
  </b-navbar-brand>
  <b-nav is-nav-bar class="ml-auto">
      <!--*****TODO fo production use v-show="!loggedIn"-->
      <!-- <b-nav-item v-b-modal.loginModal v-show="!loggedIn" href="#" id="login" >login</b-nav-item> -->
      <b-nav-item v-b-modal.loginModal href="#" id="login" >login</b-nav-item>
  </b-nav>
  <b-nav is-nav-bar class="ml-auto">
      <b-dropdown id="geoThemeDDown" v-show="loggedIn" text="select geo-theme" variant="default" class="m-md-2">
      <!--*****TODO hide geothemes button until one geotheme is set-->
      <!--create cancel button-->
      <!-- <b-dropdown-item v-b-modal.createGeoThemeModal id="createGeoTheme">create geo-themes</b-dropdown-item> -->
      <b-dropdown-item v-for="geotheme in geothemes" :key="geotheme.name" :value="geotheme.name" @click="doSelectGeoTheme(geotheme.name)">{{geotheme.name}}</b-dropdown-item>
      </b-dropdown>  
  </b-nav>
  <b-nav is-nav-bar class="ml-auto">
      <!--*****TODO make this button visible only when geotheme is selected-->
      <!-- <b-col align-h="end"><b-button size="sm" v-b-modal.editGeoThemeModal @click="doEditGeoTheme" variant="primary">edit geo-theme</b-button></b-col> -->
      <b-col align-h="end"><b-button size="sm" @click="doEditGeoTheme" variant="primary">edit geo-theme</b-button></b-col>
  </b-nav>
  <b-nav is-nav-bar class="ml-auto">
      <b-nav-item @click="test" href="#" id="dbCreate" >test</b-nav-item>
  </b-nav>  
</b-navbar>

<!-- navbar-1.vue -->
</template>

<script>
import Vue from 'vue'
import FieldEdit from './FieldEdit';
// Import the EventBus we just created.
import { EventBus } from '../event-bus.js';
//import Icon from 'vue-awesome/components/Icon'
import store from '../store/store'

var vm;
//var loggedIn = false; 
export default {
    name: 'NavBar'
  ,data: function () {
        return {
             password: ''
            , username: ''
            , dbName: ''
            , createGeothemeName: ''
            , createGeothemeFieldName: ''
            , editGeotheme: false
            , editGeothemeName: ''
            , editGeothemeFieldName: ''
            , geotheme : {}
            , geothemes: []
            , geothemeFields: []
            //*****TODOfor production set loggedIn to false
            , transitionVue: 'v-a'
            , loggedIn: true
        }
    }
    , components: {
      FieldEdit
      // 'v-a': {
      //   props: ['field']
      //   , template: '<div><div>Component A</div><div>{{field.fieldDesc}}</div></div>'
      // },
      // 'v-b': {
      //   props: ['field']
      //   , template: '<div><div>Component B</div><div>{{field.defaultValue}}</div></div>'
      // }
    }
  , created : function(){
      vm = this;
      console.log("vm: " + JSON.stringify(vm.$data));
  }   
  ,methods: {
    doLogin: function() {
      console.log("doLogin")
      vm.$data.submitData = vm.$data.user;
      var user = vm.$data.username;
      var pass = vm.$data.password;
      
      var reqBody = {};
      reqBody.name = user;
      reqBody.password = pass;
      reqBody = "name="+user+"&password="+pass;
      var reqBodyLength = reqBody.length;
      console.log(reqBodyLength);
      
      this.$http.post('http://localhost:3000/login', reqBody, {headers: {'Content-Type' : 'application/x-www-form-urlencoded','Accept' : 'application/json'}}).then(response => {
        console.log("response: " + JSON.stringify(response));
        console.log("response.body: " + JSON.stringify(response.body));
        console.log("response.body[0]: " + JSON.stringify(response.body[0]));
        console.log("response.body[0].split(';')[0]: " + JSON.stringify(response.body[0].split(';')[0]));
        console.log("response.status: " + response.status);
        if(response.status == 200){
          this.$http.post('http://localhost:3000/getgeothemes', reqBody, {headers: {'Content-Type' : 'application/x-www-form-urlencoded','Accept' : 'application/json'}}).then(response => {
            console.log("getgeothemes response: " + JSON.stringify(response));
            console.log("getgeothemes response.body: " + JSON.stringify(response.body));
            var aryGeothemes = response.body
            console.log("getgeothemes response.body.geothemes: " + JSON.stringify(response.body.geothemes));
            
            var resGeothemes = [];
            aryGeothemes.forEach(function(geotheme) {
                console.log("geotheme.name: " + geotheme.name);
                resGeothemes.push({
                  "name": geotheme.name
                  , "label": geotheme.name
                  , "desc": geotheme.desc
                  , "fields" : geotheme.fields 
                });
            });
            resGeothemes.push({
                "name": "+ create new geotheme"
            });
            console.log("resGeothemes: " + JSON.stringify(resGeothemes));
            vm.$data.geothemes = resGeothemes;
            console.log('this.geothemes: ' +vm.$data.geothemes);
          });
        }
        if(response.body!="loginError"){vm.$data.loggedIn = true;}
        else{vm.$data.loggedIn==false;}
      }, response => {  
        alert('you unauthorized, fool!')
      })
      this.$refs.loginModal.hide()
      // var formData = new FormData();
      // formData.append('name', user);
      // formData.append('password', pass);
      // this.$http.post('http://127.0.0.1:5984/_session/', formData).then(response => {
      //   console.log("success");
      // }, response => {  
      //   console.log("fail");
      // })
    }
    , test: function (){
      this.$refs.editGeoThemeModal.hide()
      console.log("vm.$data.editGeotheme: " + vm.$data.editGeotheme);
      vm.$data.editGeotheme = !vm.$data.editGeotheme
      console.log("vm.$data.editGeotheme: " + vm.$data.editGeotheme);
      EventBus.$emit('i-got-clicked', vm.$data.editGeotheme)//.then(EventBus.$emit('selectGeotheme', vm.$data.geotheme));

      /*
      console.log('createDB');
      var reqBody = {};
      reqBody.name
      // this.$http.post('http://localhost:3000/createdocument', reqBody, {headers: {'Content-Type' : 'application/x-www-form-urlencoded','Accept' : 'application/json'}}).then(response => {
      //       console.log("createdocument response: " + JSON.stringify(response));
      //   });
      this.$http.post('http://localhost:3000/getgeothemes', reqBody, {headers: {'Content-Type' : 'application/x-www-form-urlencoded','Accept' : 'application/json'}}).then(response => {
          console.log("getgeothemes response: " + JSON.stringify(response));
      });
      */
    }
    , authenticate: function () {
      
      console.log("authenticate")
      //console.log('username: ' + this.$refs.username.value);
      //var un = this.$refs.username.value;
      //console.log('username: ' + un);
      var pw = this.$refs.password.val();
      console.log('password: ' + pw);
      var reqBody = "name="+un+"&password="+pw;
      var reqBodyLength = reqBody.length;
      console.log("reqBody: " + reqBody);
      console.log("reqBodyLength: " + reqBodyLength);
      var loginModal = this.$refs.loginModal;
      console.log("post");
        Vue.http.post('http://127.0.0.1:5984/_session', {
            headers: {'content-type' : 'application/x-www-form-urlencoded', 'content-length':reqBodyLength},
            body: reqBody, 
        }).then(function(data){
            console.log(data)
            loginModal.hide();
            // console.log('this.$refs.loginModal: ' + document.getElementById('loginModal').hide);
        })
    }
    , doSelectGeoTheme: function(selectedGeothemeName){
      if(selectedGeothemeName == "+ create new geotheme"){
          this.$refs.createGeoThemeModal.show();
      }
      else{
          vm.$data.geothemes.forEach(function(geotheme) {
                console.log('geotheme.name: ' + geotheme.name);
                console.log('selectedGeothemeName: ' + selectedGeothemeName);
                if (geotheme.name == selectedGeothemeName){
                  console.log('geotheme: ' + JSON.stringify(geotheme));
                  console.log('vm.$data.geotheme: ' + JSON.stringify(vm.$data.geotheme));
                  vm.$data.geotheme = geotheme;
                  store.commit('setGeotheme',geotheme);
      
                  vm.$data.geothemeFields = geotheme.fields;
                  //EventBus.$emit('selectGeotheme', geotheme)
                  for (var gtf = 0; gtf<vm.$data.geothemeFields.length; gtf++){
                    console.log("vm.$data.geothemeFields[gtf]: " + JSON.stringify(vm.$data.geothemeFields[gtf]));
                    vm.$data.geothemeFields[gtf].editDomain = false;
                  }
                  console.log('vm.$data.geothemeFields: ' + JSON.stringify(vm.$data.geothemeFields));
                  console.log('vm.$data.geotheme2: ' + JSON.stringify(vm.$data.geotheme));
                  
                }
          });
          //this.geotheme = this.geothemes[selectedGeothemeName];
      }
    }
    , doCreateGeoTheme: function(){
      console.log("geotheme Created");
      this.$refs.createGeoThemeModal.hide()
      
    }
    , doEditGeoTheme: function(){
      console.log("geotheme Created");
      
      
      this.$refs.editGeoThemeModal.show()            
    }
    , doCreateGeothemeField: function(){
      console.log('geotheme Field Created: '+ vm.$data.createGeothemeFieldName);
      var fieldName = vm.$data.createGeothemeFieldName;
      var fieldObject = {};
      fieldObject.name = fieldName; 
      vm.$data.geothemeFields.push(fieldObject);
    }
    , doGeothemeFieldEdit: function(fieldLabelToEdit){
      console.log('doGeothemeFieldEdit: ' + fieldLabelToEdit);
      
      for (var gtf = 0; gtf<vm.$data.geothemeFields.length; gtf++){
        if(vm.$data.geothemeFields[gtf].fieldName == fieldLabelToEdit){
        //***** Need to apply template only to reference that matches fieldLabelToEdit
        vm.$data.transitionVue = vm.$data.transitionVue == 'v-a' ? 'v-b' : 'v-a'; 
        console.log('vm.$data.transitionVue: ' + vm.$data.transitionVue);
        
        //  console.log('vm.$data.geothemeFields[gtf].editDomain: ' + vm.$data.geothemeFields[gtf].editDomain);
          vm.$data.geothemeFields[gtf].editDomain = !vm.$data.geothemeFields[gtf].editDomain ;
        //  console.log('vm.$data.geothemeFields[gtf].editDomain: ' + vm.$data.geothemeFields[gtf].editDomain);
        }
      }
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#logo{
  height: 2em
}
#btnLogin{
  height:  100%;
  width: 75%
}
.modal-header{
  background-color: burlywood;
  border-bottom-color: rgb(25, 101, 177);
}

.editGeothemeDomain-enter-active, .editGeothemeDomain-leave-active {
  transition: opacity .5s;
}
.editGeothemeDomain-enter, .editGeothemeDomain-leave-to  {
  opacity: 0;
}
</style>

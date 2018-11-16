import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        test:"dont test me"
        , selectedGeotheme:""
    }, 
    mutations:{
        setTest(state, newText){
            state.test = newText;
        }
        , setGeotheme(state, newGeotheme){
            state.selectedGeotheme = newGeotheme;
        }
    }
})

/*
const state = {
    count: 1
}

const getters = {
    evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

const mutations = {
    increment (state) {
        state.count++;
    },
    decrement (state) {
        state.count--;
    }
}

const actions = {
    increment: ({ commit }) => commit('increment'),
    decrement: ({ commit }) => commit('decrement'),
    incrementIfOdd: ({commit, state}) => {
        if((state.count + 1)%2===0) {
           commit('increment')     
        }
    },
    incrementAsync: ({commit}) => {
        return new Promise((response, reject) => {
            setTimeout(() => {
                commit('increment')
                resolve()
            }, 1000)
        })
    }, 
    post:({commit}) => {
        console.log("post");
        Vue.http.post('https://jsonplaceholder.typicode.com/posts', {
            title: "content title",
            body: "content body", 
            userId: 1
        }).then(function(data){
            console.log(data)
        })
    }
}

export default new Vuex.Store({
    state, 
    getters,
    mutations,
    actions
})

*/
# vuex-test

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#to run the app 
go to ./spinalMap
    start couchdb:
        cd to ./containers/couchdb
        run sudo docker run --restart always -d -p 5984:5984 -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=somethingpithy -v <yourLocalDirectoryGoesHere>/spinalMap/containers/couchdb/data:/opt/couchdb/data dockercouch
    cd tp ./spinalMap
    run: node app
    run: npm run dev
 go to http://localhost:8080/ to view application
 ```
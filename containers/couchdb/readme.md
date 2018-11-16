to run:
sudo docker run --restart always -d -p 5984:5984 -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=punkmap -v ~/tydev/d3b5/docker/containers/couchdb2.x/data:/opt/couchdb/data dockercouch
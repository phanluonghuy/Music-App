# Build docker

docker-compose up -d --no-deps --build

# 1. Config Server Initialization: Connect to the MongoDB shell in the configsvr container to initialize the config server replica set:

docker exec -it configsvr_container mongosh

rs.initiate({
  _id: "configReplSet",
  configsvr: true,
  members: [{ _id: 0, host: "configsvr:27017" }]
});

# 2. Shard 1 Replica Set Initialization: Connect to the shard1-primary container:

docker exec -it shard1-primary_container mongosh

rs.initiate({
  _id: "shard1",
  members: [{ _id: 0, host: "shard1-primary:27017" }]
});

# 3. Shard 2 Replica Set Initialization: Connect to the shard2-secondary container:

docker exec -it shard2-secondary_container mongosh

rs.initiate({
  _id: "shard2",
  members: [{ _id: 0, host: "shard2-secondary:27017" }]
});

# 4. Add Shards to the Cluster

docker exec -it mongos_container mongosh

sh.addShard("shard1/shard1-primary:27017");
sh.addShard("shard2/shard2-secondary:27017");

sh.status();


# Remember to re-run backend docker

db.printShardingStatus()
db.stats()

ref: https://github.com/minhhungit/mongodb-cluster-docker-compose/tree/master
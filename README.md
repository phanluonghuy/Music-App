docker-compose exec mongo-primary mongosh

rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo-primary:27017", priority: 2 }, // Primary ưu tiên cao
    { _id: 1, host: "mongo-secondary-1:27017", priority: 1 },
    { _id: 2, host: "mongo-secondary-2:27017", priority: 0 }, // Chỉ là secondary, không bao giờ là primary
    { _id: 3, host: "mongo-secondary-3:27017", priority: 0 }  // Chỉ là secondary
  ]
});

rs.status()
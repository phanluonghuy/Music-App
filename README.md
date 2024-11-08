ssh administrator123@23.102.234.224
Congtinh0109@@ 
20.255.97.95 

 docker stack deploy -c docker-compose.yaml webapp
docker service ls



docker system prune -a
docker service update --force webapp_nginx
docker service scale webapp_frontend=2

docker node ps

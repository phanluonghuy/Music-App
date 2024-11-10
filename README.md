# Music App Deployment Guide with Docker Swarm

## Prerequisites
- Two or more VPS instances running a Linux distribution (e.g., Ubuntu)
- Each VPS instance must have Docker installed
- Basic knowledge of SSH and Docker commands
- sudo permissions on the VPS instances

## Steps to Deploy the Music App

### 1. Connect to Each VPS
Use the SSH command to connect to each VPS:
```bash
ssh username@vps_ip_address
# Enter the password when prompted
```

### 2. Install Docker on Each VPS (if not already installed)
```bash
sudo apt-get update
sudo apt-get install -y docker.io
```

Verify Docker installation:
```bash
docker --version
```

### 3. Initialize Docker Swarm on the Manager Node
On the main VPS, initialize Docker Swarm:
```bash
docker swarm init --advertise-addr <MANAGER_IP_ADDRESS>
```
This command will output a `SWARM_JOIN_TOKEN` that other nodes will use to join the swarm.

### 4. Join Worker Nodes to the Swarm
On each worker node, use the `SWARM_JOIN_TOKEN` to join the swarm:
```bash
docker swarm join --token <SWARM_JOIN_TOKEN> <MANAGER_IP_ADDRESS>:2377
```

### 5. Verify the Nodes
On the manager node, check if the nodes have joined:
```bash
docker node ls
```

### 6. Create the Required Configuration Files
On the manager node, create the following files:

#### `docker-compose.yaml`

#### `nginx.conf`
Create a configuration file if using Nginx for load balancing:
```nginx
server {
    listen 80;
    server_name <DOMAIN_NAME_OR_IP>;

    location / {
        proxy_pass http://frontend:80;
    }
}
```

### 7. Update Node Availability (Optional)
To drain a node:
```bash
docker node update --availability drain <NODE_ID>
```

To activate a node:
```bash
docker node update --availability active <NODE_ID>
```

### 8. Deploy the Stack
Deploy the app using the `docker-compose.yaml` file:
```bash
docker stack deploy -c docker-compose.yaml webapp
```

### 9. Verify Deployment
Check if the website is running by visiting `http://<MANAGER_IP_ADDRESS>` from another computer.

### 10. Monitor Services and Logs
List running services:
```bash
docker service ls
```

View logs for a specific service:
```bash
docker service logs <service_name>
```

Inspect a node:
```bash
docker node inspect <NODE_ID>
```

List tasks running on a node:
```bash
docker node ps <NODE_ID>
```

### 11. Scale Services (Optional)
To scale the frontend service:
```bash
docker service scale webapp_frontend=2
```

### 12. (Optional) Add a Domain and SSL Certificate
You can enhance your deployment by purchasing a domain and adding an SSL certificate. Services like Let's Encrypt can be used for free SSL certificates.

### Notes
- Ensure you have `sudo` permissions when running commands that require elevated privileges.
- Update security groups or firewall rules to allow traffic to your VPS on necessary ports (e.g., port 80 for HTTP and 443 for HTTPS).

## Conclusion
By following this guide, you should have a basic two-node deployment of the Music App with Docker Swarm.

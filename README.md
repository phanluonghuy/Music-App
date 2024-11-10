### Music Player Application
It is a small music player web app using the MERN stack (MongoDB, Express, React, Node.js). The app should allow users to sign up, sign in, select songs from a library, create playlists, play songs, and resume songs from where they left off.

**Here's a breakdown of the technologies used, functionality, and how to set it up locally:**

### Technologies Used:
1. **Frontend**:
   - **React.js**: For building the user interface.
   - **Redux**: For state management, especially for managing the state of the music player and user authentication.
   - **Tailwind-CSS**: For styling the components and creating a responsive design.
   - **Axios**: For making HTTP requests to the backend.

2. **Backend**:
   - **Node.js**: As the runtime environment for the server-side code.
   - **Express.js**: For building the RESTful API that interacts with the frontend.
   - **MongoDB**: As the database for storing user data, playlists, and music information.
   - **Mongoose**: For object data modeling (ODM) to work with MongoDB.

3. **Authentication**:
   - **JWT (JSON Web Tokens)**: For user authentication, allowing secure login and session management.

4. **Music Management**:
   - **Spotify API**: For fetching music data, including tracks, albums, and artist information.
  
5. **Deployment**:
   - **For deployment i used render free cloud hosting website.**

### Functionality:
- **User Authentication**: Users can sign up and log in using JWT-based authentication.
- **Music Library**: Users can browse and search for music tracks and albums using the Spotify API.
- **Playlist Management**: Users can create, view, and manage their playlists.
- **Music Player**: Users can play music, with features like play, pause, skip, and volume control.
- **Responsive Design**: The app is designed to be responsive, working well on both desktop and mobile devices.


# Music App Deployment Guide

This guide provides step-by-step instructions to deploy the Music App across three levels of deployment complexity. Ensure that Docker is installed on your system, and follow the specific instructions based on your level requirements.

---

## Prerequisites

- Docker must be installed on your system.
- For Level 3, two or more VPS instances running Linux (e.g., Ubuntu) are required.
- Basic knowledge of SSH and Docker commands.
- `sudo` permissions on each VPS instance.

---

## Level 1: Basic Docker Deployment

1. **Unzip** `Music-App-Level-1.zip` into the source code folder.
2. **Open Terminal** in the `Music-App-Level-1` folder.
3. Run the following command to start the application:

   ```bash
   docker compose up -d
   ```

---

## Level 2: Sharded Cluster Deployment with Docker

1. **Unzip** `Music-App-Level-2.zip` into the source code folder.
2. **Open Terminal** in the `Music-App-Level-2` folder.
3. Run the following command to start the application:

   ```bash
   docker compose up -d
   ```

### Configuration Steps:

#### Config Server Initialization:

```bash
docker exec -it configsvr_container mongosh
rs.initiate({ _id: "configReplSet", configsvr: true, members: [{ _id: 0, host: "configsvr:27017" }] });
# Use Ctrl + C to exit
```

#### Shard 1 Replica Set Initialization:

```bash
docker exec -it shard1-primary_container mongosh
rs.initiate({ _id: "shard1", members: [{ _id: 0, host: "shard1-primary:27017" }] });
# Use Ctrl + C to exit
```

#### Shard 2 Replica Set Initialization:

```bash
docker exec -it shard2-secondary_container mongosh
rs.initiate({ _id: "shard2", members: [{ _id: 0, host: "shard2-secondary:27017" }] });
# Use Ctrl + C to exit
```

#### Add Shards to the Cluster:

```bash
docker exec -it mongos_container mongosh
sh.addShard("shard1/shard1-primary:27017");
sh.addShard("shard2/shard2-secondary:27017");
# To check status:
sh.status();
```

- **Note:** Remember to re-run the backend Docker after configuring the cluster.

---

## Level 3: Multi-VPS Docker Swarm Deployment

### Prerequisites

- Two or more VPS instances running Linux (e.g., Ubuntu).
- Docker installed on each VPS.

### Steps:

1. **Connect to Each VPS** using SSH:

   ```bash
   ssh username@vps_ip_address
   ```

2. **Install Docker** (if not installed):

   ```bash
   sudo apt-get update
   sudo apt-get install -y docker.io
   docker --version
   ```

3. **Initialize Docker Swarm** on the Manager Node:

   ```bash
   docker swarm init --advertise-addr <MANAGER_IP_ADDRESS>
   ```

4. **Join Worker Nodes** to the Swarm:

   ```bash
   docker swarm join --token <SWARM_JOIN_TOKEN> <MANAGER_IP_ADDRESS>:2377
   ```

5. **Verify the Nodes** on the manager node:

   ```bash
   docker node ls
   ```

6. **Create Configuration Files** (`docker-compose.yaml`, `nginx.conf`) on the manager node.

7. **Update Node Availability** (Optional):

   - Drain a node: `docker node update --availability drain <NODE_ID>`
   - Activate a node: `docker node update --availability active <NODE_ID>`

8. **Deploy the Stack**:

   ```bash
   docker stack deploy -c docker-compose.yaml webapp
   ```

9. **Verify Deployment** by visiting `http://<MANAGER_IP_ADDRESS>`.

10. **Monitor Services and Logs**:

   - List running services: `docker service ls`
   - View logs for a service: `docker service logs <service_name>`
   - Inspect a node: `docker node inspect <NODE_ID>`
   - List tasks on a node: `docker node ps <NODE_ID>`

11. **Scale Services** (Optional):

   ```bash
   docker service scale webapp_frontend=2
   ```

---

## Additional Commands

- **Stop the containers**:

  ```bash
  docker compose down
  ```

- **Rebuild the containers** after code changes:

  ```bash
  docker compose up -d --build
  ```

## Important Notices

- Ensure that the ports specified in the `docker-compose.yaml` files of Level 1 and Level 2 are not being used by other processes.
- For Level 3, update security groups or firewall rules to allow necessary traffic on relevant ports (e.g., port 80 for HTTP and 443 for HTTPS).

For more information, watch the [video demo](https://youtube.com/watch?v=n3m30rNU3Cc).



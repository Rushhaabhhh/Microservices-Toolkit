
# Docker

**Docker** is a containerization platform that uses containers to package and deploy applications. A **container** is a lightweight, executable package that includes everything needed to run a software application, such as code, runtime, libraries, and system tools. Docker allows developers to build applications in one environment (e.g., their local machine) and deploy them in another (e.g., cloud or production environment) without worrying about environment-related inconsistencies.

**Containerization** refers to the process of packaging an application and its dependencies into a single container image. The main goal of containerization is to ensure that an application runs consistently across different computing environments, without depending on specific operating system configurations.

#### **Uses of Docker :**

- **Development Consistency :** Ensures applications run the same way across environments.
- **Microservices :** Allows breaking down applications into smaller, independently deployable services.
- **CI/CD :** Integrates into build, test, and deployment pipelines for faster, reliable deployments.
- **Portability :** Containers can run anywhere—locally, on servers, or in the cloud.
- **Isolation :** Ensures applications do not interfere with each other, enhancing security.
#### Key benefits of containerization:

1. **Isolation:** Each container is isolated from others, which means different containers can run different versions of libraries or software without conflicting.

2. **Portability:** Containers can be run on any machine that has the Docker runtime, making it possible to move applications between different environments (e.g., development, testing, production) without compatibility issues.

3. **Efficiency:** Containers share the host operating system's kernel, which makes them lightweight and fast to deploy compared to traditional virtual machines, which require a full guest OS.

4. **Scalability:** Containerized applications can be scaled easily, as containers can be spun up or down in response to demand, without the overhead of setting up virtual machines.

## Docker Basics 

- Docker has three parts : 
### 1. CLI ( Command Line Interface ) : 

- The **Docker CLI** allows users to interact with Docker through commands in the terminal or command prompt.
- Common commands include:
	- `docker build`: Builds a Docker image from a Dockerfile.
	- `docker run`: Runs a container from an image.
	 - `docker ps`: Lists running containers.
	 - `docker pull`: Fetches an image from a registry.
	 - `docker push`: Uploads an image to a registry.
	 - `docker stop`: Stops a running container.
- The CLI is the main interface for developers to manage Docker containers and images on their system.

### 2. Engine :

- The **Docker Engine** is the core component of Docker, responsible for running containers and managing images.
- It is a **client-server** application, consisting of:
    - **Docker Daemon** (Server): The background service responsible for managing containers, images, networks, and volumes.
    - **Docker Client**: The command-line tool or graphical interface that communicates with the Docker Daemon.
- The Docker Engine is responsible for pulling images from registries, creating containers, running applications in containers, and managing them throughout their lifecycle.

### 3. Registry (Docker Hub) :

- **Docker Registry** is a storage system where Docker images are stored and shared. **Docker Hub** is the default public registry.
- **Docker Hub** allows users to:
    - **Store** images: Developers can push their custom images to Docker Hub for easy sharing and versioning.
    - **Pull** images: Users can download official or community images (e.g., MySQL, Ubuntu) directly from Docker Hub.
    - **Search** for images: Users can search for publicly available Docker images in the repository.
- Docker Hub has two types of repositories:
    - **Official Repositories**: These are maintained by Docker and contain widely used images (e.g., official databases, web servers).
    - **User Repositories**: These are public repositories where individual users or organizations can share their custom images.

## Images vs Containers

### Docker Images 
- A **Docker image** is a **read-only** template that contains everything needed to run an application—such as the code, runtime, libraries, dependencies, and system tools.
- Images are essentially the **blueprints** or **templates** used to create Docker containers.

- ### Key Characteristics :
	- **Immutable :** Once created, an image cannot be changed or modified. To make changes, you need to create a new image.
	- **Reusable :** Images can be shared and reused across different systems. Once built, they can be used to create many containers.
	- **Built from Dockerfile :** Docker images are often created from a file called a **Dockerfile**, which specifies all the steps to install the necessary dependencies and set up the environment for the application.
	- **Layered :** Docker images consist of layers, where each layer represents a change in the file system (e.g., installing a package). These layers are cached, allowing for faster builds and reducing storage usage. 
	
- Example : An image might contain a specific version of a web server (e.g., **Nginx**), the application code, and any libraries or configurations required to run that application.

### Docker Containers 
- A **Docker container** is a **running instance** of a Docker image. When you execute a Docker image using the `docker run` command, it creates a container based on that image.
- Containers are **isolated** environments in which applications can run, but they share the host operating system's kernel.

- ### Key Characteristics :
	- **Ephemeral (Temporary):** Containers are designed to be temporary. Once a container is stopped, it is usually deleted, though it can be restarted or paused. However, any changes made during its execution can be saved in a new image or external storage.
	- **Writable:** Unlike images, containers are **writable**. When a container runs, it creates a layer on top of the image (called a **container layer**), where changes (e.g., file modifications) can happen. This layer is specific to the container and can be discarded when the container is removed.
	- **Isolated:** Containers provide process isolation and network isolation, meaning they run independently and don't interfere with other containers or the host system.
	- **Fast to Start:** Containers can start in seconds, as they do not require the overhead of booting an operating system like virtual machines.

- Example : A container running a web server may use the Nginx image but have specific configurations or temporary data inside that container.

### Key Differences :

| **Feature**     | **Docker Image**                                | **Docker Container**                                    |
| --------------- | ----------------------------------------------- | ------------------------------------------------------- |
| **Nature**      | Read-only template                              | Running instance of an image                            |
| **State**       | Immutable (cannot be changed once created)      | Writable (can change state during execution)            |
| **Lifecycle**   | Exists independently, used to create containers | Can be created, started, stopped, and removed           |
| **Storage**     | Stored on disk as layers                        | Stores changes made during runtime (container layer)    |
| **Purpose**     | Blueprint for creating containers               | Environment to run applications                         |
| **Reusability** | Reusable across systems for creating containers | Temporary or persistent, but can be discarded after use |
| **Creation**    | Built from a Dockerfile                         | Created by running a Docker image                       |

- **Docker Hub** is a cloud-based registry for storing, sharing, and discovering Docker container images, enabling developers to access pre-built images and collaborate on containerized applications.

![image](https://github.com/user-attachments/assets/779e97a0-89fa-43e1-816f-1d4b254fd0a7)


## Docker Basic Coding

### Dockerfile

```Dockerfile
FROM node:20                // Base image 

WORKDIR /src/app            // Base working directory

COPY . .                    // Copy everything from workdir to dockerfile

RUN npm install             // Run command for installing dependencies

EXPOSE 3000                 // Expose the right ports

CMD ["npm", "start"]        // Container run command
```

|**Aspect**|**RUN**|**CMD**|
|---|---|---|
|**Purpose**|Executes commands at build time to modify the image.|Specifies the default command to run at container runtime.|
|**Execution Time**|During image creation (at build time).|During container execution (at runtime).|
|**Usage**|Used for installing dependencies, setting up the environment, etc.|Used to define the default process for the container.|
|**Result**|Creates a new layer in the Docker image.|Does not modify the image; runs in the container.|

### Build and Run the Docker Image

```Dockerfile
docker build -t my-node-app .          // Build command with tag and dir 

docker images                          // Shows list of all Docker images

docker run -p 3000:3000 my-node-app    // Start the container
```

- **`-t my-node-app`**: Tags the image with the name `my-node-app`.
- **`.`**: Specifies the current directory as the build context.
- **`-p 3000:3000`**: Maps port 3000 of the container to port 3000 on the host.

###  Pushing on Docker Hub

```Dockerfile
docker login     

// Enter username and password

docker -t my-node-app <your-dockerhub-username>/my-node-app:v1.0

docker push <your-dockerhub-username>/my-node-app:v1.0
```

```Dockerfile
docker pull <your-dockerhub-username>/my-node-app:v1.0

docker run -p 3000:3000 <your-dockerhub-username>/my-node-app:v1.0
```

| **Command**                                | **Description**                                   |
| ------------------------------------------ | ------------------------------------------------- |
| `docker login`                             | Authenticate with Docker Hub.                     |
| `docker -t <image> <username>/<repo>:tag`  | Tag an image for pushing to Docker Hub.           |
| `docker push <username>/<repo>:tag`        | Push an image to Docker Hub.                      |
| `docker pull <username>/<repo>:tag`        | Pull an image from Docker Hub.                    |
| `docker run -p <host>:<container> <image>` | Run a container from the pulled Docker Hub image. |
| `docker logout`                            | Log out from Docker Hub.                          |

## Caching and Layers

### Docker Layers :
- Docker images consist of **layers**, each representing an instruction in the `Dockerfile` (e.g., `FROM`, `WORKDIR`, `RUN`, `COPY`).
- Layers are **stacked** to form a complete image.
- Each layer is **read-only**, and changes create a new layer.

```Dockerfile
FROM node:20                // Layer 1 

WORKDIR /src/app            // Layer 2

COPY . .                    // Layer 3

RUN npm install             // Layer 4
```

- Why use Layers ? 
   1. **Caching** : Layers enable caching, so unchanged layers are reused, avoiding redundant work.
   2. **Reusability** : Shared layers (e.g., `FROM` base images) can be reused across multiple images, saving storage and build time.
   3. **Faster Build Times** : Changes only rebuild affected layers, speeding up incremental builds.
   4. **Modularity** : Each layer represents a specific instruction, making debugging and optimization easier.
   5. **Efficiency** : Layered architecture reduces resource usage in CI/CD pipelines.
   6. **Portability** : Layered images are smaller to transfer since existing layers on the target system are reused.
 
 - Command to inspect image layers : `docker history <image_name>
`

### Docker Build Cache
- Docker caches intermediate layers during the build process to **speed up** subsequent builds.
- If no changes are detected in a layer, Docker reuses the cached version instead of rebuilding it.
- Command to clear cache : `docker builder prune`
#### Caching Optimization

```Dockerfile
FROM node:20          # Base image (cached if unchanged)

WORKDIR /src/app      # Set working directory (cached)

COPY package*.        # Copy dependencies file (cached)

RUN npm install       # Install dependencies (cached if package.json is unchanged)
COPY . .              # Copy source code (rebuild only if files change)

EXPOSE 3000           # Expose application port

CMD ["npm", "start"]  # Default command
```

- ### **Caching Benefits**
	- **Faster Builds**: Layers are reused when unchanged.
	- **Smaller Updates**: Only modified parts are rebuilt.
	- **Cost-Effective**: Reduces compute time for CI/CD pipelines.
	
- Using Specific / Smaller Base Images : For e.g. using `alpine-node` instead of `node:20` or `node:latest`


## Volumes and Networks 

> While using Docker we want local database to retain information across restarts ( Volumes ) and we want to allow one docker container to talk to another cont. ( Networks )

### Volumes 
- Volumes store data outside the container lifecycle, ensuring data is not lost when containers are stopped or removed for persistant storage.
- #### **Types** :
	1. **Anonymous Volumes** :
	    - Created without names.
	    - Useful for temporary storage.
	2. **Named Volumes** : Explicitly named and reusable across containers.
	3. **Bind Mounts** : Maps a host directory to a container directory.

- #### **Commands** :
```Dockerfile
docker volume create my-volume                    // Create a volume

docker run -v my-volume:/app/data my-image        // Use the volume
 
docker volume inspect my-volume                   // Inspect the volumes

docker volume prune                               // Remove unused volumes
```

- For example : 
```Dockerfile
docker pull mongo
docker run -p 27017:27017 mongo

docker volume create vol_database
docker run -v vol_database:/data/db -p 27017:27017 mongo  
```
- The command starts a MongoDB container using the official MongoDB image. It mounts a named volume `vol_database` to the `/data/db` directory inside the container, ensuring persistent storage of database files even if the container stops or is removed and  mapping the container's port 27017 to the host's port 27017. This setup provides both data persistence and external accessibility for MongoDB.

- #### **Issues & Fixes** :

| **Issue**                         | **Fix**                                                         |
| --------------------------------- | --------------------------------------------------------------- |
| Data loss after container removal | Use named volumes for persistent storage.                       |
| Conflicts with host file systems  | Prefer volumes over bind mounts for better isolation.           |
| Permission errors                 | Ensure correct permissions for host directories in bind mounts. |

### Networks 
Networks allow containers to communicate securely, either with each other or external systems for container communication.
- #### **Types**:

1. **Bridge Network** (default) : For isolated container-to-container communication.
2. **Host Network** : Shares the host's network stack, improving performance but reducing isolation.
3. **Overlay Network** : Used in Swarm mode for communication across multiple hosts.
4. **None** : Disables networking for the container.

- #### **Commands :** 
```Dockerfile
docker network ls                                 // List all networks

docker network create my-network                  // Create a network

docker network connect my-network my-container    // Connect a cont to a network
```
- #### **Issues & Fixes**:

|**Issue**|**Fix**|
|---|---|
|Containers can't communicate|Ensure they are on the same network (e.g., a custom bridge).|
|IP conflicts in host network|Avoid `--network=host` unless necessary.|
|DNS resolution issues in containers|Use Docker's internal DNS for container communication.|

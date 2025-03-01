# Industrial  Web App

## Introduction

This project is a React-based industrial website built using Vite for fast development and optimized builds. It is containerized using Docker for easy deployment. The app serves CMS content dynamically while integrating DevOps best practices for **deployment, version control, and CI/CD**.

---

## Features

- **Backend API** with Express.js
- **Frontend UI** with React.js & Chakra UI
- **CMS Content Management** (Fake Data for now)
- **RESTful API Endpoints**
- **CORS-Enabled Communication**
- **Dockerized Deployment**
- **Nginx Reverse Proxy Configuration**
- **GitHub Actions for CI/CD**
- **EC2 Deployment with Docker**

---

## Technologies Used

### **Frontend**

- React.js (with Vite)
- Chakra UI
- Axios (for API requests)
- React Router

### **Backend**

- Node.js
- Express.js
- Mongoose (MongoDB ORM)
- dotenv (for environment variables)
- CORS (Cross-Origin Resource Sharing)

### **DevOps & Deployment**

- Docker
- Nginx
- GitHub Actions (CI/CD)
- PM2 (Process Management for Node.js)
- AWS EC2 Deployment

---

## Installation Guide

### **1. Clone the Repository**

```sh
git clone https://github.com/your-repo/industrial-cms.git
cd industrial-cms
```

### **2. Setup Backend**

```sh
cd backend
npm install
```

Create a **.env** file inside `backend/` and add:

```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run the backend:

```sh
node index.js
```

(Or use **nodemon** for hot reloading)

```sh
npm install -g nodemon
nodemon index.js
```

### **3. Setup Frontend**

```sh
cd frontend
npm install
npm run dev
```

By default, the frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.

---

## API Endpoints

### **Public Endpoints**

- `GET /api/about` → Returns "About Us" content
- `GET /api/solutions` → Returns "Solutions" content
- `GET /api/investors` → Returns "Investor Relations" content
- `GET /api/sustainability` → Returns "Sustainability" content

### **Example Response**

```json
{
  "content": "Welcome to Industrial Co. We provide cutting-edge solutions."
}
```

---

## Docker Setup

### **Building and Running Backend Container**

```sh
docker build -t industrial-backend .
docker run -p 5000:5000 industrial-backend
```

### **Docker Compose Setup**

Create a `docker-compose.yml`:

```yaml
version: '3'
services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
```

Run it:

```sh
docker-compose up -d
```

---

## EC2 Deployment Guide

### **1. Launch an EC2 Instance**
- Use **Amazon Linux 2** or **Ubuntu**
- Assign a **security group** with inbound rules allowing SSH (`22`), HTTP (`80`), and your app port (`5000` or `8080`)

### **2. Connect to EC2 via SSH**
```sh
ssh -i your-key.pem ec2-user@your-ec2-public-ip
```

### **3. Install Docker & Start Service**
```sh
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
```

### **4. Pull & Run Docker Image**
```sh
docker pull your-dockerhub-username/industrial-website
docker run -d -p 80:80 your-dockerhub-username/industrial-website
```

### **5. Check Running Containers**
```sh
docker ps
```

Now, your app should be accessible via `http://your-ec2-public-ip`.

---

## GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Backend

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v2
      
      - name: Build & Push Docker Image
        run: |
          docker build -t your-dockerhub-username/industrial-website .
          docker push your-dockerhub-username/industrial-website
      
      - name: Deploy to EC2
        run: |
          ssh -o StrictHostKeyChecking=no ec2-user@your-ec2-public-ip "docker pull your-dockerhub-username/industrial-website && docker stop industrial-website || true && docker rm industrial-website || true && docker run -d -p 80:80 --name industrial-website your-dockerhub-username/industrial-website"
```

---

## Troubleshooting

### **1. CORS Issues**

If the frontend cannot access the backend, ensure:

- Backend is running on `http://localhost:5000`
- Frontend is on `http://localhost:5173`
- CORS middleware is properly configured in `index.js`

```javascript
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));
```

### **2. Nginx Reverse Proxy Setup**

Ensure the following configuration exists in `/etc/nginx/nginx.conf`:

```nginx
server {
    listen 80;
    
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

Restart Nginx:
```sh
sudo systemctl restart nginx
```

---

## Conclusion

This project provides a **dynamic CMS with a full-stack architecture**, leveraging **DevOps best practices** for smooth deployment and scalability. 🚀

### Future Enhancements

- Implement a real database (MongoDB) instead of static content
- Add authentication & authorization
- Create an admin dashboard for CMS management
- Deploy using Kubernetes for scalability

---

## Author

**Industrial CMS Team**

For questions or contributions, please open an issue or pull request on **GitHub**. 🙌


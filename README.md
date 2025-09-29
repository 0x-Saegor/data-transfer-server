# Data Transfer Server

A comprehensive network reliability testing tool designed to ensure the robustness of network management systems through file upload/download operations and real-world scenario simulation.

## 🎯 Purpose

This project serves as a testing platform to validate the reliability of network management tools by providing:

- **File Transfer Testing**: Upload and download operations of various sizes
- **Network Scenario Simulation**: Mimicking real-world usage patterns like video streaming, online gaming, and web browsing
- **Performance Monitoring**: Real-time speed measurements and progress tracking
- **Continuous Load Testing**: Sustained data transfer operations for stress testing

## 🏗️ Architecture

### Backend (Go)
- **Framework**: Gin Web Framework
- **Port**: 8080
- **API Endpoints**:
  - `GET /download/:size/:unit` - Downloads generated files of specified size
  - `POST /upload` - Handles file uploads with progress tracking
- **Features**:
  - CORS-enabled for cross-origin requests
  - Static file serving for frontend
  - Chunked data transfer for large files
  - Real-time file size conversion and logging

### Frontend (Vue.js)
- **Framework**: Vue 3 
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Features**:
  - Progressive web app interface
  - Real-time transfer progress
  - Drag-and-drop file uploads
  - Multiple testing scenarios
  - Responsive design

## 🚀 Getting Started

### Prerequisites
- **Node.js** 
- **Go** 
- **Docker**

### Local Development

#### Option 1: Manual Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd data-transfer-server
   ```

2. **Start the Backend**
   ```bash
   cd backend
   go mod download
   go run main.go
   ```
   The Go server will start on `http://localhost:8080`

3. **Start the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The Vue.js development server will start on `http://localhost:4000`

#### Option 2: Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application at http://localhost:8080
```

The Docker setup automatically:
- Builds the Vue.js frontend
- Compiles the Go backend
- Serves the complete application on port 8080

## 📸 Images
<img width="2554" height="1338" alt="image" src="https://github.com/user-attachments/assets/0b2a157f-e335-4cd3-ac17-e46ae4b9ff6a" />
<img width="2559" height="1341" alt="image" src="https://github.com/user-attachments/assets/1bb2459a-2bae-4552-9e14-486fc9b8b589" />
<img width="2557" height="1333" alt="image" src="https://github.com/user-attachments/assets/b244b757-b9a5-42ca-8a60-8149ccc464f5" />

---

**Note**: This tool is designed for network testing and development purposes. Ensure appropriate network policies and permissions before deploying in production environments.

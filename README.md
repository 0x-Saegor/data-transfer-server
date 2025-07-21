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
- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Key Libraries**:
  - Vue Router for navigation
  - Pinia for state management
  - VueUse for composable utilities
- **Features**:
  - Progressive web app interface
  - Real-time transfer progress
  - Drag-and-drop file uploads
  - Multiple testing scenarios
  - Responsive design

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v20 or higher)
- **Go** (v1.24.4 or higher)
- **Docker** (optional, for containerized deployment)

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

## 📖 Usage Guide

### File Download Testing
- **Fixed Size Downloads**: Pre-configured options (1MB, 10MB, 100MB)
- **Custom Size Downloads**: Specify any size with units (KB, MB, GB)
- **Continuous Downloads**: Sustained data transfer for stress testing

### File Upload Testing
- **Drag & Drop Interface**: Simple file selection and upload
- **Fixed Size Uploads**: Generate and upload specific file sizes
- **Custom File Uploads**: Upload real files from your system
- **Progress Tracking**: Real-time upload progress and speed monitoring

### Network Scenarios

#### 🎥 Video Streaming Simulation
- Downloads 10MB every 10 seconds
- Simulates typical video streaming bandwidth patterns
- Useful for testing sustained high-bandwidth connections

#### 🎮 Online Gaming Simulation
- Downloads 1KB every second
- Uploads 1KB every second
- Mimics low-latency, frequent data exchanges
- Tests network responsiveness and stability

#### 🌐 Web Browsing Simulation
- Downloads 10 × 50KB files in parallel every 30 seconds
- Uploads 10KB periodically
- Simulates typical web page loading patterns
- Tests concurrent connection handling

#### ⚡ Maximum Usage Testing
- Continuous upload and download at full speed
- Stress tests network infrastructure
- Identifies bandwidth limitations and bottlenecks

## 🔧 API Reference

### Download Endpoint
```http
GET /download/{size}/{unit}
```

**Parameters:**
- `size`: Integer value (e.g., 1, 10, 100)
- `unit`: Size unit (`KB`, `MB`, `GB`)

**Response:**
- Content-Type: `application/octet-stream`
- Content-Length: Calculated file size
- Content-Disposition: Attachment with filename

**Example:**
```bash
curl -O http://localhost:8080/download/50/MB
```

### Upload Endpoint
```http
POST /upload
```

**Request:**
- Content-Type: `multipart/form-data`
- Body: File data with key `file`

**Response:**
```json
{
  "message": "File uploaded successfully"
}
```

**Example:**
```bash
curl -X POST -F "file=@test.txt" http://localhost:8080/upload
```

## 🛠️ Development

### Project Structure
```
data-transfer-server/
├── backend/                # Go backend application
│   ├── main.go             # Main server file with API endpoints
│   ├── go.mod              # Go module dependencies
│   └── go.sum              # Dependency checksums
├── frontend/               # Vue.js frontend application
│   ├── src/
│   │   ├── components/     # Reusable Vue components
│   │   ├── views/          # Page components
│   │   ├── functions/      # API communication logic
│   │   ├── composables/    # Vue composition functions
│   │   └── router/         # Application routing
│   ├── package.json        # Node.js dependencies
│   └── vite.config.ts      # Vite build configuration
├── docker-compose.yml      # Docker orchestration
├── Dockerfile              # Multi-stage Docker build
└── README.md               # This file
```

### Building for Production

#### Frontend
```bash
cd frontend
npm run build
```

#### Backend
```bash
cd backend
go build -o main main.go
```

#### Docker Image
```bash
docker build -t data-transfer-server .
```

### Technology Stack

**Backend:**
- **Go 1.24.4**: High-performance backend language
- **Gin**: Fast HTTP web framework
- **gin-contrib/static**: Static file serving middleware

**Frontend:**
- **Vue.js 3**: Progressive JavaScript framework
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Vue Router**: Official routing library
- **VueUse**: Collection of Vue composition utilities

**DevOps:**
- **Docker**: Containerization platform
- **Docker Compose**: Multi-container application orchestration
- **Alpine Linux**: Lightweight base image for production

## 🔍 Monitoring & Analytics

The application provides real-time metrics including:
- **Transfer Speed**: MB/s measurements during operations
- **Progress Tracking**: Percentage completion for all transfers
- **Elapsed Time**: Duration tracking for performance analysis
- **Packet Counting**: Number of completed transfer operations
- **Error Handling**: Network failure detection and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Support

For questions, issues, or contributions, please open an issue in the repository or contact me directly.

---

**Note**: This tool is designed for network testing and development purposes. Ensure appropriate network policies and permissions before deploying in production environments.

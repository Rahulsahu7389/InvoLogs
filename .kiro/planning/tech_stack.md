# InvoLogs Tech Stack

## Overview
InvoLogs uses a hybrid MERN + Python architecture to leverage the best of both worlds: React's powerful UI capabilities and Python's AI/ML ecosystem for invoice processing.

## Frontend Stack (MERN - React)

### Core Framework
- **React 18+**: Modern UI library with hooks and concurrent features
  - Why: Component-based architecture, excellent for building interactive dashboards
  - Use case: Invoice upload interface, data visualization, real-time logging display

- **Node.js & Express**: Backend API server (if using MERN fully)
  - Why: JavaScript everywhere, easy integration with React frontend
  - Use case: API gateway, authentication, frontend-backend communication

### Key Libraries
- **Axios / Fetch API**: HTTP client for API communication
  - Why: Simple, promise-based requests to Python backend
  - Use case: Sending invoice images, receiving extracted data

- **React Router**: Client-side routing
  - Why: Single-page application navigation
  - Use case: Dashboard, upload page, history view

- **Material-UI / Tailwind CSS**: UI component library
  - Why: Rapid prototyping, professional appearance
  - Use case: Forms, tables, buttons, responsive layout

- **React Query / SWR**: Data fetching and caching
  - Why: Automatic refetching, caching, optimistic updates
  - Use case: Invoice history, real-time status updates

## Backend Stack (Python)

### Core Framework
- **FastAPI / Flask**: Python web framework
  - Why: Fast, async support (FastAPI), easy to build REST APIs
  - Use case: Invoice processing endpoints, AI model serving

### AI/ML Libraries

- **Groq**: High-performance LLM inference
  - Why: Ultra-fast inference speeds (up to 500 tokens/sec), cost-effective
  - Use case: Extracting structured data from invoice text (vendor, amount, date, line items)
  - Model: Likely using Llama 3 or Mixtral models via Groq API

- **OpenCV (cv2)**: Computer vision library
  - Why: Image preprocessing, document enhancement
  - Use case: 
    - Image quality improvement (denoising, contrast adjustment)
    - Document detection and perspective correction
    - Text region detection
    - Preparing images for OCR

- **Tesseract OCR / EasyOCR**: Optical character recognition
  - Why: Extract text from invoice images
  - Use case: Converting invoice images to raw text before LLM processing

- **Pillow (PIL)**: Image manipulation
  - Why: Image format conversion, resizing, basic transformations
  - Use case: Preprocessing images before OpenCV/OCR

### Data Processing
- **Pandas**: Data manipulation and analysis
  - Why: Structured data handling, CSV export
  - Use case: Organizing extracted invoice data, generating reports

- **Pydantic**: Data validation
  - Why: Type-safe data models, automatic validation
  - Use case: Invoice data schema validation

## Database

### Options
- **MongoDB**: NoSQL database (MERN stack)
  - Why: Flexible schema, JSON-like documents
  - Use case: Storing invoice metadata, extracted data, user information

- **PostgreSQL**: Relational database (alternative)
  - Why: ACID compliance, complex queries
  - Use case: Structured invoice data with relationships

- **SQLite**: Lightweight database (for MVP)
  - Why: Zero configuration, file-based
  - Use case: Quick hackathon prototype

## Deployment & Infrastructure

### Hosting Options
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
  - Why: Easy React deployment, CDN, free tier

- **Backend**: Railway, Render, or AWS Lambda
  - Why: Python support, easy deployment, free tier

- **Database**: MongoDB Atlas, Supabase, or AWS RDS
  - Why: Managed service, free tier, automatic backups

### File Storage
- **AWS S3 / Cloudinary**: Image storage
  - Why: Scalable, CDN integration
  - Use case: Storing uploaded invoice images

## Development Tools

- **Git**: Version control
- **Postman / Thunder Client**: API testing
- **Docker**: Containerization (optional for hackathon)
- **Environment Variables**: `.env` files for API keys (Groq API key)

## Architecture Flow

```
User Upload (React) 
  → Frontend API Call (Axios)
    → Backend Endpoint (FastAPI)
      → Image Preprocessing (OpenCV)
        → Text Extraction (OCR)
          → Data Extraction (Groq LLM)
            → Validation (Pydantic)
              → Database Storage (MongoDB)
                → Response to Frontend
                  → Display Results (React)
```

## Why This Stack?

1. **Speed**: Groq provides blazing-fast LLM inference crucial for hackathon demos
2. **Accuracy**: OpenCV + OCR + LLM pipeline ensures robust invoice processing
3. **Familiarity**: MERN stack is widely known, Python is standard for AI/ML
4. **Rapid Development**: All tools have excellent documentation and community support
5. **Scalability**: Architecture can scale from MVP to production
6. **Cost**: Most services have generous free tiers perfect for hackathons

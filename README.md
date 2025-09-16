# Butter Website

Frontend: Vite + React  
Backend: Vercel serverless functions (Node)  
DB: MongoDB Atlas (set MONGODB_URI env var)

Local:
  cd frontend
  npm install
  npm run dev

Build:
  cd frontend
  npm run build

Deploy:
  push to GitHub → Vercel auto-deploy (make sure MONGODB_URI is set in Vercel Environment Variables)

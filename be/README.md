Backend (Node.js/Express)

1) Copy .env.example to .env and set values.
2) Run: npm run dev

Routes:
- POST /api/auth/register { email, password }
- POST /api/auth/login { email, password }

Environment (.env):
- PORT=4000
- MONGO_URI=mongodb://127.0.0.1:27017/healthymart
- JWT_SECRET=your_secure_secret



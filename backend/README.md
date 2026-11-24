# RePlate Backend Setup

## 1. Requirements
- Node.js 18+
- MongoDB local server or MongoDB Atlas

## 2. Install backend packages
Open a terminal:
```bash
cd backend
npm install
```

## 3. Configure environment
Copy `.env.example` to `.env` inside the `backend` folder. Set:
- `MONGODB_URI` to your MongoDB connection string
- `JWT_SECRET` to a long random secret (32+ characters)
- `CLIENT_URL=http://localhost:5173`
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` for the first admin account

Do not upload `.env` to GitHub.

## 4. Start backend
```bash
npm run dev
```
Backend runs at `http://localhost:8080`.

## 5. Create admin
In another terminal, from the backend folder:
```bash
npm run admin:create
```
The admin account is created from the values in `.env`. Public registration cannot create admin users.

## 6. Start frontend
In the project root:
```bash
npm install
npm run dev
```
The frontend calls `http://localhost:8080/api` by default. To change it, create a root `.env` with:
```env
VITE_API_URL=http://localhost:8080/api
```

## API endpoints
- `POST /api/auth/register` (donor/ngo)
- `POST /api/auth/login` (role must match account)
- `GET /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password/:token`
- `GET /api/donations` (authenticated)
- `POST /api/donations` (donor)
- `POST /api/donations/:id/request` (NGO)
- `GET /api/donations/requests/mine` (NGO/admin)
- `PATCH /api/donations/requests/:requestId` (admin)
- `POST /api/volunteers`
- `GET /api/volunteers` (admin)
- `POST /api/contact`
- `GET /api/contact` (admin)
- `GET /api/admin/stats` (admin)
- `GET /api/admin/users` (admin)

## Important notes
- Password reset currently logs a reset token to the backend terminal. Configure an email provider before production use.
- The Find Food page in the supplied frontend still contains hard-coded sample listings. It must be switched to `GET /api/donations` to display real database donations.
- Donation/volunteer/contact API endpoints are provided. Their existing frontend form handlers still need to be changed to call these endpoints; login and registration are connected in this version.
- Admin dashboard is a basic signed-in landing page, not a complete management UI.

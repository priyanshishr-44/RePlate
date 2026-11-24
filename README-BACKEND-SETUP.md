# RePlate: frontend + backend connection

See `backend/README.md` for complete setup commands and API routes.

The existing login and registration pages now call the backend:
- Login: `POST /api/auth/login`
- Register: `POST /api/auth/register`
- Successful login/register stores JWT and user data, then navigates to `/dashboard`.

The supplied Donate, Find Food, Volunteer and Contact pages still need their form handlers/listing fetches wired to the included APIs. The API routes are implemented; the README identifies this remaining frontend integration work.

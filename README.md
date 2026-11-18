# Car Show Registration

A car-show registration dashboard built with React, with a C# backend planned for API integration.

## Team and roles

| Team member | Role |
| --- | --- |
| Kathryn Astillero | Frontend: React dashboard, components, and styling |
| Backend teammate | Backend: C# API, database, and registration endpoints |

## Repository structure

```text
car-show-registration/
├── backend/                 # C# solution (backend developer)
├── frontend/                # React app
├── docs/
│   └── screenshots/         # Dashboard and feature screenshots
└── README.md                # Team, roles, and setup instructions
```

The local clone folder can have a different name. The `.gitkeep` files keep empty directories visible in GitHub; remove them when real files are added.

## Current status

The frontend runs with 25 fictional sample registrations. It includes summary cards, search and filters, registration and payment badges, skeleton loading, pagination, and a page-size selector. The live C# API is not connected yet. The `backend/` directory is reserved for the backend developer's solution; no backend project is included in this checkout yet.

## Run the frontend

Install Node.js with npm, using a version supported by the project's Vite dependency.

From the repository root:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite. Run these commands inside `frontend/` to check the app:

```powershell
npm run build
npm run lint
```

## Run the backend

These steps apply after the backend developer adds the C# solution under `backend/`. The assignment specifies the .NET 10 SDK.

```powershell
cd backend
dotnet restore
```

For the assignment template, run the API project from `backend/`:

```powershell
dotnet run --project Api
```

The backend's SDK version, actual project path, database setup, and required configuration must be documented when the solution is added. Use the API URL printed by `dotnet run` for frontend configuration.

## Connect both apps

1. Run the C# API and allow the frontend's local origin in its CORS configuration.
2. Create `frontend/.env.development` and set the actual API URL, for example:

   ```dotenv
   VITE_API_BASE_URL=http://localhost:5205
   ```

3. In `frontend/src/pages/RegistrationsPage.jsx`, change the data import from `../api/sample-data` to `../api/registrationsApi`.
4. Restart the frontend development server and update the visible sample-data labels once the live connection is verified.

The frontend API helper expects `GET /api/registrations` and `GET /api/registrations/summary`. Confirm the response fields and filter values with the backend developer before connecting.

## Screenshots

Save dashboard and feature screenshots in `docs/screenshots/`, using descriptive names such as `dashboard.png` or `registration-loading.png`.

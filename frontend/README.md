# AutoVista frontend

React dashboard layout with 25 local sample registrations. All displayed records are fictional sample data, not live registrations.

## Run

From frontend/: npm install, then npm run dev.

## Connect the real API

1. Create frontend/.env.development with VITE_API_BASE_URL set to your partner's actual API URL (example: http://localhost:5205).
2. In src/pages/RegistrationsPage.jsx change the import from ../api/sample-data to ../api/registrationsApi.
3. Restart the Vite server after changing environment settings.
4. Replace the visible Sample data and Local sample preview labels when connecting the real API.

Both API modules export getRegistrations({ participantName, type, status, page, pageSize }) and getSummary(). The response keys and enum values follow the assignment. Summary cards use getSummary(), independently of the current table page.

The page owns filters, pagination, data, loading and error state. Components use the assignment names. Styling uses Bootstrap utilities with custom dashboard CSS.

This layout has not been committed or pushed automatically. Review and understand each part before submitting it as your own work.


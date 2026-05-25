# Video Demo Guide

## Start The Demo

Run this from the project root:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-demo.ps1
```

Wait for:

- backend to start on `import.meta.env.VITE_API_BASE_URL`
- frontend to start on `http://localhost:5173`

## Demo Accounts

- `admin@college.edu` / `password123`
- `teacher@college.edu` / `password123`
- `hod@college.edu` / `password123`
- `student@college.edu` / `password123`

## Best Recording Flow

### 1. Login Screen

- Open `http://localhost:5173`
- Show the role selector
- Log in once as `Admin`

### 2. Admin Flow

Show these pages from the sidebar:

- `Dashboard`
- `Departments`
- `Teachers`
- `Students`
- `Reports`
- `Settings`

Good talking points:

- admin can manage departments and users
- reports and analytics are available
- interactive workspace cards support search, filters, notes, and checklist actions

### 3. Teacher Flow

Log out, then sign in as `Teacher`.

Show:

- `Dashboard`
- `My Classes`
- `Attendance`
- `Students`
- `Reports`

Good talking points:

- teachers can manage classes and attendance
- attendance page supports manual and QR modes
- faculty data now includes Priyanka Mane, Aarti Deshmukh, and Padma Nimbhore

### 4. HOD Flow

Log out, then sign in as `HOD`.

Show:

- `Dashboard`
- `Courses`
- `Teachers`
- `Attendance`
- `Alerts`
- `Reports`

Good talking points:

- HOD can monitor courses and faculty
- department views show `HOD: Vijaykumar Mantri`
- alerts and reports help track low attendance and follow-up actions

### 5. Student Flow

Log out, then sign in as `Student`.

Show:

- `Dashboard`
- `My Attendance`
- `Courses`
- `Profile`

Good talking points:

- students can track subject attendance
- they can review their courses and profile
- the UI supports a full role-based workflow

## Recording Tips

- Use browser zoom around `90%` or `100%`
- Record in full screen
- Pause 1 to 2 seconds after each page opens
- Keep one short narration for each role
- If needed, use `Ctrl + F5` before recording to refresh seeded UI changes

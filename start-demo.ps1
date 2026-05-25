$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverPath = Join-Path $projectRoot "server"
$clientPath = Join-Path $projectRoot "client"

Write-Host ""
Write-Host "Starting College Attendance Management System demo..." -ForegroundColor Cyan
Write-Host ""

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$serverPath'; npm run dev"
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$clientPath'; npm run dev"

Write-Host "Backend window opened for: $serverPath" -ForegroundColor Green
Write-Host "Frontend window opened for: $clientPath" -ForegroundColor Green
Write-Host ""
Write-Host "Demo URL: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "Demo accounts:" -ForegroundColor Cyan
Write-Host "  Admin   : admin@college.edu / password123"
Write-Host "  Teacher : teacher@college.edu / password123"
Write-Host "  HOD     : hod@college.edu / password123"
Write-Host "  Student : student@college.edu / password123"
Write-Host ""
Write-Host "Recording tip: wait until both terminals finish loading, then open the browser and start recording." -ForegroundColor Magenta

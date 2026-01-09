# 🔄 Script para Recarregar PATH no PowerShell
# Execute: .\recarregar-path.ps1
# Use quando adicionar algo ao PATH e não funcionar imediatamente

Write-Host ""
Write-Host "🔄 Recarregando PATH do sistema..." -ForegroundColor Cyan
Write-Host ""

# Recarrega o PATH do sistema e do usuário
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "✅ PATH recarregado!" -ForegroundColor Green
Write-Host ""

# Testa npm
Write-Host "🧪 Testando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm -v 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ npm funcionando! Versão: $npmVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ npm ainda não funciona" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ npm não encontrado" -ForegroundColor Red
    Write-Host "   Tente fechar e reabrir o terminal" -ForegroundColor Yellow
}

Write-Host ""

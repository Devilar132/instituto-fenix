# Script para instalar dependências
# Use: .\instalar-deps.ps1

$npmPath = "C:\Program Files\nodejs\npm.cmd"

if (Test-Path $npmPath) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Green
    & $npmPath install
} else {
    Write-Host "❌ npm não encontrado em: $npmPath" -ForegroundColor Red
    Write-Host "Verifique se o Node.js está instalado corretamente." -ForegroundColor Yellow
}

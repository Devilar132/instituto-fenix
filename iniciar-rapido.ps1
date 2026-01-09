# 🚀 Script Rápido para Iniciar o Projeto
# Execute: .\iniciar-rapido.ps1

# Recarrega o PATH do sistema (importante após adicionar ao PATH)
Write-Host "🔄 Recarregando PATH..." -ForegroundColor Cyan
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Se ainda não estiver, adiciona manualmente
$nodePath = "C:\Program Files\nodejs\"
if (Test-Path $nodePath) {
    if ($env:Path -notlike "*$nodePath*") {
        $env:Path += ";$nodePath"
        Write-Host "✅ Node.js adicionado ao PATH" -ForegroundColor Green
    }
}

# Verifica se npm funciona
try {
    $npmVersion = npm -v 2>&1
    Write-Host "✅ npm versão: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm não encontrado. Execute: .\corrigir-npm.ps1" -ForegroundColor Red
    exit 1
}

# Verifica se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

# Inicia o servidor
Write-Host ""
Write-Host "🚀 Iniciando servidor de desenvolvimento..." -ForegroundColor Cyan
Write-Host "   Acesse: http://localhost:3000" -ForegroundColor Green
Write-Host ""
npm run dev

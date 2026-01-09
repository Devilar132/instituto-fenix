# Script para iniciar o ambiente de desenvolvimento
# Execute: .\iniciar.ps1

# Adiciona Node.js ao PATH da sessão atual
$nodePath = "C:\Program Files\nodejs\"
if (Test-Path $nodePath) {
    if ($env:Path -notlike "*$nodePath*") {
        $env:Path += ";$nodePath"
        Write-Host "✅ Node.js adicionado ao PATH desta sessão" -ForegroundColor Green
    }
}

# Verifica se npm está disponível
try {
    $npmVersion = npm -v 2>&1
    Write-Host "✅ npm versão: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm não encontrado" -ForegroundColor Red
    exit 1
}

# Verifica se as dependências estão instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

# Inicia o servidor
Write-Host "🚀 Iniciando servidor de desenvolvimento..." -ForegroundColor Cyan
Write-Host "Acesse: http://localhost:3000" -ForegroundColor Green
Write-Host ""

npm run dev

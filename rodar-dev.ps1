# Script para rodar o servidor de desenvolvimento
# Use: .\rodar-dev.ps1

Write-Host ""
Write-Host "🚀 Iniciando servidor de desenvolvimento..." -ForegroundColor Cyan
Write-Host ""

# Caminhos possíveis do Node.js
$possiblePaths = @(
    "C:\Program Files\nodejs\",
    "C:\Program Files (x86)\nodejs\",
    "$env:LOCALAPPDATA\Programs\nodejs\",
    "$env:ProgramFiles\nodejs\"
)

$nodePath = $null
$npmPath = $null

# Procura o Node.js
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $npmExe = Join-Path $path "npm.cmd"
        if (Test-Path $npmExe) {
            $nodePath = $path
            $npmPath = $npmExe
            break
        }
    }
}

# Se não encontrou, tenta adicionar ao PATH da sessão
if (-not $npmPath) {
    # Tenta adicionar ao PATH da sessão atual
    $defaultPath = "C:\Program Files\nodejs\"
    if (Test-Path $defaultPath) {
        $env:Path += ";$defaultPath"
        $npmPath = Join-Path $defaultPath "npm.cmd"
        if (Test-Path $npmPath) {
            Write-Host "✅ Node.js encontrado e adicionado ao PATH" -ForegroundColor Green
        }
    }
}

# Verifica se npm está disponível
if (-not $npmPath -or -not (Test-Path $npmPath)) {
    Write-Host "❌ npm não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Execute primeiro:" -ForegroundColor Yellow
    Write-Host "   .\corrigir-npm.ps1" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Ou instale o Node.js de: https://nodejs.org/" -ForegroundColor Cyan
    Write-Host ""
    pause
    exit 1
}

# Verifica se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências primeiro..." -ForegroundColor Yellow
    Write-Host ""
    & $npmPath install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
        pause
        exit 1
    }
    Write-Host ""
}

# Inicia o servidor
Write-Host "✅ Iniciando servidor..." -ForegroundColor Green
Write-Host "   Acesse: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
& $npmPath run dev

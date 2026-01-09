# 🔧 Script para Corrigir Problema do npm não Reconhecido
# Execute: .\corrigir-npm.ps1

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🔧 CORRIGINDO PROBLEMA DO NPM" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Caminhos possíveis do Node.js
$possiblePaths = @(
    "C:\Program Files\nodejs\",
    "C:\Program Files (x86)\nodejs\",
    "$env:LOCALAPPDATA\Programs\nodejs\",
    "$env:ProgramFiles\nodejs\"
)

$nodePath = $null

# Procura o Node.js
Write-Host "🔍 Procurando Node.js instalado..." -ForegroundColor Yellow
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $nodeExe = Join-Path $path "node.exe"
        if (Test-Path $nodeExe) {
            $nodePath = $path
            Write-Host "✅ Node.js encontrado em: $nodePath" -ForegroundColor Green
            break
        }
    }
}

if (-not $nodePath) {
    Write-Host ""
    Write-Host "❌ Node.js não foi encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 Você precisa instalar o Node.js primeiro:" -ForegroundColor Yellow
    Write-Host "   1. Acesse: https://nodejs.org/" -ForegroundColor Cyan
    Write-Host "   2. Baixe a versão LTS" -ForegroundColor Cyan
    Write-Host "   3. Execute o instalador" -ForegroundColor Cyan
    Write-Host "   4. Marque 'Add to PATH' durante a instalação" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📄 Veja o arquivo INSTALAR_NODEJS.md para mais detalhes" -ForegroundColor Gray
    Write-Host ""
    pause
    exit 1
}

# Adiciona ao PATH da sessão atual (temporário)
Write-Host ""
Write-Host "🔧 Adicionando Node.js ao PATH desta sessão..." -ForegroundColor Yellow
if ($env:Path -notlike "*$nodePath*") {
    $env:Path += ";$nodePath"
    Write-Host "✅ Node.js adicionado ao PATH desta sessão!" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Node.js já está no PATH desta sessão" -ForegroundColor Cyan
}

# Testa se funciona
Write-Host ""
Write-Host "🧪 Testando se npm funciona..." -ForegroundColor Yellow
try {
    $npmVersion = & "$nodePath\npm.cmd" -v 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ npm funcionando! Versão: $npmVersion" -ForegroundColor Green
    } else {
        throw "npm não funcionou"
    }
} catch {
    Write-Host "❌ Erro ao testar npm" -ForegroundColor Red
    Write-Host "   Detalhes: $_" -ForegroundColor Gray
    pause
    exit 1
}

# Verifica se está no PATH do sistema (permanente)
Write-Host ""
Write-Host "🔍 Verificando se está configurado permanentemente..." -ForegroundColor Yellow
$systemPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
$isInSystemPath = $systemPath -like "*$nodePath*"

if (-not $isInSystemPath) {
    Write-Host "⚠️  Node.js NÃO está no PATH do sistema (permanente)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 Você tem duas opções:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   OPÇÃO 1: Usar apenas nesta sessão (temporário)" -ForegroundColor White
    Write-Host "   - npm já funciona AGORA neste terminal" -ForegroundColor Gray
    Write-Host "   - Mas não funcionará em outros terminais" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   OPÇÃO 2: Configurar permanentemente (recomendado)" -ForegroundColor White
    Write-Host "   - npm funcionará em TODOS os terminais" -ForegroundColor Gray
    Write-Host "   - Precisa executar como Administrador" -ForegroundColor Gray
    Write-Host ""
    
    $response = Read-Host "Deseja configurar permanentemente? (S/N)"
    if ($response -eq "S" -or $response -eq "s") {
        Write-Host ""
        Write-Host "⚠️  Você precisa executar como Administrador para isso!" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Execute este comando em um PowerShell como Administrador:" -ForegroundColor Cyan
        Write-Host "   [Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';$nodePath', 'Machine')" -ForegroundColor White
        Write-Host ""
        Write-Host "OU use o script configurar-path.ps1 como Administrador" -ForegroundColor Cyan
        Write-Host ""
    }
} else {
    Write-Host "✅ Node.js já está configurado permanentemente!" -ForegroundColor Green
    Write-Host "   Mas você precisa fechar e reabrir o terminal para funcionar" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ CONFIGURAÇÃO CONCLUÍDA!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Teste se funciona:" -ForegroundColor White
Write-Host "   npm -v" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Instale as dependências:" -ForegroundColor White
Write-Host "   npm install" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Inicie o servidor:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

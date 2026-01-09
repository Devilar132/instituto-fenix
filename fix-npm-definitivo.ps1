# 🔧 SOLUÇÃO DEFINITIVA para npm não funcionar
# Execute: .\fix-npm-definitivo.ps1

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🔧 CORRIGINDO NPM DEFINITIVAMENTE" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# 1. Recarrega PATH
Write-Host "1️⃣ Recarregando PATH..." -ForegroundColor Yellow
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Write-Host "   ✅ PATH recarregado" -ForegroundColor Green

# 2. Verifica se npm existe
$npmPath = "C:\Program Files\nodejs\npm.cmd"
if (-not (Test-Path $npmPath)) {
    Write-Host "❌ npm não encontrado em: $npmPath" -ForegroundColor Red
    exit 1
}
Write-Host "2️⃣ npm encontrado: $npmPath" -ForegroundColor Green

# 3. Cria alias permanente para esta sessão
Write-Host "3️⃣ Criando alias 'npm'..." -ForegroundColor Yellow
Remove-Item alias:npm -ErrorAction SilentlyContinue
Set-Alias -Name npm -Value "$npmPath" -Scope Global -Force
Write-Host "   ✅ Alias criado" -ForegroundColor Green

# 4. Testa
Write-Host "4️⃣ Testando npm..." -ForegroundColor Yellow
try {
    $version = & $npmPath -v 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ npm funcionando! Versão: $version" -ForegroundColor Green
    } else {
        throw "Erro"
    }
} catch {
    Write-Host "   ❌ Erro ao testar npm" -ForegroundColor Red
    Write-Host "   Tentando método alternativo..." -ForegroundColor Yellow
    
    # Método alternativo: usar diretamente
    & "C:\Program Files\nodejs\npm.cmd" -v
}

# 5. Adiciona ao perfil do PowerShell
Write-Host "5️⃣ Configurando perfil do PowerShell..." -ForegroundColor Yellow
$profilePath = $PROFILE.CurrentUserAllHosts
$profileDir = Split-Path $profilePath -Parent

if (-not (Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
}

$profileCode = @"

# Fix npm - Adicionado por fix-npm-definitivo.ps1
`$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
if (Test-Path "C:\Program Files\nodejs\npm.cmd") {
    Remove-Item alias:npm -ErrorAction SilentlyContinue
    Set-Alias -Name npm -Value "C:\Program Files\nodejs\npm.cmd" -Scope Global -Force
}
"@

$profileContent = ""
if (Test-Path $profilePath) {
    $profileContent = Get-Content $profilePath -Raw
}

if ($profileContent -like "*Fix npm*") {
    Write-Host "   ⚠️  Já configurado no perfil" -ForegroundColor Yellow
} else {
    Add-Content -Path $profilePath -Value "`n$profileCode"
    Write-Host "   ✅ Perfil configurado: $profilePath" -ForegroundColor Green
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ CONFIGURAÇÃO CONCLUÍDA!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 TESTE AGORA:" -ForegroundColor Yellow
Write-Host "   npm -v" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host "   1. Feche e reabra o PowerShell" -ForegroundColor White
Write-Host "   2. O npm funcionará automaticamente!" -ForegroundColor White
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

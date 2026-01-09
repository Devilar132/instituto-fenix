# 🔧 Script para Configurar Perfil do PowerShell
# Este script adiciona uma função ao perfil do PowerShell que recarrega o PATH automaticamente
# Execute: .\configurar-perfil-powershell.ps1

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🔧 CONFIGURANDO PERFIL DO POWERSHELL" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Verifica se o perfil existe
$profilePath = $PROFILE.CurrentUserAllHosts
$profileDir = Split-Path $profilePath -Parent

if (-not (Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
    Write-Host "✅ Diretório do perfil criado: $profileDir" -ForegroundColor Green
}

# Função para recarregar PATH
$functionCode = @"
# Função para recarregar PATH do sistema
function Reload-Path {
    `$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    Write-Host "✅ PATH recarregado!" -ForegroundColor Green
    npm -v | Out-Null
    if (`$LASTEXITCODE -eq 0) {
        Write-Host "✅ npm funcionando!" -ForegroundColor Green
    }
}

# Alias curto
Set-Alias -Name rpath -Value Reload-Path
"@

# Verifica se já existe
$profileContent = ""
if (Test-Path $profilePath) {
    $profileContent = Get-Content $profilePath -Raw
}

if ($profileContent -like "*Reload-Path*") {
    Write-Host "⚠️  A função já existe no perfil!" -ForegroundColor Yellow
    Write-Host "   Perfil: $profilePath" -ForegroundColor Gray
} else {
    # Adiciona ao perfil
    Add-Content -Path $profilePath -Value "`n# Função para recarregar PATH (adicionado por configurar-perfil-powershell.ps1)`n$functionCode"
    Write-Host "✅ Função adicionada ao perfil!" -ForegroundColor Green
    Write-Host "   Perfil: $profilePath" -ForegroundColor Gray
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ CONFIGURAÇÃO CONCLUÍDA!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 COMO USAR:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Feche e reabra o PowerShell" -ForegroundColor White
Write-Host ""
Write-Host "2. Use o comando:" -ForegroundColor White
Write-Host "   Reload-Path" -ForegroundColor Cyan
Write-Host "   ou" -ForegroundColor Gray
Write-Host "   rpath" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Isso recarrega o PATH automaticamente!" -ForegroundColor White
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

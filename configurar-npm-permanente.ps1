# Configura npm para funcionar automaticamente em todos os terminais
# Execute como Administrador: .\configurar-npm-permanente.ps1

$profilePath = $PROFILE.CurrentUserAllHosts
$profileDir = Split-Path $profilePath -Parent

# Cria diretorio se nao existir
if (-not (Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
}

# Codigo para adicionar ao perfil
$code = @"

# Auto-fix npm - Adicionado automaticamente
`$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
if (Test-Path "C:\Program Files\nodejs\npm.cmd") {
    Remove-Item alias:npm -ErrorAction SilentlyContinue
    Set-Alias -Name npm -Value "C:\Program Files\nodejs\npm.cmd" -Scope Global -Force
}
"@

# Verifica se ja existe
$exists = $false
if (Test-Path $profilePath) {
    $content = Get-Content $profilePath -Raw
    if ($content -like "*Auto-fix npm*") {
        $exists = $true
    }
}

if (-not $exists) {
    Add-Content -Path $profilePath -Value $code
    Write-Host "OK! Perfil configurado: $profilePath" -ForegroundColor Green
    Write-Host "Feche e reabra o PowerShell. npm funcionara automaticamente!" -ForegroundColor Yellow
} else {
    Write-Host "Ja esta configurado no perfil!" -ForegroundColor Yellow
}

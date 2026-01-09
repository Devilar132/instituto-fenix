# Fix npm - Solucao definitiva
# Execute: .\fix-npm.ps1

Write-Host "Corrigindo npm..." -ForegroundColor Yellow

# Recarrega PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Cria alias
$npmCmd = "C:\Program Files\nodejs\npm.cmd"
if (Test-Path $npmCmd) {
    Remove-Item alias:npm -ErrorAction SilentlyContinue
    Set-Alias -Name npm -Value $npmCmd -Scope Global -Force
    Write-Host "OK! npm configurado" -ForegroundColor Green
    npm -v
} else {
    Write-Host "ERRO: npm nao encontrado" -ForegroundColor Red
}

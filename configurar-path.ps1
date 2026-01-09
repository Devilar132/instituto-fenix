# Script para configurar o PATH do Windows para Node.js
# Execute como Administrador: .\configurar-path.ps1

Write-Host "🔧 Configurando PATH para Node.js..." -ForegroundColor Cyan

# Verifica se está rodando como administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ Este script precisa ser executado como Administrador!" -ForegroundColor Red
    Write-Host "Clique com botão direito no PowerShell e selecione 'Executar como administrador'" -ForegroundColor Yellow
    pause
    exit 1
}

# Caminho padrão do Node.js
$nodePath = "C:\Program Files\nodejs\"

# Verifica se o Node.js está instalado
if (-not (Test-Path $nodePath)) {
    Write-Host "❌ Node.js não encontrado em: $nodePath" -ForegroundColor Red
    Write-Host "Verifique se o Node.js está instalado corretamente." -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "✅ Node.js encontrado em: $nodePath" -ForegroundColor Green

# Obtém o PATH atual do sistema
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")

# Verifica se já está no PATH
if ($currentPath -like "*$nodePath*") {
    Write-Host "⚠️  O caminho já está configurado no PATH!" -ForegroundColor Yellow
    Write-Host "Caminho atual: $nodePath" -ForegroundColor Gray
} else {
    # Adiciona ao PATH
    $newPath = $currentPath + ";" + $nodePath
    [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
    
    Write-Host "✅ PATH configurado com sucesso!" -ForegroundColor Green
    Write-Host "Caminho adicionado: $nodePath" -ForegroundColor Gray
}

Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ CONFIGURAÇÃO CONCLUÍDA!" -ForegroundColor Green
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Feche TODOS os terminais abertos" -ForegroundColor White
Write-Host "   (PowerShell, CMD, VS Code, etc.)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Abra um NOVO terminal" -ForegroundColor White
Write-Host ""
Write-Host "3. Teste se funcionou:" -ForegroundColor White
Write-Host "   npm -v" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Se mostrar a versão, está funcionando! 🎉" -ForegroundColor Green
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

pause

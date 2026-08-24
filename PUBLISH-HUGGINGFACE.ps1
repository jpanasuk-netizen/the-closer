# Publish THE CLOSER static Space to Hugging Face.
# Requires: hf auth login   (https://huggingface.co/settings/tokens)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$spaceDir = Join-Path $PSScriptRoot "_hf_space"
if (-not (Test-Path $spaceDir)) {
  Write-Host "Missing _hf_space. Copy public site files there first."
  exit 1
}

Copy-Item "$PSScriptRoot\index.html" "$spaceDir\index.html" -Force
Copy-Item "$PSScriptRoot\playbook.html" "$spaceDir\playbook.html" -Force
Copy-Item "$PSScriptRoot\css\*" "$spaceDir\css" -Force
Copy-Item "$PSScriptRoot\js\*" "$spaceDir\js" -Force
Copy-Item "$PSScriptRoot\data\*" "$spaceDir\data" -Force

hf auth whoami
if ($LASTEXITCODE -ne 0) {
  Write-Host "Logging into Hugging Face..."
  hf auth login
}

hf upload jpanasuk/the-closer $spaceDir . --repo-type space --commit-message "IPS playbook: documentation standards, performance, coaching"
Write-Host ""
Write-Host "LIVE: https://huggingface.co/spaces/jpanasuk/the-closer"
Start-Process "https://huggingface.co/spaces/jpanasuk/the-closer"

# Publish THE CLOSER to GitHub Pages.
# Run this in PowerShell. First time it will open a browser to log in.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Host "Install GitHub CLI first: https://cli.github.com/"
  exit 1
}

Remove-Item Env:GITHUB_TOKEN -ErrorAction SilentlyContinue
Remove-Item Env:GH_TOKEN -ErrorAction SilentlyContinue

gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Logging into GitHub (browser will open)..."
  gh auth login -h github.com -p https -w
}

$owner = (gh api user --jq .login)
$repo = "the-closer"
$url = "https://$owner.github.io/$repo/"

if (-not (Test-Path .git)) {
  git init
  git checkout -b main
}

git add -A
git status
git commit -m "THE CLOSER campaign site" --allow-empty

$exists = gh repo view "$owner/$repo" 2>$null
if ($LASTEXITCODE -ne 0) {
  gh repo create $repo --public --source=. --remote=origin --push
} else {
  git remote remove origin 2>$null
  git remote add origin "https://github.com/$owner/$repo.git"
  git push -u origin main
}

gh api --method POST "repos/$owner/$repo/pages" -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/" 2>$null
Start-Sleep -Seconds 3
gh api --method PUT "repos/$owner/$repo/pages" -f "source[branch]=main" -f "source[path]=/" 2>$null

Write-Host ""
Write-Host "LIVE IN A MINUTE:"
Write-Host $url
Write-Host "Repo: https://github.com/$owner/$repo"
Start-Process $url

# Crea lo zip da caricare sul Chrome Web Store con i soli file dell'estensione
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$version = (Get-Content manifest.json -Raw | ConvertFrom-Json).version
$zip = Join-Path $root "save-image-as-v$version.zip"

# Solo i file usati dall'estensione, con il loro percorso relativo
$include = @(
  'manifest.json',
  'background.js',
  'popup.html',
  'popup.js',
  'bulk.html',
  'bulk.js',
  'icons/icon16.png',
  'icons/icon48.png',
  'icons/icon128.png'
)
$include += Get-ChildItem _locales -Recurse -Filter messages.json |
  ForEach-Object { [IO.Path]::GetRelativePath($root, $_.FullName) }

foreach ($item in $include) {
  if (-not (Test-Path $item)) { throw "File mancante: $item" }
}

# Controllo validità JSON di manifest e file di lingua
$include | Where-Object { $_ -like '*.json' } | ForEach-Object {
  Get-Content $_ -Raw | ConvertFrom-Json | Out-Null
}

# Cartella temporanea con la stessa struttura dell'estensione
$stage = Join-Path ([IO.Path]::GetTempPath()) "save-image-as-package-$PID"
New-Item -ItemType Directory -Path $stage | Out-Null
try {
  foreach ($item in $include) {
    $dest = Join-Path $stage $item
    New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
    Copy-Item $item $dest
  }
  if (Test-Path $zip) { Remove-Item $zip -Confirm:$false }
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  [IO.Compression.ZipFile]::CreateFromDirectory($stage, $zip, [IO.Compression.CompressionLevel]::SmallestSize, $false)
} finally {
  Remove-Item $stage -Recurse -Force -Confirm:$false
}

Write-Host ("Creato {0} ({1:N1} KB)" -f (Split-Path $zip -Leaf), ((Get-Item $zip).Length / 1KB))

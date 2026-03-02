Add-Type -AssemblyName System.Drawing
$path = "C:\Users\SOUMYA\.gemini\antigravity\brain\7ac3db0f-6246-449e-b686-3cc5d6630878\media__1772435434673.jpg"
$img = [System.Drawing.Image]::FromFile($path)
$bmp = New-Object System.Drawing.Bitmap($img)

# Sample some pixels to find the dark area (the photo)
for ($y = 0; $y -lt $bmp.Height; $y += 5) {
  $line = ""
  for ($x = 0; $x -lt $bmp.Width; $x += 10) {
    $p = $bmp.GetPixel($x, $y)
    # Darkness check (simple grayscale)
    $brightness = ($p.R + $p.G + $p.B) / 3
    if ($brightness -lt 50) {
      $line += "#"
    }
    else {
      $line += "."
    }
  }
  Write-Host $line
}

$bmp.Dispose()
$img.Dispose()

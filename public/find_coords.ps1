Add-Type -AssemblyName System.Drawing
$path = "h:\Projects\wall poster\public\mockup.jpg"
$img = [System.Drawing.Image]::FromFile($path)
$bmp = New-Object System.Drawing.Bitmap($img)

$minX = $bmp.Width
$minY = $bmp.Height
$maxX = 0
$maxY = 0
$threshold = 60 # Sightly higher threshold

# Scan almost the whole image but avoid edges
$startX = 100
$endX = 900
$startY = 50
$endY = 600

for ($y = $startY; $y -lt $endY; $y++) {
  for ($x = $startX; $x -lt $endX; $x++) {
    $p = $bmp.GetPixel($x, $y)
    $b = ($p.R + $p.G + $p.B) / 3
    if ($b -lt $threshold) {
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

Write-Host "RESULT_COORDS: $minX, $minY, $($maxX - $minX), $($maxY - $minY)"
$bmp.Dispose()
$img.Dispose()

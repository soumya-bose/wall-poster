Add-Type -AssemblyName System.Drawing
$path = "h:\Projects\wall poster\public\mockup.jpg"
$img = [System.Drawing.Image]::FromFile($path)
$bmp = New-Object System.Drawing.Bitmap($img)

$midY = [int]($bmp.Height / 2)
Write-Host "Horizontal scan at Y=$midY"
for ($x = 0; $x -lt $bmp.Width; $x += 5) {
  $p = $bmp.GetPixel($x, $midY)
  $b = ($p.R + $p.G + $p.B) / 3
  Write-Host "$x,$b"
}

$midX = [int]($bmp.Width / 2)
Write-Host "Vertical scan at X=$midX"
for ($y = 0; $y -lt $bmp.Height; $y += 5) {
  $p = $bmp.GetPixel($midX, $y)
  $b = ($p.R + $p.G + $p.B) / 3
  Write-Host "$y,$b"
}

$bmp.Dispose()
$img.Dispose()

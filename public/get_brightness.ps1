Add-Type -AssemblyName System.Drawing
$path = "C:\Users\SOUMYA\.gemini\antigravity\brain\7ac3db0f-6246-449e-b686-3cc5d6630878\media__1772435434673.jpg"
$img = [System.Drawing.Image]::FromFile($path)
$bmp = New-Object System.Drawing.Bitmap($img)
$out = New-Object System.Collections.Generic.List[string]

for ($y = 350; $y -lt 680; $y += 10) {
  $row = ""
  for ($x = 300; $x -lt 700; $x += 10) {
    $p = $bmp.GetPixel($x, $y)
    $b = [int](($p.R + $p.G + $p.B) / 3)
    $row += "$b,"
  }
  $out.Add($row)
}

$out | Out-File "h:\Projects\wall poster\public\brightness.csv"
$bmp.Dispose()
$img.Dispose()

Add-Type -AssemblyName System.Drawing
$path = "C:\Users\SOUMYA\.gemini\antigravity\brain\7ac3db0f-6246-449e-b686-3cc5d6630878\media__1772435434673.jpg"
$img = [System.Drawing.Image]::FromFile($path)
Write-Host "WIDTH: $($img.Width)"
Write-Host "HEIGHT: $($img.Height)"
$img.Dispose()

Add-Type -AssemblyName System.Drawing
$path = "h:\Projects\wall poster\public\mockup.jpg"
$img = [System.Drawing.Image]::FromFile($path)
$bmp = New-Object System.Drawing.Bitmap($img)
$gfx = [System.Drawing.Graphics]::FromImage($bmp)
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::Green, 5)

# Final coordinates
$x = 344
$y = 264
$w = 343
$h = 253

$gfx.DrawRectangle($pen, $x, $y, $w, $h)

$bmp.Save("h:\Projects\wall poster\public\final_debug_mockup.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$gfx.Dispose()
$bmp.Dispose()
$img.Dispose()
$pen.Dispose()

# unify_svgs.ps1
$folder = "z:\Project 4\AD-Royal-Villa\Frontend\public\New\images\kingfisher"
Add-Type -AssemblyName System.Drawing

# 1. Read all frame dimensions to find the max bounding box
$maxWidth = 0
$maxHeight = 0
$framesData = @()

# We'll check frames 1-9. 
# Note: For existing SVGs (1-5), we might need to parse out the base64 or just use the PNGs if they exist.
# The user context stated there are PNGs for all frames (1.png ... 9.png).
# Using the source PNGs is safer and easier than parsing the SVGs.

for ($i = 1; $i -le 9; $i++) {
    $pngPath = "$folder\$i.png"
    if (Test-Path $pngPath) {
        $img = [System.Drawing.Image]::FromFile($pngPath)
        
        if ($img.Width -gt $maxWidth) { $maxWidth = $img.Width }
        if ($img.Height -gt $maxHeight) { $maxHeight = $img.Height }
        
        # Store for processing
        $framesData += @{
            Id      = $i
            Width   = $img.Width
            Height  = $img.Height
            PngPath = $pngPath
        }
        $img.Dispose()
    }
}

Write-Host "Max Dimensions Found: $maxWidth x $maxHeight"

# 2. Regenerate ALL SVGs with the unified canvas size
# We will center each image within the max canvas.

foreach ($frame in $framesData) {
    try {
        $img = [System.Drawing.Image]::FromFile($frame.PngPath)
        
        $ms = New-Object System.IO.MemoryStream
        try {
            $img.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
            $base64 = [Convert]::ToBase64String($ms.ToArray())
        }
        finally {
            if ($ms) { $ms.Dispose() }
        }
    }
    finally {
        if ($img) { $img.Dispose() }
    }
    
    # Calculate centering positions
    # x = (MaxWidth - ImageWidth) / 2
    # y = (MaxHeight - ImageHeight) / 2
    $x = [math]::Round(($maxWidth - $frame.Width) / 2)
    $y = [math]::Round(($maxHeight - $frame.Height) / 2)
    
    # SVG Content
    # ViewBox is 0 0 MaxWidth MaxHeight
    # Image is placed at x,y with its natural width/height
    
    $svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="$maxWidth" height="$maxHeight" viewBox="0 0 $maxWidth $maxHeight" version="1.1" xml:space="preserve">
  <image x="$x" y="$y" width="$($frame.Width)" height="$($frame.Height)" xlink:href="data:image/png;base64,$base64"></image>
</svg>
"@
    
    $svgPath = "$folder\$($frame.Id).svg"
    Set-Content -Path $svgPath -Value $svgContent
    Write-Host "Updated $svgPath (Canvas: ${maxWidth}x${maxHeight}, Img: $($frame.Width)x$($frame.Height) at $x,$y)"
}

# fix_svg_dimensions.ps1
$targetWidth = 1569
$targetHeight = 1230
$folder = "z:\Project 4\AD-Royal-Villa\Frontend\public\New\images\kingfisher"

# Files to process (missing/low-res frames)
$frames = @(6, 7, 8, 9)

# Load required assembly for Image processing
Add-Type -AssemblyName System.Drawing

foreach ($i in $frames) {
    $pngPath = "$folder\$i.png"
    $svgPath = "$folder\$i.svg"

    if (Test-Path $pngPath) {
        try {
            $img = [System.Drawing.Image]::FromFile($pngPath)
            $base64String = ""
            
            $ms = New-Object System.IO.MemoryStream
            try {
                $img.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
                $imageBytes = $ms.ToArray()
                $base64String = [Convert]::ToBase64String($imageBytes)
            }
            finally {
                if ($ms) { $ms.Dispose() }
            }
        }
        finally {
            if ($img) { $img.Dispose() }
        }

        # Create SVG content with consistent dimensions
        $svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="$targetWidth" height="$targetHeight" xml:space="preserve" version="1.1" viewBox="0 0 $targetWidth $targetHeight">
  <image width="$targetWidth" height="$targetHeight" xlink:href="data:image/png;base64,$base64String"></image>
</svg>
"@
        Set-Content -Path $svgPath -Value $svgContent
        Write-Host "Regenerated $svgPath with dimensions ${targetWidth}x${targetHeight}"
    }
    else {
        Write-Error "Source PNG not found: $pngPath"
    }
}

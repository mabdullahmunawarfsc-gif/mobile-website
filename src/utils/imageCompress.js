/**
 * Compress an image file to a maximum width while maintaining aspect ratio.
 * Returns a data URL string suitable for localStorage storage.
 *
 * @param {File} file - The image file from an input
 * @param {number} maxWidth - Maximum width in pixels (default 800)
 * @param {number} quality - JPEG quality 0-1 (default 0.7)
 * @returns {Promise<string>} - Compressed image as data URL
 */
export function compressImage(file, maxWidth = 800, quality = 0.7) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'))
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img

        // Scale down if wider than maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // Convert to JPEG data URL (smaller than PNG for photos)
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve(dataUrl)
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target.result
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

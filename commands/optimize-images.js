/**
 * Gathers fullsized images in the designated images folder and reduces their filesize for use on the web and saves them ot the designated static folder using the same structure they had in the images folder
 */

import path from "path"
import imagemin from "imagemin-keep-folder"
import imageminJpegRecompress from "imagemin-jpeg-recompress"
import webp from "imagemin-webp"
import imageminOptipng from "imagemin-optipng"

const publicFolder = './public'
const imagesFolder = './unoptimized-images'

const PNG = path.join(imagesFolder, `**`, `*.png`)
const JPG = path.join(imagesFolder, `**`, `*.jpg`)
const JPEG = path.join(imagesFolder, `**`, `*.jpeg`)

imagemin([PNG], {
  use: [
    webp({
      lossless: true,
    }),
  ],
  replaceOutputDir: (output) => {
    return path.join(publicFolder, path.basename(output))
  },
})

imagemin([PNG], {
  use: [
    imageminOptipng({
      optimizationLevel: 3,
    }),
  ],
  replaceOutputDir: (output) => {
    return path.join(publicFolder, path.basename(output))
  },
})

imagemin([JPG, JPEG], {
  use: [
    webp({
      quality: 80, // Quality setting from 0 to 100
    }),
  ],
  replaceOutputDir: (output) => {
    return path.join(publicFolder, path.basename(output))
  },
})

imagemin([JPG, JPEG], {
  use: [
    imageminJpegRecompress({
      accurate: true,
      quality: "high",
      min: 50,
      max: 90,
      loops: 6,
      progressive: true,
      strip: true,
      target: 0.9,
    }),
  ],
  replaceOutputDir: (output) => {
    return path.join(publicFolder, path.basename(output))
  },
})

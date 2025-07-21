import type { Ref } from 'vue'

/**
 * Uploads a file to the API, if the file is null then we upload the file from click & drop
 * @param file File to be uploaded, it can also be a blob (raw data)
 */
export async function uploadFile(file: File | Blob) {
  const data = new FormData()
  data.append('file', file)

  return await fetch('/upload', {
    method: 'POST',
    body: data,
  })
}

/**
 * Generates a blob for the wanted size
 * @param size The size in MB for the file to generate
 * @param unit Unit must be in {KB,MB,GB}
 * @returns a blob which is an octet-stream of the required size
 */
export function generateData(size: number, unit: string) {
  const totalSize = getSize(size, unit)
  const chunkSize = 1000 * 1000 // 1MB chunk
  const chunks = []

  let generated = 0
  while (generated < totalSize) {
    const currentChunkSize = Math.min(chunkSize, totalSize - generated)
    chunks.push(new Uint8Array(currentChunkSize))
    generated += currentChunkSize
  }

  return new Blob(chunks, { type: 'application/octet-stream' })
}

let xhrGlobal: XMLHttpRequest = new XMLHttpRequest()

/**
 * Uploads a file using XMLHttpRequest to track progress
 * @param file The Blob or File to upload
 * @param onProgress A callback that receives percent, loaded, and total bytes
 */
export function uploadFileWithProgress(
  file: File | Blob,
  onProgress: (percent: number, loaded: number, total: number) => void,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhrGlobal = xhr
    const formData = new FormData()
    formData.append('file', file)

    xhr.open('POST', '/upload')

    // Detecting the progress of the upload
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100
        onProgress(percent, event.loaded, event.total)
      }
    }

    // On each load we retrieve the response to make sure there's no error
    xhr.onload = () => {
      const response = new Response(xhr.response, {
        status: xhr.status,
        statusText: xhr.statusText,
      })
      resolve(response)
    }

    xhr.onerror = () => reject(new Error('Upload failed'))

    xhr.send(formData)
  })
}

export function getSize(size: number, unit: string) {
  let chunkSize = 0
  switch (unit) {
    case 'MB':
      chunkSize = 1000 * 1000
      break
    case 'KB':
      chunkSize = 1000
      break
    case 'GB':
      chunkSize = 1000 * 1000 * 1000
      break
    default:
      chunkSize = 1
      break
  }

  return chunkSize * size
}

export function abortFunc() {
  xhrGlobal.abort()
}

export async function startUpload(
  progress: Ref,
  timeTakenRef: Ref,
  speedRef: Ref,
  downloadMode: Ref,
  isDownloading: Ref,
  size: number,
  unit: string,
  scenario: boolean,

  file: File | Blob,
) {

  progress.value = 0

  downloadMode.value = true
  isDownloading.value = true

  // const file = generateData(props.size, props.unit)
  const total = file ? file.size : getSize(size, unit)
  const start = performance.now()

  await uploadFileWithProgress(file, (percent, loaded) => {
    progress.value = percent
    const elapsed = (performance.now() - start) / 1000
    timeTakenRef.value = parseFloat(elapsed.toFixed(2))

    const speed = loaded / 1000 / 1000 / elapsed
    speedRef.value = parseFloat(speed.toFixed(2))
  })

  const totalTime = (performance.now() - start) / 1000
  timeTakenRef.value = parseFloat(totalTime.toFixed(2))
  const avgSpeed = total / 1000 / 1000 / totalTime
  speedRef.value = parseFloat(avgSpeed.toFixed(2))
  isDownloading.value = false
}

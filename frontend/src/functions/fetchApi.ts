import { type Ref } from 'vue'

/**
 * Fetches the download API to get a certain size file
 * @param size The size to download
 * @param unit  The unit of the size must be in {KB,MB,GB}
 */
export async function fetchApi(size: number, unit: string) {
  const link = `/download/${size}/${unit}`
  return await fetch(link)
}

export function stopDownload() {
  const controller = new AbortController()
  controller.abort()
}

export async function startDownload(
  progress: Ref,
  timeTakenRef: Ref,
  speedDownload: Ref,
  downloadMode: Ref,
  isDownloading: Ref,
  size: number,
  unit: string,
) {
  progress.value = 0

  downloadMode.value = true
  isDownloading.value = true

  const start = performance.now()

  const response = await fetchApi(size, unit)

  if (!response.ok) {
    alert('Failed to download')
    return
  }

  const contentLength = response.headers.get('Content-Length')
  if (!contentLength) {
    alert('Content-Length header is missing')
    return
  }

  const total = parseInt(contentLength, 10)
  let loaded = 0

  if (!response.body) {
    return
  }

  const reader = response.body.getReader()
  const chunks = []
  let lastTime = start
  let lastLoaded = 0

  while (true) {
    const now = performance.now()

    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    loaded += value.length
    progress.value = (loaded / total) * 100

    const deltaTime = (now - lastTime) / 1000
    const deltaLoaded = loaded - lastLoaded
    timeTakenRef.value = parseFloat(((performance.now() - start) / 1000).toFixed(2))

    if (deltaTime > 0.2) {
      const instantSpeed = deltaLoaded / 1000 / 1000 / deltaTime
      speedDownload.value = parseFloat(instantSpeed.toFixed(2))
      lastTime = now
      lastLoaded = loaded
    }
  }

  const totalTime = (performance.now() - start) / 1000
  timeTakenRef.value = parseFloat(totalTime.toFixed(2))

  // Pour la vitesse finale moyenne (optionnel)
  const avgSpeed = total / 1000 ** 2 / totalTime
  speedDownload.value = parseFloat(avgSpeed.toFixed(2))
  isDownloading.value = false
}

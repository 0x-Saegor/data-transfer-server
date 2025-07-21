import { ref, watch } from 'vue'
import { fetchApi } from '@/functions/fetchApi'
import { uploadFile, generateData } from '@/functions/uploadApi'

export function useContinuous() {
  const isContinuousRunningUpload = ref(false)
  const isContinuousRunningDownload = ref(false)
  const packetsDownloaded = ref(0)
  const packetsUploaded = ref(0)
  const downloadSpeed = ref(0.0)
  const uploadSpeed = ref(0.0)
  const downloadTime = ref(0.0)
  const uploadTime = ref(0.0)
  let idDownload = 0
  let idUpload = 0

  watch(isContinuousRunningDownload, async () => {
    if (isContinuousRunningDownload.value) {
      const firstCall = performance.now()
      const originalId = idDownload
      idDownload++
      while (isContinuousRunningDownload.value && idDownload == originalId + 1) {
        const start = performance.now()
        await fetchApi(1, 'MB')
        packetsDownloaded.value++
        if (packetsDownloaded.value % 15 == 0) {
          downloadSpeed.value = parseFloat(
            ((1000 * 1000) / (performance.now() - start) / 1000).toFixed(2),
          )
          downloadTime.value = parseFloat(((performance.now() - firstCall) / 1000).toFixed(2))
        }
      }
    }
  })
  watch(isContinuousRunningUpload, async () => {
    if (isContinuousRunningUpload.value) {
      const firstCall = performance.now()
      const originalId = idUpload
      idUpload++
      while (isContinuousRunningUpload.value && idUpload == originalId + 1) {
        const start = performance.now()
        await uploadFile(generateData(1, 'MB'))
        packetsUploaded.value++
        if (packetsUploaded.value % 15 == 0) {
          uploadTime.value = parseFloat(((performance.now() - firstCall) / 1000).toFixed(2))
          uploadSpeed.value = parseFloat(
            ((1000 * 1000) / (performance.now() - start) / 1000).toFixed(2),
          )
        }
      }
    }
  })

  return {
    isContinuousRunningDownload,
    isContinuousRunningUpload,
    packetsDownloaded,
    packetsUploaded,
    downloadSpeed,
    uploadSpeed,
    downloadTime,
    uploadTime,
  }
}

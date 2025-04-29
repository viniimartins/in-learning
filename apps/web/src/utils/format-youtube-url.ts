function formatYoutubeUrl(url: string): string {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/

  const match = url.match(youtubeRegex)
  const videoId = match?.[1]

  if (!videoId) return url

  return `https://www.youtube.com/embed/${videoId}`
}

export { formatYoutubeUrl }

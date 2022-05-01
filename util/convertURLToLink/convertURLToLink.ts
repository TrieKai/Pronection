const ConvertURLToLink = (text: string): string => {
  const urlRegex = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
  return text.replace(
    urlRegex,
    '<a href="$1$2" target="_blank" rel="noopener noreferrer">$1$2</a>'
  )
}

export default ConvertURLToLink

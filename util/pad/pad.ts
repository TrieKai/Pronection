const Pad = (num: number, places: number, padString = '0') => {
  return String(num).padStart(places, padString)
}

export default Pad

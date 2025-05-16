export const normalTitle = (title) => {
  const changeTitle = title.split('')
  if (changeTitle.length > 35) return changeTitle.slice(0, 34).join('') + '...'
  return title
}

export const normalText = (text) => {
  const changeText = text.split('')
  if (changeText.length > 200) return changeText.slice(0, 199).join('') + '...'
  return text
}

export const normalTag = (tag) => {
  const changeTag = tag.split('')
  if (changeTag.length > 25) return changeTag.slice(0, 24).join('') + '...'
  return tag
}

export const normalDescription = (description) => {
  const changeDescription = description.split('')
  if (changeDescription.length > 95) return changeDescription.slice(0, 94).join('') + '...'
  return description
}

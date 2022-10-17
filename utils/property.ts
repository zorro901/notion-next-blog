import { PageType, RichTextType } from "../types/types";

export const getText = (richTextArr: RichTextType[]) => {
  try {
    const textArr = richTextArr.map(richText => richText.plain_text)
    return textArr.join('')
  } catch (error) {

  }
  return ''
}

export const getCover = (cover: PageType['cover']): string => {
  if (cover && cover.file) return cover.file.url
  if (cover && cover.external) return cover.external.url
  return '/noimage.ong'
}

export const getDate = (date: { start: string }): string => {
  try {
    return date.start
  } catch (error) {

  }
  return '-'
}

export const getMultiSelect = (multiSelect: [{ name: string }]): string[] => {
  try {
    return multiSelect.map(tag => tag.name)
  } catch (error) {

  }
  return []
}

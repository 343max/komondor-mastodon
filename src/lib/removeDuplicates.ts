export const removedDuplicates = <T extends { id: string }>(list: T[]): T[] => {
  const seenIds = new Set<string>()

  return list.filter((item) => {
    if (seenIds.has(item.id)) {
      return false
    } else {
      seenIds.add(item.id)
      return true
    }
  })
}

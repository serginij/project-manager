export const getProgress = (lists = [], type) => {
  let value = 0,
    total = 0

  type === 'singlelist'
    ? lists &&
      lists.forEach(item => {
        if (item.checked) {
          value++
        }
        total++
      })
    : lists &&
      lists.forEach(list => {
        list.items &&
          list.items.forEach(item => {
            if (item.checked) {
              value++
            }
            total++
          })
      })
  let progress = total ? (value / total) * 100 : 0
  return { value: value, total: total, progress: progress }
}

export const formatDate = (date, showYear = true) => {
  let month = date.toLocaleString('ru', { month: 'short' }).slice(0, 3)
  let day = date.getDate()
  let year = date.getFullYear()
  let time = date.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' })
  let formattedDate =
    day + ' ' + month + (showYear ? ' ' + year + ' г.' : '') + ' в ' + time
  return formattedDate
}

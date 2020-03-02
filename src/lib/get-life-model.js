// const arr = [
//   { name: 'Инициализация', id: 'init', color: '#ffab00', progress: 100 },
//   { name: 'Планирование', id: 'plan', color: '#43a047', progress: 10 },
//   { name: 'Реализация', id: 'impl', color: '#c51162', progress: 60 },
//   { name: 'Тестирование', id: 'test', color: '#aa00ff', progress: 10 },
//   { name: 'Завершение', id: 'end', color: '#2962ff', progress: 100 }
// ]

const stages = [
  {
    id: 'cascade',
    name: 'Каскадная'
  },
  {
    id: 'iterative',
    name: 'Итеративная'
  },
  {
    id: 'spiral',
    name: 'Спиральная'
  },
  {
    id: 'phase',
    name: 'Фазы-функции'
  }
]
export const getLifeCycle = arr => {
  let res = []
  console.log(arr)
  stages.forEach((stage, i) => {
    let flag = -1
    let lessHundred = false
    arr.forEach((item, index) => {
      let prev = index && arr[index - 1].progress
      let next = index !== 4 && arr[index + 1].progress
      let curr = item.progress

      switch (i) {
        case 0:
          //каскадная
          if (index == 0) {
            if ((curr < 100 && next == 0) || curr == 100) {
              flag = i
            } else {
              flag = -1
            }
          } else if (index == 4 && flag == i) {
            if ((curr >= 0 && prev == 100) || (curr == 0 && prev < 100)) {
              flag = i
            } else {
              flag = -1
            }
          } else if (flag == i) {
            if (curr < 100 && (prev < 100 || next > 0)) {
              flag = -1
            } else {
              flag = i
            }
          }
          break
        case 1:
          //итеративная
          if (index == 0) {
            if (curr == 0 && next > 0) {
              flag = -1
            } else {
              flag = i
            }
          } else if (index == 4 && flag == i) {
            if (curr > 0 && prev == 0) {
              flag = -1
            } else {
              flag = i
            }
          } else if (flag == i) {
            if (curr > 0 && prev == 0) {
              flag = -1
            } else {
              flag = i
            }
          }
          break
        case 2:
          //спиральная
          if (index == 0) {
            if (curr < 100 && next < 100 && next > 0 && curr > 0) {
              flag = -1
            } else {
              flag = i
            }

            if (curr < 100) {
              lessHundred = true
            }
          } else if (index == 4 && flag == i) {
            if (curr < 100 && prev < 100 && prev > 0 && curr > 0) {
              flag = -1
            } else if (lessHundred && curr < 100) {
              flag = -1
            } else {
              flag = i
            }
          } else if (flag == i) {
            if (prev < 100 && prev > 0 && next < 100 && next > 0) {
              flag = -1
            } else if (lessHundred && curr < 100) {
              flag = -1
            } else if (curr < 100) {
              lessHundred = true
            } else {
              flag = i
            }
          }
          break
        case 3:
          //фазы-функции
          if (index == 0) {
            if ((curr < 50 && next > 0) || (next > 50 && curr < 100)) {
              flag = -1
            } else {
              flag = i
            }
          } else if (index == 4 && flag == i) {
            if ((prev < 50 && curr > 0) || (curr > 50 && prev < 100)) {
              flag = -1
            } else {
              flag = i
            }
          } else if (flag == i) {
            if (
              (curr < 50 && next > 0) ||
              (next > 50 && curr < 100) ||
              (prev < 50 && curr > 0) ||
              (curr > 50 && prev < 100)
            ) {
              flag = -1
            } else {
              flag = i
            }
          }
          break
      }
    })
    if (flag > -1) res.push(stages[flag].name)
  })

  return res
}

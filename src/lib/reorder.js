export const reorder = (list, startIndex, endIndex) => {
  const result = list
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const reorderCards = (columns, source, destination) => {
  const current = [...columns[source.droppableId].cards]
  const next = [...columns[destination.droppableId].cards]
  const target = current[source.index]

  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index)
    const result = {
      ...columns,
      [source.droppableId]: { ...columns[source.droppableId], cards: reordered }
    }
    return result
  }

  current.splice(source.index, 1)
  next.splice(destination.index, 0, target)

  const result = {
    ...columns,
    [source.droppableId]: { ...columns[source.droppableId], cards: current },
    [destination.droppableId]: {
      ...columns[destination.droppableId],
      cards: next
    }
  }

  return result
}

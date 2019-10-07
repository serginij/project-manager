import React, { useRef, useEffect, useCallback } from 'react'

export const Branches = ({ tree }) => {
  const canvasRef = useRef(null)

  const drawTree = useCallback(tree => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.moveTo(tree.data.startX, tree.data.startY)
    ctx.lineTo(tree.data.x, tree.data.y)
    ctx.stroke()

    console.log('Data: ', tree.data, 'level: ', tree.level)

    if (tree.children.length) {
      tree.children.forEach(child => drawTree(child))
    } else {
      return
    }
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth)
    ctx.beginPath()
    drawTree(tree)
  }, [drawTree, tree])

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  )
}

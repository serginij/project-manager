import React, { useRef, useEffect, useCallback } from 'react'

import { styled } from 'linaria/react'

export const Branches = ({ tree }) => {
  const canvasRef = useRef(null)

  const drawTree = useCallback(tree => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { startX, startY, x, y } = tree.data
    ctx.moveTo(tree.data.startX, tree.data.startY)
    // ctx.lineTo(tree.data.x, tree.data.y)
    ctx.bezierCurveTo(
      startX,
      startY,
      x + (x - startX) / 1.5,
      startY + (y - startY) / 1.5,
      x,
      y
    )
    ctx.stroke()

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
    <CanvasBlock
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  )
}

const CanvasBlock = styled.canvas`
  width: ${props => props.width};
  height: ${props => props.height};
`

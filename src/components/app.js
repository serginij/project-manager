import React, { Component } from 'react'

import { Node } from '@components/node'
import { Branches } from '@components/branches'

class App extends Component {
  state = {
    nodes: [
      {
        id: 0,
        x: window.innerWidth / 2 - 20,
        y: window.innerHeight / 2 - 20
      }
    ],
    tree: {
      data: {
        id: 0,
        x: window.innerWidth / 2 - 20,
        y: window.innerHeight / 2 - 20
      },
      level: 1,
      children: []
    },
    counter: 1
  }

  handleAddNode = (id, data, tree = this.state.tree) => {
    let newTree = tree
    data.id = this.state.counter
    this.insertNode(id, data, newTree)
    // console.log(newTree)
    this.setState(prevState => ({
      tree: newTree,
      nodes: [
        ...prevState.nodes,
        { id: prevState.counter, x: data.x, y: data.y }
      ],
      counter: prevState.counter + 1
    }))
  }

  insertNode = (id, data, tree) => {
    if (tree.data.id === id) {
      tree.children.push({ data, level: tree.level + 1, children: [] })
    } else if (tree.children.length) {
      tree.children.forEach(child => this.insertNode(id, data, child))
    }
  }

  handleMoveNode = (id, coords) => {
    let newNodes = this.state.nodes
    let index = newNodes.indexOf(newNodes.find(el => el.id === id))
    newNodes[index].x = coords.x
    newNodes[index].y = coords.y

    let newTree = this.state.tree
    this.updateNode(newTree, id, { id: id, x: coords.x, y: coords.y })

    // console.log(index)
    this.setState(
      {
        nodes: newNodes,
        tree: newTree
      }
      // () => console.log(this.state.nodes)
    )
    // console.log(id, coords)
  }

  updateNode = (tree, id, data) => {
    if (tree.data.id === id) {
      tree.data = {
        ...tree.data,
        x: data.x,
        y: data.y
      }
      if (tree.children.length) {
        tree.children.map(child => {
          child.data.startX = data.x
          child.data.startY = data.y
        })
      }
    } else if (tree.children.length) {
      tree.children.forEach(child => this.updateNode(child, id, data))
    }
  }

  render() {
    let map = this.state.nodes.map(el => (
      <Node
        onClick={this.handleAddNode}
        onMove={this.handleMoveNode}
        key={el.id}
        id={el.id}
        x={el.x}
        y={el.y}
      />
    ))

    return (
      <div>
        {/* <h1>Hello world</h1> */}
        <Branches tree={this.state.tree} />
        {map}
      </div>
    )
  }
}

export default App

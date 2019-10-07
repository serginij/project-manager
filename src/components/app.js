import React, { Component } from 'react'

import { Node } from '@components/node'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: [
        {
          id: 0,
          x: 0,
          y: 0
        }
      ],
      counter: 1
    }
  }

  render() {
    const handleAddNode = () => {
      this.setState(
        prevState => ({
          nodes: [...prevState.nodes, { id: prevState.counter, x: 0, y: 0 }],
          counter: prevState.counter + 1
        }),
        () => console.log(this.state.nodes)
      )
    }

    const handleMoveNode = (id, coords) => {
      let newNodes = this.state.nodes
      let index = newNodes.indexOf(newNodes.find(el => el.id === id))
      newNodes[index].x = coords.x
      newNodes[index].y = coords.y

      // console.log(index)
      this.setState(
        {
          nodes: newNodes
        },
        () => console.log(this.state.nodes)
      )
      // console.log(id, coords)
    }

    let map = this.state.nodes.map(el => (
      <Node
        onClick={handleAddNode}
        onMove={handleMoveNode}
        key={el.id}
        id={el.id}
      />
    ))

    return (
      <div>
        <h1>Hello world</h1>
        {map}
        {/* <Node onClick={handleAddNode} onMove={handleMoveNode} id={0} /> */}
        {/* <button onClick={handleAddNode}>Add node</button> */}
      </div>
    )
  }
}

export default App

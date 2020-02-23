import React, { Component } from 'react'
import cloneDeep from 'lodash.clonedeep'
import { css } from 'linaria'

import { Button } from '@ui'

import { Branches } from './branches'
import { EditableNode } from './editable-node'

class MindMap extends Component {
  state = {
    nodes: this.props.nodes,
    tree: this.props.mindmap,
    counter: 1
  }

  handleAddNode = (id, data, tree = this.state.tree) => {
    let newTree = cloneDeep(tree)

    data.id = this.state.counter
    this.insertNode(id, data, newTree)

    this.setState(prevState => ({
      tree: newTree,
      nodes: [
        ...prevState.nodes,
        { id: prevState.counter, x: data.x, y: data.y, name: '' }
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
    let newNodes = cloneDeep(this.state.nodes)
    let index = newNodes.indexOf(newNodes.find(el => el.id === id))
    newNodes[index].x = coords.x
    newNodes[index].y = coords.y

    let newTree = this.state.tree
    this.updateNode(newTree, id, { id: id, x: coords.x, y: coords.y })

    this.setState({
      nodes: newNodes,
      tree: newTree
    })
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

  updateName = (tree, id, name) => {
    if (tree.data.id === id) {
      tree.data.name = name
    } else if (tree.children.length) {
      tree.children.forEach(child => this.updateName(child, id, name))
    }
  }

  handleRenameNode = (id, name) => {
    let newNodes = cloneDeep(this.state.nodes)
    let index = newNodes.indexOf(newNodes.find(el => el.id === id))
    newNodes[index].name = name
    let newTree = this.state.tree
    this.updateName(newTree, id, name)

    this.setState({
      tree: newTree,
      nodes: newNodes
    })
  }

  render() {
    let editable = this.props.editable
    let nodes = this.state.nodes.map(node => (
      <EditableNode
        onClick={this.handleAddNode}
        onMove={this.handleMoveNode}
        key={node.id}
        id={node.id}
        x={node.x}
        y={node.y}
        name={node.name}
        onRename={this.handleRenameNode}
        editable={editable}
      />
    ))

    return (
      <div style={{ marginTop: '-60px' }}>
        {editable && (
          <>
            <Button
              type="button"
              onClick={() => this.props.onConvert(this.state.tree)}
              className={styledButton}
            >
              Преобразовать
            </Button>
            <Button
              type="button"
              onClick={() => this.props.onSave(this.state.tree)}
              className={saveButton}
            >
              Сохранить
            </Button>
          </>
        )}
        <Branches tree={this.state.tree} />
        {nodes}
      </div>
    )
  }
}

const styledButton = css`
  position: absolute;
  right: 0;
  top: 60px;
`

const saveButton = css`
  position: absolute;
  top: 60px;
  right: 136px;
`

export default MindMap

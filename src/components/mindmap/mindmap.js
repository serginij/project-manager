import React, { Component } from 'react'
import cloneDeep from 'lodash.clonedeep'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Button, CheckIcon, Alert } from '@ui'
import { colors } from '@lib/constants'

import { Branches } from './branches'
import { EditableNode } from './editable-node'

class MindMap extends Component {
  state = {
    nodes: this.props.nodes,
    tree: this.props.mindmap,
    counter: 2,
    color: '000000',
    childErr: false,
    depthErr: false
  }

  handleAddNode = (id, data, tree = this.state.tree) => {
    if (this.props.editable) {
      let newTree = cloneDeep(tree)
      const prevNode = this.state.nodes.filter(node => node.id === id)[0]

      data.id = this.state.counter

      this.setState({ depthErr: { column: false, task: false } }, () => {
        this.insertNode(id, { ...data, color: prevNode.color }, newTree)
        let newNodes = [...this.state.nodes]

        if (prevNode.level < 4) {
          newNodes.push({
            id: this.state.counter,
            x: data.x,
            y: data.y,
            name: '',
            color: prevNode.color,
            level: prevNode.level + 1
          })
        }

        this.setState(prevState => ({
          tree: newTree,
          nodes: newNodes,
          counter: prevState.counter + 1
        }))
      })
    }
  }

  insertNode = (id, data, tree) => {
    if (tree.data.id === id) {
      if (tree.level < 4) {
        tree.children.push({
          data,
          level: tree.level + 1,
          children: []
        })
      }
    } else if (tree.children.length) {
      tree.children.forEach(child => this.insertNode(id, data, child))
    }
    if (tree.children.length > 7) {
      this.setState({ childErr: true }, () => {
        setTimeout(() => {
          this.setState({ childErr: false })
        }, 5000)
      })
    }
    if (tree.children.length > 2 && tree.level === 3) {
      this.setState(prevState => ({
        depthErr: { ...prevState.depthErr, task: true }
      }))
    }
    if (tree.level == 2 && tree.children.length == 0) {
      this.setState(prevState => ({
        depthErr: { ...prevState.depthErr, column: true }
      }))
    }
  }

  handleMoveNode = (id, coords) => {
    let newNodes = cloneDeep(this.state.nodes)
    let index = newNodes.indexOf(newNodes.find(el => el.id === id))
    newNodes[index].x = coords.x
    newNodes[index].y = coords.y

    let newTree = cloneDeep(this.state.tree)
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

  updateName = (tree, id, name, color) => {
    if (tree.data.id === id) {
      tree.data.name = name
      if (color !== '000000') {
        tree.data.color = color
      }
    } else if (tree.children.length) {
      tree.children.forEach(child => this.updateName(child, id, name, color))
    }
  }

  handleRenameNode = (id, name) => {
    let color = this.state.color
    let newNodes = cloneDeep(this.state.nodes).map(node => {
      if (node.id === id) {
        node.name = name
        if (color !== '000000') {
          node.color = color
        }
      }
      return node
    })

    let newTree = cloneDeep(this.state.tree)
    this.updateName(newTree, id, name, color)

    this.setState({
      tree: newTree,
      nodes: newNodes,
      color: '000000'
    })
  }

  handleDeleteNode = id => {
    const res = this.deleteNode(id, this.state.tree)
    const newNodes = this.state.nodes.filter(node => node.id < id)
    this.setState({ tree: res, nodes: newNodes })
  }

  deleteNode = (id, tree) => {
    return {
      ...tree,
      children: tree.children.filter(col => {
        col.children = col.children.filter(card => {
          card.children = card.children.filter(item => {
            return item.data.id !== id
          })
          return card.data.id !== id
        })
        return col.data.id !== id
      })
    }
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
        onDelete={this.handleDeleteNode}
        level={node.level}
        editable={editable}
      />
    ))

    let colorsList = colors.map(color => (
      <Color
        type="button"
        key={color}
        color={color}
        onClick={() => this.setState({ color: color })}
      >
        <CheckIcon checked={color === this.state.color} />
      </Color>
    ))

    return (
      <div style={{ marginTop: '-50px' }}>
        {editable && (
          <>
            <Colors>{colorsList}</Colors>
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
        {this.state.childErr && (
          <Alert color="#ffab00" text="Один из элементов имеет > 7 потомков" />
        )}
        {this.state.nodes.length > 20 && (
          <Alert
            color="#ffab00"
            text="Оптимальное количество элементов превышено"
          />
        )}
        {this.state.depthErr.column && this.state.depthErr.task && (
          <Alert
            color="#ffab00"
            text="Дерево неравомерно. Одна из веток более детализирована"
          />
        )}
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

const Colors = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 100px;
  right: 0;
  width: 17vh;
`

const Color = styled.button`
  border: none;
  padding: 0;
  width: 2vh;
  height: 2vh;
  margin: 5px;
  cursor: pointer;
  border-radius: 2px;
  background-color: ${props => props.color};
`

export default MindMap

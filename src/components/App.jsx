import React, { Component } from 'react'
import Header from '../components/header'
import Create from './create-task'
import Tasks from './tasks'

import Deleteall from './delete-all'

import ModalAlert from '../components/modal'

import '../styles/App.css'

export default class App extends Component {
  state = {
    tasks: [],
    selectedTask: undefined
  }

  componentDidMount = () => {
    try {
        const json = localStorage.getItem('tasks')
        const tasks = JSON.parse(json)

        if (tasks) {
            this.setState(() => ({tasks}))
        }
    } catch(e) {
        this.setState(() => ({selectedTask: 'Something went wrong!'}))
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
      if(prevState.tasks.length !== this.state.tasks.length) {
          const json = JSON.stringify(this.state.tasks)
          localStorage.setItem('tasks', json)
      }
  }

  deleteTask = (taskTodelete) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => taskTodelete !== task)
    }))
  }


  deleteAll = () => {
    this.setState(() => ({tasks: []}))
  }

  closeModal = () => {
    this.setState(() => ({selectedTask: undefined}))
  }

  onSubmit = (event) => {
    event.preventDefault()
    const singletask = event.target.elements.singletask.value.trim().toLowerCase()
    if(!singletask) {
        this.setState(() => ({selectedTask: 'Please enter a character!'}))
    } else if(this.state.tasks.indexOf(singletask) > -1) {
        this.setState(() => ({selectedTask: 'This character already exists!'}))
    } else this.setState((prevState) => ({ tasks: [...prevState.tasks, singletask] }))
    event.target.elements.singletask.value = ''
  }
  render() {
    return (
      <div>
         <Header />
        <Create 
        onSubmit={this.onSubmit} 
        />
     
        { this.state.tasks.length > 0 ?

          <Tasks
            tasks={this.state.tasks}
            deleteTask={this.deleteTask}
          />
          : null
        }
        { this.state.tasks.length > 0 ?
          <Deleteall
            deleteAll={this.deleteAll}
          />
          : null
        }
        <ModalAlert
            selectedTask={this.state.selectedTask}
            closeModal={this.closeModal}
        />
       
      </div>
    )
  }
}
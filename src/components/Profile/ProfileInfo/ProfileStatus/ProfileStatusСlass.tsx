import React, { ChangeEvent } from 'react'
import classes from './ProfileStatus.module.css'

type PropsType = {
  statusText: string
  updateStatusText: (newStatusText: string) => void
}

type StateType = {
  editMode: boolean,
  statusText: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

  state = {
    editMode: false,
    statusText: this.props.statusText
  }

  activateEditMode = () => {
    this.setState({
      editMode: true,
      statusText: this.props.statusText
    })
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateStatusText(this.state.statusText)
  }

  onStatusTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      statusText: e.currentTarget.value
    }) 
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if(prevProps.statusText !== this.props.statusText) {
      this.setState({
        statusText: this.props.statusText
      })
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode &&
        <div onClick={this.activateEditMode}>
          <b>Status: </b>
          <span>{this.props.statusText || "no status"}</span>
        </div>
        }
        {this.state.editMode &&
        <div>
          <input onChange={this.onStatusTextChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.statusText} />
        </div>
        } 
      </div>
    )
  }
}

export default ProfileStatus;
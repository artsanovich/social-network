import React, { ChangeEvent } from 'react'
import classes from './ProfileStatus.module.css'

type PropsType = {
  statusText: string
  isOwner: boolean
  updateStatusText: (newStatusText: string) => void
}

type StateType = {
  editMode: boolean,
  statusText: string,
}

class ProfileStatus extends React.Component<PropsType, StateType> {

  state = {
    editMode: false,
    statusText: this.props.statusText
  }

  activateEditMode = () => {
    if (this.props.isOwner) {
    this.setState({
      editMode: true,
      statusText: this.props.statusText
    })
  }
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
      <div className={classes.statusBlock}>
        {!this.state.editMode &&
        <div onClick={this.activateEditMode}>
          <span className={classes.statusTitle}><b>Status: </b></span>
          <span className={classes.statusText}>{this.props.statusText || "no status"}</span>
        </div>
        }
        {this.state.editMode && 
        <div className={classes.statusBlock}>
          <input onChange={this.onStatusTextChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.statusText} />
        </div>
        } 
      </div>
    )
  }
}

export default ProfileStatus;
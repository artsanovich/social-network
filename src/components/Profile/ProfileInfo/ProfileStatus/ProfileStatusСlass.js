import React from 'react'
import classes from './ProfileStatus.module.css'


class ProfileStatus extends React.Component {

  state = {
    editMode: false
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

  onStatusTextChange = (e) => {
    this.setState({
      statusText: e.currentTarget.value
    }) 
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.statusText !== this.props.statusText) {
      this.setState({
        statusText: this.props.status
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
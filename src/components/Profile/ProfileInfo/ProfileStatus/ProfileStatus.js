import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import classes from './ProfileStatus.module.css'


const ProfileStatus = (props) => {

const [editMode, setEditMode] = useState(false)
const [editStatusText, setStatusText] = useState(props.statusText)

useEffect(() => {
  setStatusText(props.statusText)
}, [props.statusText])

const activateEditMode = () => {
  setEditMode(true)
}

const deactivateEditMode = () => {
  setEditMode(false)
  props.updateStatusText(statusText)
}


  return (
    <div>
      { !editMode &&
      <div onClick={activateEditMode}>
        <span>{props.statusText || "no status"}</span>
      </div>
      }
      {editMode &&
      <div>
        <input onChange={onStatusTextChange} autoFocus={true} onBlur={deactivateEditMode} value={statusText} />
      </div>
      } 
    </div>
  )
}

export default ProfileStatus;
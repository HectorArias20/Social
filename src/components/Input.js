import React from 'react'

export default function Input({ id, type, label, name, disabled, value, onChange, pattern, required }) {
  return (
    <input className="form-group__input" type={type} id={id} name={name} placeholder={label} pattern={pattern} disabled={disabled} value={value} onChange={onChange} required={required}/>
  )
}

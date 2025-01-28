import React, { useState } from 'react'

export default function ShowHidePassword() {

    const [defaultType, setDefaultType] = useState('password');

    const showHide = () => {
        if(defaultType == 'password'){
            setDefaultType('text');
        } else {
            setDefaultType('password');
        }
    }

  return (
    <div>
      <input type={ (defaultType == 'password') ? 'password' : 'text' }/>

      <button onClick={ showHide }>{ (defaultType == 'password') ? 'Show Password' : 'Hide Password' } </button>
    </div>
  )
}

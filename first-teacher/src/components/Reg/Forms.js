import React, { useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';

const Forms = () => {
    const [signUp, setSignUp] = useState(true);
    
  return (
<>
{ signUp ? <Login setSignUp={setSignUp}/> : <SignUp setSignUp={setSignUp}/> }
</>
  )
}

export default Forms
import ButtonMUI from '../../reusablecomponents/muibutton/muibutton'
import { useNavigate } from 'react-router-dom'
import styles from './signin.module.css'
import { auth } from '../../firebase/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from 'react'
import { TextField } from '@mui/material'
import Swal from 'sweetalert2'

const SignUp = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const singnUp_for_text = async (e) => {
    e.preventDefault();
    
      try {
        const credentials = await createUserWithEmailAndPassword(auth,email,password)
        
        Swal.fire({
          icon:'success',
          title:'successfully created'
        })
        
        .then(
        navigate('/')
        )
      } catch(error){
        
        if(error.code ==='auth/email-already-in-use'){
          Swal.fire({
            icon:'error',
            title:' Email already exists'
          })
        }else if(error.code === 'auth/weak-password'){
        Swal.fire(
          {
            icon:'error',
            title:'password must contain 6 characters'
          }
        )
      }
      }
    
  }
  
  

  return (
    <div className={styles.container}>
        <form className={styles.form} autoComplete="off" onSubmit={singnUp_for_text}>

            <div className={styles.text}>Sign Up To Take Quiz</div>
            <center className={styles.email}>
                <TextField label='Email' type='email' value={email}
                 onChange={(e) => setEmail(e.target.value)} required/>
            </center>

            <center className={styles.password}>
                <TextField  label='Password' type='password' value={password}
                 onChange={(e) => setPassword(e.target.value)} required/>
            </center>

            <center className={styles.btn}>
                 <ButtonMUI type ={'submit'} name={'create account'} color={'white'} bg={'red'}  />
                 <div className={styles.a_tag}>
                 Have an account already?
                 <span className={styles.span_text} onClick={() => navigate('/')}> Sign in</span> 
                 </div>
            </center>
            
        </form>
    </div>
  )
}

export default SignUp
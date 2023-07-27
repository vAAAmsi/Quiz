import ButtonMUI from "../../reusablecomponents/muibutton/muibutton"
import styles from './login.module.css'
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase/firebase"
import { TextField } from "@mui/material"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import Swal from "sweetalert2"

const Login = () => {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const Login_to_test =async (e) => {
        e.preventDefault();
        try {
            const usercred= await signInWithEmailAndPassword(auth,email,password)
            Swal.fire({
            icon:'success',
            title:'successfully logged in'
        }).then(
            navigate('/userdashboard')
        )
        } catch(error){
            console.log(error.code)
            if(error.code === 'auth/wrong-password')
            {
                Swal.fire(
                    {
                        icon:'error',
                        title:'wrong password/password must contain 6 letters'
                    }
                )
            } else if(error.code === 'auth/user-not-found'){
                Swal.fire(
                    {
                        icon:'error',
                        title:'Not an existing user'
                    }
                )
            }else{
                Swal.fire({
                    icon:'warning',
                    title:'Please connect to Internet'
                })
            }
        }
    }
   




  return (
    <div className={styles.container}>
        <form className={styles.form} autoComplete="off" onSubmit={Login_to_test}>
            <div className={styles.text}>Login To Take Quiz</div>
            <center className={styles.email}>
                <TextField label='Email' type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </center>
            <center className={styles.password}>
                <TextField label='Password' type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </center>
            <center className={styles.btn}>
                 <ButtonMUI type ={'submit'} name={'login'} color={'white'} bg={'red'}  />
                 <div className={styles.a_tag}>
                 Don't have an account? 
                 <span className={styles.span_text} onClick={() => navigate('/signin')}> Sign Up</span> 
                 </div>
            </center>
        </form>
    </div>
  )
}

export default Login
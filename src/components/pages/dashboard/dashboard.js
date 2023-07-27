import { Button, TextField } from '@mui/material';
import ButtonMUI from '../../../reusablecomponents/muibutton/muibutton';
import  { auth } from '../../../firebase/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../reusablecomponents/navbar/nav';
import styles from './dashboard.module.css'

const Dashboard = () => {
    const [username,setUsername] = useState('')
    const Testnames = ['Sql','React','Javascript','Cpp','CSS','HTML','Aptitide']
    const [filtername,setFiltername] = useState('')
    const [originaluid,setOriginaluid] = useState(null)
    const navigate = useNavigate()
    sessionStorage.setItem('mailid',username)
    sessionStorage.setItem('originaluid',originaluid)
    useEffect(() => {
      onAuthStateChanged(auth,(user) => {
        setOriginaluid(auth.currentUser.uid)
        if(user){
          setUsername(user.email)
        }else{
          console.log('user logged out')
        }
      })
  },[])

   return(
    <>
      <NavBar title ='Take Quiz' username={username} bg='#007BFF'/>
      <div className={styles.Search_container}>
          <TextField label='search' 
           onChange={(e) => setFiltername(e.target.value)} 
           className={styles.searchfiled}></TextField>
      </div>
      <div className={styles.main_box_container}>

        
        {
          Testnames
          .filter((name) =>{
            if(name){
               return name.toLowerCase().includes(filtername.toLowerCase())
            }
          } )
          .map((name,index) => {
            let routename = '/userdashboard'
            let tocapital = name.toLowerCase();
            const final_route=`${routename}${'/'}${tocapital}`
            
            return(
              <div key={index} 
              className={styles.inner_container}>
                <div className={styles.testname} >{name}</div>
                <Button style={{marginLeft:'10px'}} onClick={() => navigate(`${final_route}`,{state:{name,index}})} variant='contained'>attempt</Button>
              </div>
            )
          })
        }
      </div>
    </>
   )
}

export default Dashboard;
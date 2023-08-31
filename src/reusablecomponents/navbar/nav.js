import React, { useState,useEffect,useRef } from 'react'
import styles from './nav.module.css';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DropDown from '../../components/dropdown/dropdown';


export default function NavBar({username,title}) {
  const [isOpen,setIsOpen] = useState(false)
  
  
  return (
    <div className={styles.one} 
    >
        <div className={styles.support_cont}></div>
        <div className={styles.title}>
            {title}
        </div>
        
        <div className={styles.hidden_cont}>
        <div className={styles.last_container}>
            <AccountCircleSharpIcon  className={styles.usericon}/>
            <div className={styles.username}>{username}</div>
            <ExpandMoreIcon className={styles.drop_icon} onClick ={() => setIsOpen(!isOpen)} />
            {
                isOpen && <DropDown />
                
            }
            
        </div>
        </div>
          <div className={styles.cont_hidden}>
            <AccountCircleSharpIcon className={styles.drop_icon_hidden} 
            onClick ={() => setIsOpen(!isOpen)}  />
          </div>
          {
                isOpen && <DropDown username={username} />
                
          }
    </div>
  )
}

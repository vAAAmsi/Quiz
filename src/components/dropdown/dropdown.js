import styles from './dropdown.module.css'
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function DropDown({username}){
    const navigate = useNavigate()

    const logouthandler =async() => {
        await signOut(auth);
        navigate('/')
        Swal.fire({
            icon :'success',
            title :'successfully logged out'
        })
      }
    
    return (
        <div  className={styles.dropdown_menu}>
          <center className={styles.username_hidden}>{username}</center>
            <ul className={styles.dropdown_menu_ul}>
            {/* <li className={styles.dropdown_menu_li}>Profile</li>
            <li className={styles.dropdown_menu_li}>Settings</li> */}
            <li onClick={() => navigate('/userdashboard')} className={styles.dropdown_menu_li}>Tests</li>
            <li onClick={() => navigate('/userdashboard/marks/marksdashboard')} className={styles.dropdown_menu_li}>Marks</li>
            <li onClick={() => logouthandler()} className={styles.dropdown_menu_li}>Logout</li>
          </ul>
        </div>
    )
}

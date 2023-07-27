import React, { useEffect, useState } from 'react'
import NavBar from '../../../reusablecomponents/navbar/nav';
import { useLocation, useNavigate } from 'react-router-dom';
import Data from '../../../JsonData/data.json'
import { Button } from '@mui/material';
import styles from './testpage.module.css'
import db, { auth } from '../../../firebase/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';


export const TestPage = () => {
    const location = useLocation();
    const title = `${location.state.name} Test`
    const index_from_Rounting = location.state.index;
    const username = sessionStorage.getItem('mailid');
    const startIndex = index_from_Rounting * 5;
    const endIndex = startIndex + 5
    const data = Data.slice(startIndex,endIndex+1-1)
    const [selected,setSelected] = useState(null)
    const [TotalmarksArray,setTotalmarksArray] = useState([])
    const TotalResult = TotalmarksArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    var arr = [];
    const userid = sessionStorage.getItem('originaluid')
    const [isOpen,setIsOpen] = useState(false)
    const navigate = useNavigate()
    
    const seletedHandler = (option,question,index) => {

        const eachmarks = option === question.correctAnswer ? 2 :0;
        arr = TotalmarksArray;
        arr[index] = eachmarks;
        setTotalmarksArray([...arr])
    }
    const EndQuizHnadler = async() => {
        try{
            await addDoc(collection(db,'usermarks'),{
                textname : title,
                markssecured : TotalResult,
                date : new Date().getDate()+`/${new Date().getMonth()<9?'0':''}${new Date().getMonth()+1}/`+new Date().getFullYear(),
                uid : userid
                
            })
            Swal.fire({
                icon :'success',
                title:'Submitted'
            })
            navigate('/userdashboard/marks/marksdashboard')
        } catch(e){
            Swal.fire({
                icon :'error',
                title:'something went wrong'
            })
        }
            
    
    }
  return (
    <>
        <NavBar title={title} username={username} />
        <div  className={styles.container}>
            
        {
                data.map((item,index1) => {
                    return <div key={index1}>
                        <div className={styles.questionscont}  >{index1+1}) {item.question}</div>
                        
                        {item.options.map((option,index) =>{
                            return <label key={index}  className={styles.label}>
                            <input className={styles.radio} type='radio' onChange={(e) => seletedHandler(e.target.value,item,index1)}                            
                            value={option} name={index1}
                             ></input> {option}
                           </label>
                        })}
                    </div>
                   })
            }
            <div className={styles.btncont}>
                <Button style={{backgroundColor:'green',color:'white'}} 
                onClick={() => setIsOpen(!isOpen)}
                >End Quiz</Button>
            </div>
            {
                isOpen && <div className={styles.hiddencont}>
                    <div className={styles.hiddencont_box}>
                        <center className={styles.textname}>Are you sure want to submit?</center>
                        <center className={styles.textname}>Test name : <label style={{color:'green'}}>{title}</label></center>
                        <div className={styles.warningButtons}>

                            <Button style={{backgroundColor:'red',color:'white'}} 
                                onClick={() => setIsOpen(!isOpen)}>no</Button>
                            <Button style={{backgroundColor:'green',color:'white'}}
                                onClick={() => EndQuizHnadler()}
                            >yes</Button>
                            
                        </div>
                    </div>
                </div>
            }
        </div>
    </>
  )
}

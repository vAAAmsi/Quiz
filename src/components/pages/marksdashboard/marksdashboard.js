import React, { useEffect,useState } from 'react'
import { getDocs,collection,query, where } from 'firebase/firestore'
import db from '../../../firebase/firebase';
import styles from './marksdashboard.module.css'
import NavBar from '../../../reusablecomponents/navbar/nav'
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useLocation } from 'react-router-dom';

export const Marksdashboard = () => {

    const username = sessionStorage.getItem('mailid');
    const originaluid = sessionStorage.getItem('originaluid');
    const [data,setData] = useState([])
    
    const q = query(collection(db, 'usermarks'), where('uid', '==',originaluid ));
    useEffect(() => {

        const fetching = async() => {
          var d = []
          const docs = await getDocs(q);
          docs.forEach((doc) => {
            d=d.concat(doc.data())
          })
          setData(d)
          
        }
        fetching()
      },[])
    
  return (
    <>
        <NavBar title={'Marks Dashboard'} username={username} />

        <TableContainer component={Paper} className={styles.table}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.tabletitles}  >NAME OF THE TEST</TableCell>
            <TableCell className={styles.tabletitles}  align="center">MARKS SECURED</TableCell>
            <TableCell className={styles.tabletitles}  align="left">DATE</TableCell>
            <TableCell className={styles.tabletitles}  align="left">TIME</TableCell>
            <TableCell className={styles.tabletitles}  align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.textname}
              </TableCell>
              <TableCell align="center">{row.markssecured}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left" className={styles.time}>{row.time}</TableCell>
              <TableCell align="left" className={styles.time}>{row.markssecured>=6 ? "Passed" : "Failed"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}
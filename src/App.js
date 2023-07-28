import logo from './logo.svg';
import './App.css';
import {auth} from './firebase/firebase'
import Login from './components/login/login';
import {  Route, Routes } from "react-router-dom"
import SignUp from './components/signin/signup';
import Dashboard from './components/pages/dashboard/dashboard';
import { TestPage } from './components/pages/testpages/testpage';
import { Marksdashboard } from './components/pages/marksdashboard/marksdashboard';
function App() {
  
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path="/signin" element={<SignUp />}></Route>
        <Route path='/userdashboard' element={<Dashboard />}></Route>
        <Route path='/userdashboard/sql' element={<TestPage />}></Route>
        <Route path='/userdashboard/react' element={<TestPage />}></Route>
        <Route path='/userdashboard/javascript' element={<TestPage />}></Route>
        <Route path='/userdashboard/cpp' element={<TestPage />}></Route>
        <Route path='/userdashboard/css' element={<TestPage />}></Route>
        <Route path='/userdashboard/html' element={<TestPage />}></Route>
        <Route path='/userdashboard/aptitide' element={<TestPage />}></Route>
        <Route path='/userdashboard/english' element={<TestPage />}></Route>
        <Route path='/userdashboard/chemistry' element={<TestPage />}></Route>
        <Route path='/userdashboard/physics' element={<TestPage />}></Route>
        <Route path='/userdashboard/marks/marksdashboard' element={<Marksdashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
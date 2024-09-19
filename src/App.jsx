// Libraries
import React, { useState, createContext, useContext } from 'react'
import { useFormik } from 'formik'
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import Modal from 'react-modal'

// Components imports
import TechniciansPage from './pages/TechniciansPage';
import ManagementPage from './pages/ManagementPage';
import HomePage from './pages/HomePage';
import './App.css'


function App() {

  // Configure Firebase on this page
  const firebaseConfig = ({
    apiKey: "AIzaSyDh4yx57dsekS2fDXlG3mKINgb-S7ekOFo",
    authDomain: "store-71121.firebaseapp.com",
    projectId: "store-71121",
    storageBucket: "store-71121.appspot.com",
    messagingSenderId: "476254065427",
    appId: "1:476254065427:web:655a0cc21dfdbd16ed80e6",
    measurementId: "G-ZTRXH0FD7H"
  })  
  const app = initializeApp(firebaseConfig)  

  // Handle Login with Formik and firebase Auth
  const auth = getAuth()
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit : (values) => {
      // console.log(values)
    }
  })
  const email = formik.values.email;
  const password = formik.values.password;
  const loginEmailPassword = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        setAlertMessage(userCredential.user.displayName + ' has signed in successfully')
        setModalState(true)
      }).catch((error) => {
        setAlertMessage('An error occured | ' + error.message)
        setModalState(true)
        console.log(error)
      })
  }

  // Get the current user info using getAuth()
  const authorization = getAuth();
  const user = authorization.currentUser;
  
  // Sign out the user
  const signOutButton = () => {
    signOut(auth).then(() => {
      setAlertMessage('Sign-out successful')
      setModalState(true)
    }).catch((error) => {
      setAlertMessage('An error occured | ' + error.message)
      setModalState(true)
    });
  }

  

  //configure status information Modals
  Modal.setAppElement('#root');
  const [alertMessage, setAlertMessage] = useState('')
  const [modalState, setModalState] = useState(false)
  function openModal() {
    setModalState(true);
  }
  function closeModal() {
    setModalState(false);
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <>

    {/*Modal Element */}
    <Modal isOpen={modalState} shouldCloseOnOverlayClick={true} onRequestClose={closeModal} style={customStyles}>
      <p>{alertMessage}</p>
    </Modal>
     

     {/*Conditional rendering of Home page or signed in users page*/}
      {user? null: <HomePage/>}
      {user? user.uid === 'WadnHrRu3wclwma4oHXqfnBaz763'? <TechniciansPage name={user.displayName} email={user.email}/>: null : null}
      {user? user.uid === 'OIi2zqMzFRfG1nExpTjGZiJPqgd2'? <ManagementPage name={user.displayName} email={user.email}/>: null : null}


      {/*Component to let the user signin and signout*/}
      <div className='containForm'>
        <div className='containForm1'>
          <h1>LOGIN</h1>
        </div >
        <div>
          <form className='form' onSubmit={formik.handleSubmit}>
        <input placeholder='Email' type="text" name='email' onChange={formik.handleChange}/>
        <input placeholder='Password' type="text" name='password' onChange={formik.handleChange}/>
        <button type='submit' onClick={loginEmailPassword} >Sign In</button>
      </form>
      <button className='logout' onClick={signOutButton}>signOut</button>    
      </div>
      </div>
      
    </>
  )
}
        

export default App

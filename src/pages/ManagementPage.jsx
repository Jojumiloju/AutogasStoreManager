import React, { useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDocs, collection, setDoc, updateDoc, increment } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import Modal from 'react-modal'

import './ManagementPage.css'
import { addRequest, approveRequest } from '../store'

const ManagementPage = (props) => {

  // Generate Random Codes here
  function generateRandomCode(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++){
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  // Configure and Initialize firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDh4yx57dsekS2fDXlG3mKINgb-S7ekOFo",
        authDomain: "store-71121.firebaseapp.com",
    projectId: "store-71121",
    storageBucket: "store-71121.appspot.com",
    messagingSenderId: "476254065427",
    appId: "1:476254065427:web:655a0cc21dfdbd16ed80e6",
    measurementId: "G-ZTRXH0FD7H"
  }
  const app = initializeApp(firebaseConfig)
  
  // Get store information from firestore and Generate store html
  const db = getFirestore(app);
  const [tempStore, setTempStore] = useState([])
  async function getStoreInfo(){
    const querySnapshot = await getDocs(collection(db, "Store"))
    setTempStore([])
    querySnapshot.forEach((doc) => {
      setTempStore(tempStore => [...tempStore, doc.data()])
    })
    setAlertMessage("Store is up to date")
    setModalState(true)
  }  
  const generateStore = () => {
    return tempStore.map((item) => {
      return (
        <div key={item.item_id} style={{display: 'flex', justifyContent: 'space-between', color: '#005C53', border: 'solid', padding: '0.5rem', margin: '2px'}}>
          <p style={{width: '20%'}}>{item.item_id}</p>
          <p style={{width: '20%'}}>{item.item_name}</p>
          <p style={{width: '20%'}}>{item.description}</p>
          <p style={{width: '20%'}}>{item.manufacturer}</p>
          <p style={{width: '20%'}}>{item.Quantity}</p>
        </div>
      )
    })
  }

  //set up formik to handle Requests
  const formik = useFormik({
    initialValues: {
      itemID: '',
      numberRequired: '',
      reason: ''
    },
    onSubmit: (values) => {
      const newCode = generateRandomCode();
      async function setRequest(){
        const requestRef = doc(db, 'Request', newCode)
        try{
          await setDoc(requestRef, {
            itemID: values.itemID,
            numberRequired: values.numberRequired,
            reason: values.reason,
            code: newCode,
            time: new Date().toLocaleString(),
            user: props.name,
            approved: false
          })
        }catch(error){
          console.log(error)
        }
      }
      setRequest()
      setAlertMessage('Your request is being processed! | ' + 'Request Code: ' + newCode + ' | ItemID: ' + values.itemID + ' | Requested quantity: ' + values.numberRequired)
      setModalState(true)
    }
  })

  const [tempRequests, setTempRequests] = useState([])
  async function getRequestList(){
    const querySnapshot = await getDocs(collection(db, "Request"))
    setTempRequests([])
    querySnapshot.forEach((doc) => {
      setTempRequests(tempRequests => [...tempRequests, doc.data()])
    })
    setAlertMessage('Request list has been updated!')
    setModalState(true)
  }
  const approveRequests = (code, quantity, id) => {
    console.log(code, quantity, id)
    async function approve(){
      const requestRef = doc(db, "Store", String(id))
      try{
        await updateDoc(requestRef, {
                Quantity: increment(-quantity)
              })
              setAlertMessage("REQUEST APPROVED! | Store will be updated")
              setModalState(true)
              getStoreInfo()
      }catch(error){
        console.log(error)
      }
      
    }
    approve()
  }
  const generateRequests = () => {
    return tempRequests.map((item, index) => {
      return (
        <div key={item.id} style={{display: 'flex', justifyContent: 'space-between',border: 'solid', color: '#9FC131', padding: '0.5rem', margin: '2px'
        }}>
          <p style={{width: '20%'}}>{item.code}</p>
          <p style={{width: '20%'}}>{item.itemID}</p>
          <p style={{width: '20%'}}>{item.numberRequired}</p>
          <p style={{width: '20%'}}>{item.reason}</p>
          <p style={{width: '20%'}}>{item.time}</p>
          <p style={{width: '20%'}}>{item.user}</p>
          <button onClick={()=> approveRequests(item.code, item.numberRequired, item.itemID)} style={{padding: ' 1rem', border: 'none', backgroundColor: '#9FC131', color: 'white'}}>Approve</button>
        </div>
      )
    })
  }

  //Setup Modal for alerts and messages
  Modal.setAppElement('#root');
  const [alertMessage, setAlertMessage] = useState('')
  const [modalState, setModalState] = useState(false)
  function openModal(){
    setModalState(true)
  }
  function closeModal(){
    setModalState(false)
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

  {/*onClick={()=>dispatch(approveRequest(index)) */}
  
  return (
    <>

    {/*Modal Element */}
    <Modal isOpen={modalState} shouldCloseOnOverlayClick={true} onRequestClose={closeModal} style={customStyles}>
      <p>{alertMessage}</p>
    </Modal>

        {/*Display the current user's information and tools(probabaly) */}
        <div className='profile'>
          <div className='profile1'>
            <h1>USER</h1>
          </div>
          <div className='profile2'>

            <p>Name: {props.name}</p>
            <p>Email: {props.email}</p>
          </div>
          </div>

        {/*Request form */}
          <div className='managementForm'>
              <form action="" onSubmit={formik.handleSubmit}>
                <input name='itemID' placeholder='Item ID' type="number" onChange={formik.handleChange}/>
                <input name='numberRequired' placeholder='Number required' type="number" onChange={formik.handleChange}/>
                <input name='reason' placeholder='Reason' type="text" onChange={formik.handleChange}/>
                <button type='submit'>Generate Code</button>
              </form>
          </div><br />


          {/*Set up Store */}
          <h2>AUTOGAS STORE</h2>
          <button className='refresh_Store' onClick={()=> getStoreInfo()}>Refresh Store</button>
          <div>
            {generateStore()}
          </div>
          <br />
          <br />

          {/*Set up Request LIst */}
          <div id='requestListLabel-'>
            <h2>REQUESTS</h2>
            <button className='refresh_Store' onClick={()=> getRequestList()}>Refresh Request List</button>
          <div style={{display: 'flex', justifyContent: 'space-between', paddingLeft: '1rem', paddingRight: '1rem'}}>
            <p>Code</p>
            <p>ItemID</p>
            <p>No. Required</p>
            <p>Reason</p>
            <p>Timestamp</p>
            <p>Resquester</p>
            <p>Approve</p>
          </div>
          </div>          
          <div>
            {generateRequests()}
          </div>    
          <br />

    </>
    
  )
}

export default ManagementPage
import React, {useState} from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDocs, collection, setDoc, updateDoc, increment, deleteDoc } from 'firebase/firestore'

import './ControlPage.css'
import loginDemo from '../assets/loginDemo.png'

const ControlPage = () => {

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
  }  
  const generateStore = () => {
    return tempStore.map((item) => {
      return (
        <div key={item.item_id} style={{display: 'flex', justifyContent: 'space-between', color: '#042940', border: 'solid', padding: '0.5rem', margin: '2px'}}>
          <p style={{width: '20%'}}>{item.item_id}</p>
          <p style={{width: '20%'}}>{item.item_name}</p>
          <p style={{width: '20%'}}>{item.description}</p>
          <p style={{width: '20%'}}>{item.manufacturer}</p>
          <p style={{width: '20%'}}>{item.Quantity}</p>
        </div>
      )
    })
  }

  const [tempRequests, setTempRequests] = useState([])
  async function getRequestList(){
    const querySnapshot = await getDocs(collection(db, "ApprovedRequest"))
    setTempRequests([])
    querySnapshot.forEach((doc) => {
      setTempRequests(tempRequests => [...tempRequests, doc.data()])
    })
  }

  const generateRequests = () => {
    return tempRequests.map((item, index) => {
      return (
        <div key={item.id} style={{display: 'flex', justifyContent: 'space-between',border: 'solid', color: '#042940', padding: '0.5rem', margin: '2px'
        }}>
          <p style={{width: '20%'}}>{item.code}</p>
          <p style={{width: '20%'}}>{item.itemID}</p>
          <p style={{width: '20%'}}>{item.numberRequired}</p>
          <p style={{width: '20%'}}>{item.reason}</p>
          <p style={{width: '20%'}}>{item.time}</p>
          <p style={{width: '20%'}}>{item.user}</p>
        </div>
      )
    })
  }

  return (
    <>
    
    <div className='info_header'>Information Panel</div>

    {/*Display the store information */}
    <div className='info_store'>Store</div>
    <button className='info_refresh' onClick={()=> getStoreInfo()}>Refresh</button>
    <div>
      {generateStore()}
    </div>

    <div className='info_requests'>Approved Requests</div>
    <button className='info_refresh' onClick={()=> getRequestList()}>Refresh</button> 
    <div>
      {generateRequests()}
    </div>
    <br /><br />
    <div className='login_demo'>
      <p>Signup Page under construction 🚧</p>
      <img src={loginDemo} alt="Login Demo" />
    </div>
    
    </>
  )
}

export default ControlPage
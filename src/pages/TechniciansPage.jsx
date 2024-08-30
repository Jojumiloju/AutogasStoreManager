import React, { useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDocs, setDoc, collection, orderBy } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import './TechniciansPage.css'
import { addRequest } from '../store'

const TechniciansPage = (props) => {

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
    
    //get Store information from firestore and Generate store html
    const db = getFirestore(app);
    const [tempStore, setTempStore] = useState([])
    async function getStoreInfo(){
      const querySnapshot = await getDocs(collection(db, "Store"))
      setTempStore([])
      querySnapshot.forEach((doc) => {
        setTempStore(tempStore => [...tempStore, doc.data()])
      })
      alert("Store has been refreshed successfully")
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

    // Setting up formik to handle Requests
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
      alert('Your request has been saved! \nPlease ensure to copy your request code\n\n' + 'Request Code: ' + newCode + '\n\nitemID: ' + values.itemID + '\nrequested quantity: ' + values.numberRequired)
    }
  })


    return (
      <>

        {/*Display the current user's information and tools(probably)*/}
        <div className='profile'>
          <div className='profile1'>
            <h1>USER</h1>
          </div>
          <div className='profile2'>

            <p>Name: {props.name}</p>
            <p>Email: {props.email}</p>
          </div>
          </div>

          {/*Request form*/}
          <div className='managementForm'>
              <form action="" onSubmit={formik.handleSubmit}>
                <input name='itemID' placeholder='Item ID' type="number" onChange={formik.handleChange}/>
                <input name='numberRequired' placeholder='Number required' type="number" onChange={formik.handleChange}/>
                <input name='reason' placeholder='Reason' type="text" onChange={formik.handleChange}/>
                <button type='submit'>Generate Code</button>
              </form>
          </div><br />

          <button className='refresh_Store' onClick={()=> getStoreInfo()}>Refresh Store</button>

          {/*Set up Store */}
          <h2>AUTOGAS STORE</h2>
          <div>
            {generateStore()}
          </div>
          <br />
          <br />
    
    </>
    
  )
}

export default TechniciansPage
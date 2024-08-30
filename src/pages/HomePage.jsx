import React from 'react'

import autogasLogo from '../assets/autogasLogo.jpg'
import toyotaLogo from '../assets/toyotaLogo.jpg'
import corollaLogo from '../assets/corollaLogo.png'
import camryLogo from '../assets/camryLogo.jpg'
import rav4Logo from '../assets/rav4Logo.jpg'
import highlanderLogo from '../assets/highlanderLogo.png'
import priusLogo from '../assets/priusLogo.png'
import tacomaLogo from '../assets/tacomaLogo.png'
import mazda from '../assets/mazdaLogo.jpeg'
import lexus from '../assets/lexusLogo.jpg'
import volkswagen from '../assets/volkswagenLogo.jpg'
import audi from '../assets/audiLogo.jpg'
import honda from '../assets/hondaLogo.jpg'
import citroen from '../assets/citroenLogo.jpg'

import './HomePage.css'

const HomePage = () => {
  return (
    <>
    <div className='containHome'>
      <div className='image'>
        <div><img src={autogasLogo} />
          </div>
      </div>
      <div className='content'>
        <h1>AUTOGAS CONVERSION CENTER</h1>
        <p>
        Looking to green your ride without ditching your current car? Consider converting it to compressed natural gas (CNG)!  CNG burns cleaner than gasoline or diesel, resulting in lower emissions and potentially extending your engine's life. While the upfront cost of conversion can be high, long-term fuel savings in many regions can be significant.  However, CNG stations are less common than gas stations, so ensure there's enough infrastructure around you. Additionally, CNG tanks might take up some cargo space, and not all vehicles are compatible with conversion.  Do your research, find a qualified installer, and weigh the costs and benefits before deciding if CNG conversion is the path to a greener you, and your car.</p>
      </div>
    </div>
    <br />
    <div className='carmakes'>
      <div><img src={toyotaLogo} alt="" /></div>
      <div><img src={corollaLogo} alt="" /></div>
      <div><img src={camryLogo} alt="" /></div>
      <div><img src={rav4Logo} alt="" /></div>
      <div><img src={highlanderLogo} alt="" /></div>
      <div><img src={priusLogo} alt="" /></div>
      <div><img src={tacomaLogo} alt="" /></div>
      <div><img src={lexus} alt="" /></div>
      <div><img src={mazda} alt="" /></div>
      <div><img src={volkswagen} alt="" /></div>
      <div><img src={audi} alt="" /></div>
      <div><img src={honda} alt="" /></div>
      <div><img src={citroen} alt="" /></div>
    </div>
    <div className='extraContent'>
      <div><h2>Advantages</h2>
      <ul>
        <li>CNG conversion reduces emissions and pollutants in Nigeria.</li>
        <li>CNG fuel costs less than gasoline or diesel in Nigeria.</li>
        <li>CNG extends engine life compared to traditional fuels.</li>
        <li>CNG conversion promotes domestic fuel source utilization in Nigeria.</li>
        <li>The Nigerian government supports CNG adoption.</li>
      </ul>
      </div>
      <div>
        <h2>Disadvantages</h2>
        <ul>
          <li>High upfront conversion cost.</li>
          <li>Limited CNG refueling stations.</li>
          <li>CNG tanks reduce cargo space.</li>
          <li>Not all vehicles are CNG compatible.</li>
          <li>Potential for slight power reduction on CNG.</li>
        </ul>
      </div>
      <div>
        <h2>Precautions</h2>
        <ul>
          <li>Use a certified professional with experience in CNG conversions for safe installation.</li>
          <li> Ensure your specific vehicle model is compatible with CNG conversion to avoid issues.</li>
          <li>Follow safety protocols during installation to minimize fire hazards associated with CNG.</li>
          <li> Regularly inspect the CNG system for leaks to prevent potential gas buildup and safety risks.</li>
          <li>Familiarize yourself with proper CNG fueling techniques at designated stations.</li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default HomePage
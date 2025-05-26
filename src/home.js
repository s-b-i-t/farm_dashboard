//home.js
import image1 from './images/banner.jpg'
import image2 from './images/svsfbanner.jpg'
import image3 from './images/smiles.jpg'
import image4 from './images/flowerpots.jpg'
import React, { useState } from 'react';



const HomePage = () => {
  return (
    <div className="container" style={{  marginLeft: '100px', marginRight: '100px' }}>
      
      <h1>Home</h1>

      <img id='image1' src={image1} alt="Spring Valley Student Farm Mission" class="image-tile" style={{height:'75vh'}}></img>
      
      <div class="weather-container">
          <div class="weather-group">
            <div class="weather-header">
              <h2>About the Farm</h2>
              <h3>Spring Valley Student Farm</h3>
            </div>

            <div style={{  marginLeft: '10px', marginRight: '10px' }}>
              <p>
              The Spring Valley Student Farm (SVSF) is a vegetable farm owned by The University of Connecticut 
              and run by 11 residential student farmers, managed by Jessica Larkin-Wells. The farm was founded in 
              the Spring of 2010 and since then has provided the University of Connecticut’s dining halls with 
              fresh produce. Significant developments have arisen in the world of agricultural technology, 
              including precision agriculture. Precision agriculture is defined as the application of information, 
              technology, and management to optimize crop production. The farm currently does not utilize precision 
              agriculture so applications of this practice promise vast improvements for crop yield.</p>
            </div>
          </div>
      </div>


        <img id='image2' src={image4} alt="Farmers with Flowerpots" class="image-tile" style={{height:'75vh'}}></img>

      
      <div class="weather-container">
          <div class="weather-group">
            <div class="weather-header">
              <h2>About the Project</h2>
              <h3>Senior Design Project Team 23</h3>
            </div>

            <div style={{  marginLeft: '10px', marginRight: '10px' }}>
            <p>
              We aim to collect, store and manage data from our local weather station that measures and records live 
              agricultural metrics such as air temperature, humidity, rainfall, solar radiation, wind direction and 
              wind speed. We then aim to use machine learning and data analysis techniques to predict soil temperature 
              and present findings along with historical trends in a web based application accessible to student farmers. 
              In order to accomplish this goal, we will need to train a machine learning model on the Harvard Forest data 
              and apply it to the SVSF collected weather data.</p>

            <p>
              In addition to predicting soil temperature we also aim to better understand the microclimate of the 
              Spring Valley Student Farm. The farm is situated in a valley, giving it significantly different weather 
              conditions than the surrounding areas. In fact, the first frost at the farm in the fall is usually a 
              full week before the first frost on campus. For this reason it is integrally important to use the data 
              we collect on the farm to better understand how our microclimate is different from the surrounding area 
              and how that microclimate affects our practices and crop growth.</p>
            </div>
          </div>
      </div>


      <br></br>

    </div>
    
  );
}

export default HomePage;

//home.js

const HomePage = () => {
  return (
    <div style={{  marginLeft: '100px', marginRight: '100px' }}>
      <h1>Home (WIP)</h1>
      <img src="./springvalleylogo.jpg" alt="Spring Valley Student Farm Logo"></img>
      <h2>About the Project</h2>
      <h3>Spring Valley Student Farm</h3>
      <p>The Spring Valley Student Farm (SVSF) is a vegetable farm owned by The University of Connecticut 
        and run by 11 residential student farmers, managed by Jessica Larkin-Wells. The farm was founded in 
        the Spring of 2010 and since then has provided the University of Connecticut’s dining halls with 
        fresh produce. Significant developments have arisen in the world of agricultural technology, 
        including precision agriculture. Precision agriculture is defined as the application of information, 
        technology, and management to optimize crop production. The farm currently does not utilize precision 
        agriculture so applications of this practice promise vast improvements for crop yield.</p>
        
        <h3>Senior Design Project Team 23</h3>
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
      <img src="./svsfbanner.jpg" alt="Spring Valley Student Farm Banner"></img>
    </div>
    
  );
}

export default HomePage;

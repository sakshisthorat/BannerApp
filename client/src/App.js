import React, { useState,useEffect } from 'react';
//import React, {useEffect} from 'react';
import Banner from './Banner';
import Dashboard from './Dashboard';
//import Axios from "axios";
function App() {
    const [bannerData, setBannerData] = useState(false);
    const [isDashboard, setIsDashboard] = useState(false);
  
    useEffect(() => {
      fetch('http://localhost:3000/api/banner')
        .then((res) => res.json())
        .then((data) => setBannerData(data));
    }, []);

  const hideBanner = () => {
    setBannerData((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <button onClick={() => setIsDashboard(!isDashboard)}>
        {isDashboard ? 'View Website' : 'Go to Dashboard'}
      </button>
      {isDashboard ? (
        <Dashboard />
      ) : (
        bannerData && bannerData.isVisible && <Banner bannerData={bannerData} onHide={hideBanner} />
      )}
    </div>
  );
}

export default App;
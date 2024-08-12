

import React, { useEffect, useState } from 'react';

const Banner = () => {
  const [bannerData, setBannerData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/banner');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBannerData(data);
        setTimeLeft(data.timer);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, []);

  // useEffect(() => {
  //   if (timeLeft > 0 && bannerData) {
  //     const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [timeLeft, bannerData]);

  // if (timeLeft <= 0) {
  //   return null; // Return null to hide the banner
  // }
  // if (!bannerData || !bannerData.isVisible) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {
    if (timeLeft >= 0 && bannerData?.isVisible) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, bannerData]);

  if (!bannerData || !bannerData.isVisible) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ background: 'lightblue', padding: '20px', textAlign: 'center' }}>
      <h1>{bannerData.description}</h1>
      <p>This banner will disappear in {timeLeft} seconds.</p>
      {bannerData.link && <a href={bannerData.link}>Click here</a>}
    </div>
  );
};

export default Banner;
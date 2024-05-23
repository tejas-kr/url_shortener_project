import { React, useEffect, useState } from 'react'
import Navbar from './Navbar';

function AllUrls() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/admin/all')
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []);

  return (
    <div className="py-20 px-10 m-auto max-w-6xl container">
      <Navbar />
      <h1>All URLs</h1>
      {loading ? <div className='py-10'>Loading...</div> : ''}
      <div className='py-10'>  
        <ul className='space-y-5'>
          {data.length && data.map((item, index) => (
            <li key={index}>
              {item.target_url}: {item.key}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AllUrls

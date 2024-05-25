import { React, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import '../loader.css'
import Navbar from './Navbar';

function AllUrls() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/admin/all')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setData(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []);

  const delete_url = (sec_key) => {
    console.log(sec_key)
    fetch(`http://127.0.0.1:8000/admin/${sec_key}`, {
      method: "DELETE"
    })
    .then((response) => {
      const newData = data.filter(d => {
        d.secret_key !== sec_key
      });
      console.log(newData);
      setData(newData);
      response.json();
    })
    .catch((error) => {
      console.error('Error Deleting:', error);
      setLoading(false);
    });
  }

  return (
    <div className="py-20 px-10 m-auto max-w-6xl container">
      <Navbar />
      <h1>All URLs</h1>
      {
        loading ? 
        <div className='grid h-screen place-items-center'>
          <div className="loadingio-spinner-bean-eater-nq4q5u6dq7r"><div className="ldio-x2uulkbinbj">
          <div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
          </div></div>
        </div>
        : ''
      }
      <div className='py-10'> 
        <table className='table-auto border-separate border-spacing-2 border border-slate-400'>
          <tr>
            <th>
              Target URL
            </th>
            <th>
              Shortened URL
            </th>
            <th>
              Action
            </th>
          </tr>
          {data.length && data.map((item, index) => (
          <tr key={index}>
            <td className='font-semibold text-sm p-2 border border-slate-300'>
              {item.target_url}
            </td>
            <td className='font-semibold text-sm p-2 border border-slate-300'>
              {item.url}
            </td>
            <td className='text-center p-2 border border-slate-300'>
              <FontAwesomeIcon onClick={() => delete_url(item.secret_key)} className='hover:text-xl' icon={faTrash} />
            </td>
          </tr>
          ))}
        </table> 
      </div>
    </div>
  )
}

export default AllUrls

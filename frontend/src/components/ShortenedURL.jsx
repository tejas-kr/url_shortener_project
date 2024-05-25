import {React, useState} from 'react'

function ShortenedURL({ shortenedUrl }) {
  let url = shortenedUrl;

  return (
    <div id='new_url_div' className={`my-10 mx-2 space-y-5 ${url === '' ? 'hidden': ''}`}>
        <h3 id='new_url' className='font-semibold text-3xl'>{url}</h3>
    </div>
  )
}

export default ShortenedURL

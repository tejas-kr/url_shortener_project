import {React, useState} from 'react'

function AddURLForm({ sendDataToParent }) {
  const [formData, setFormData] = useState({
    'target_url': ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      'target_url': value
    });
  }

  const [newShortenedUrl, setNewShortenedUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/url', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then((data) => {
      sendDataToParent(data['url']);
    })
    .catch(error => {
      console.error('There was an error submitting the form!', error);
    });
  
  }


  return (
    <form className='my-10 mx-2'>
        <div className="space-y-12">
            <div className="pb-12">
                <h2 className="font-semibold leading-7 ">About this App</h2>
                <p className="mt-1 leading-6 ">
                    Shorten you URLs to just five character long
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label className='block text-sm font-medium leading-6 text-gray-900' htmlFor='url_input'>
                            Enter URL
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                                            focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 
                                            sm:max-w-md">
                                <input
                                    type="text"
                                    name="url_input"
                                    id="url_input"
                                    // value={formData.target_url}
                                    onChange={handleChange}
                                    autoComplete="url_input"
                                    className="block flex-1 border-0 rounded-md py-1.5 pl-1 
                                            text-gray-900 placeholder:text-gray-400 focus:ring-0 
                                            sm:text-sm sm:leading-6"
                                    placeholder="https://www.your-very-very-long-url-goes-here.com/you-are-awesome?name=mr-cool"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="flex items-center justify-start">
            <button
                type="button"
                onClick={handleSubmit}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold 
                        text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                        focus-visible:outline-2 focus-visible:outline-offset-2 
                        focus-visible:outline-indigo-600"
            >
                Shorten URL
            </button>
        </div>
    </form>
  )
}

export default AddURLForm

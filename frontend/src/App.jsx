import './App.css'
import {React, useEffect, useState} from "react"
import AddURLForm from './components/AddURLForm'
import ShortenedURL from './components/ShortenedURL'

function App() {
    const [data, setData] = useState('Loading...');

    const [shortenedUrl, setShortenedUrl] = useState('');

    const handleDataFromChild = (childData) => {
        setShortenedUrl(childData);
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/healthCheck')
        .then((res) => res.json())
        .then(data => setData(data.msg))
        .catch((error) => console.log(error))
    }, [])

    return (
        <main className="py-20 px-10 m-auto max-w-6xl container">
            <h1>URL Shortener</h1>
            <AddURLForm sendDataToParent={handleDataFromChild} />
            <ShortenedURL shortenedUrl={shortenedUrl} />
            <p>{data}</p>
        </main>
    )
}

export default App

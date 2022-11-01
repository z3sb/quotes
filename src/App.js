import React, {useState, useEffect} from 'react';
import { Container } from 'reactstrap';
import './App.css';
function App() {
  const colors = ['#73a857', '#fb6964', '#342224', '#e74c3c', '#77b1a9', '#9b59b6', '#27ae60'];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [author, steAuthor] = useState('');
  const random = () => {
    let n = Math.floor(Math.random() * data.length);
    setText(data[n].text);
    steAuthor(data[n].author);
    document.documentElement.style.setProperty('--main', colors[Math.floor(Math.random() * colors.length)])
  }
  async function getData(){
    try{
      const response = await fetch(`https://type.fit/api/quotes`);
      if(!response.ok){
        throw new Error('please check your internet connection')
      }
      let data = await response.json();
      setData(data);
      setText(data[0].text)
      steAuthor(data[0].author)
      setError(null);
    }
    catch(err) {
      setError(err.message);
      setData(null)
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      {
        loading 
        ? <div className='loading'>
          <span></span>
          <span></span>
          <span></span>
        </div>
        : error ? <div>{`There is a problem - ${error}`}</div> :<Container className='d-flex align-items-center justify-content-center h-100'>
        <div className='quote-box py-4 px-5' id='quote-box'>
        <div className='text mt-3' id='text'>
          <p className='text-center'><i className="ri-double-quotes-l"></i> {text}</p>
          <div className='text-end'><span id="author">- {author}</span></div>
        </div>
        <div className='icons mt-3 py-3 d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center gap-2'>
            <a target='_blank' href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${text}`}><i className="ri-twitter-fill"></i></a>
            <a target='_blank' href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=John%20Lennon&content=${text}2Fbuttons&shareSource=tumblr_share_button`}><i className="ri-tumblr-fill"></i></a>
          </div>
          <button className='btn new__quote' id="new-quote" onClick={random}>New quote</button>
        </div>
      </div>
      </Container>
      }
    </div>
  );
}

export default App;
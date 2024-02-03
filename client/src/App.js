import React, { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([{}])
  const [title, setTitle] = useState(''); 
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');

  const handleSubmit = (e) => {
    e.preventDefault();
    const journal = {title, body, author};

    fetch('http://localhost:4997/postData', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(journal)
    }).then(() => {
      console.log('new journal added');
    })
    // console.log(journal);
  }

  useEffect(() => {
    fetch("http://localhost:4997/getData").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div className="app">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Journal title</label>
        <input 
          type='text'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Journal body:</label>
        <textarea 
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}></textarea>
        <label>Journal author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button>Add Journal</button>
        <p>{title}</p>
        <p>{body}</p>
        <p>{author}</p>
      </form>
      {(typeof data.members === 'undefined') ? (
        <p>Loading...</p>
      ): (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )}
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react'

function Journal() {
    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const day = today. getDate();
    const currentDate = month + "/" + day + "/" + year;
  
    const [data, setData] = useState([{}]);
    const [topic, setTopic] = useState(''); 
    const [body, setBody] = useState('');
    const [date, setDate] = useState(currentDate);
    const [timeTaken, setTimeTaken] = useState('0:00');
    const [journalPost, setJournalPost] = useState({});
  
    // ERASE THIS LINE
    const [author, setAuthor] = useState('mario');
  
    // useEffect to run after date state is updated
    useEffect(() => {
      // Create your journal_post object here with the updated date
      console.log(date);
      setJournalPost({ topic, body, date, timeTaken });
    }, [topic, body, timeTaken, date]);
  
    // Update date state
    const updateDate = (currentDate) => {
      setDate(currentDate);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const today = new Date();
      const month = today.getMonth()+1;
      const year = today.getFullYear();
      const day = today. getDate();
      const currentDate = month + "/" + day + "/" + year;
      updateDate(currentDate);
      // setJournalPost({title, body, date, timeTaken});
      // const journal_post = {title, body, date, timeTaken};
  
      fetch('http://localhost:4997/postData', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(journalPost)
      }).then(() => {
        console.log('new journal added');
        console.log(journalPost);
      })
      // console.log(journal_post);
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
          <label>Journal Topic</label>
          <input 
            type='text'
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
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
          <p>{topic}</p>
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

export default Journal
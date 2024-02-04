import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface JournalPost {
  topic: string;
  body: string;
  date: string;
  timeTaken: string;
}

function Journal() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const day = today.getDate();
  const currentDate = `${month}/${day}/${year}`;

  const [data, setData] = useState<string[]>([]);
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState(currentDate);
  const [timeTaken, setTimeTaken] = useState("0:00");
  const [journalPost, setJournalPost] = useState<JournalPost>({
    topic: "",
    body: "",
    date: currentDate,
    timeTaken: "0:00",
  });

  // useEffect to run after date state is updated
  useEffect(() => {
    // Create your journal_post object here with the updated date
    console.log(date);
    setJournalPost({ ...journalPost, topic, body, timeTaken });
  }, [topic, body, timeTaken, date, journalPost]);

  let navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDate();
    const currentDate = `${month}/${day}/${year}`;
    setDate(currentDate);

    fetch("http://localhost:4997/postDataJournal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(journalPost),
    }).then(() => {
      console.log("new journal added");
      console.log(journalPost);
      let path = "/";
      navigate(path);
    });
  };

  useEffect(() => {
    fetch("http://localhost:4997/getDataJournal")
      .then((res) => res.json())
      .then((data) => {
        setData(data.members || []);
        console.log(data);
      });
  }, []);

  return (
    <div className="app">
      <h2>Add a New Journal</h2>
      <form onSubmit={handleSubmit}>
        <label>Journal Topic</label>
        <input
          type="text"
          required
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <label>Journal body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button>Add Journal</button>
        <p>{topic}</p>
        <p>{body}</p>
      </form>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        data.map((member, i) => <p key={i}>{member}</p>)
      )}
    </div>
  );
}

export default Journal;

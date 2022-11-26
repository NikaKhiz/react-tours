import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const filteredTours = tours.filter((tour) => tour.id !== id);
    setTours(filteredTours);
  }

  const fetchTours = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setTours(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchTours();
  }, [])
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length == 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button type="button" className="btn" onClick={fetchTours}  >refresh</button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App

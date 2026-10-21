import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import EventList from './pages/EventList';
import AddEvent from './pages/AddEvent';
import EventDetail from './pages/EventDetail';

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const saved = localStorage.getItem("gk_events");

    if (saved) {
      setEvents(JSON.parse(saved));
      setLoading(false);
    } else {
      axios.get("/data/events.json", { signal: controller.signal })
        .then(res => {
          setEvents(res.data);
          setLoading(false);
        })
        .catch(err => {
          if (!axios.isCancel(err)) {
            setError(true);
            setLoading(false);
          }
        });
    }

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("gk_events", JSON.stringify(events));
    }
  }, [events, loading]);

  const handleRegister = (id) => {
    setEvents(prev => prev.map(ev => ev.id === id && ev.registered < ev.capacity ? { ...ev, registered: ev.registered + 1 } : ev));
  };

  const handleDelete = (id) => {
    setEvents(prev => prev.filter(ev => ev.id !== id));
  };

  const handleAdd = (newEvent) => {
    setEvents(prev => [...prev, newEvent]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home events={events} loading={loading} error={error} />} />
        <Route path="events" element={<EventList events={events} loading={loading} error={error} onRegister={handleRegister} onDelete={handleDelete} />} />
        <Route path="events/new" element={<AddEvent events={events} onAdd={handleAdd} />} />
        <Route path="events/:id" element={<EventDetail events={events} />} />
      </Route>
    </Routes>
  );
};

export default App;
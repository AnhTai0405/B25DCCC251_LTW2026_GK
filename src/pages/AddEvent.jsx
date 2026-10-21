import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEvent = ({ events, onAdd }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !location || !date || !capacity) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin phía dưới form');
      return;
    }

    const capNum = Number(capacity);
    if (isNaN(capNum) || capNum < 10 || capNum > 1000) {
      setErrorMsg('Sức chứa phải từ 10 đến 1000');
      return;
    }

    const maxId = events.length > 0 ? Math.max(...events.map(ev => ev.id)) : 0;
    const newEvent = {
      id: maxId + 1,
      name,
      location,
      date,
      capacity: capNum,
      registered: 0
    };

    onAdd(newEvent);
    navigate('/events', { replace: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên sự kiện</label>
          <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="location">Địa điểm</label>
          <input id="location" type="text" value={location} onChange={e => setLocation(e.target.value)} />
        </div>
        <div>
          <label htmlFor="date">Ngày diễn ra</label>
          <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="capacity">Sức chứa</label>
          <input id="capacity" type="number" value={capacity} onChange={e => setCapacity(e.target.value)} />
        </div>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddEvent;
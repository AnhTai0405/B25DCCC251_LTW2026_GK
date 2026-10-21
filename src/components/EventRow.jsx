import React from 'react';
import { Link } from 'react-router-dom';

const EventRow = ({ event, onRegister, onDelete }) => {
  const isFull = event.registered >= event.capacity;

  return (
    <tr style={{ cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
      <td><Link to={`/events/${event.id}`}>{event.name}</Link></td>
      <td>{event.location}</td>
      <td>{event.date}</td>
      <td>
        <span style={isFull ? { color: 'gray', fontStyle: 'italic' } : {}}>
          {event.registered}/{event.capacity} {isFull && "Sự kiện đã đầy"}
        </span>
      </td>
      <td>
        <button disabled={isFull} onClick={() => onRegister(event.id)}>Đăng ký</button>
        <button onClick={() => onDelete(event.id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default EventRow;
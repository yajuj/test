import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Message from './components/message';
import { useAppContext } from './context';

function App() {
  const { data } = useAppContext();
  if (!data.length) return <p className='container mt-3'>Nothing here</p>;
  return (
    <div className='container mt-3'>
      <ul className='list-group'>
        {data.map(message => (
          <Message message={message} key={message.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;

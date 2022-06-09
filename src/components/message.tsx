import React from 'react';
import { Data } from '../type';

interface MessageProps {
  message: Data;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  if (message.fromMe) return null;
  return (
    <li className='list-group-item'>
      <div>
        <p>{message.fromUser.name}</p>
        <div className='d-flex'>
          <div className='border p-2 rounded'>
            <p className='text-break'> {message.message.text}</p>
            {message.type === 'image' ? (
              <img
                className='rounded w-auto'
                src={message.message.file.link}
                width='120'
                height='120'
                alt=''
              />
            ) : message.type === 'video' ? (
              <video
                className='rounded w-auto'
                width='100'
                height='100'
                src={message.message.file.link}
                autoPlay
                loop
              ></video>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Message;

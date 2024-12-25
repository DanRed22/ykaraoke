'use client';
import React, {useEffect, useState} from 'react';

export default function QueueView({ propData, setPropData, finishSong, remove }) {
  const [queueData, setQueueData] = useState(propData);

  useEffect(() => {
    setQueueData(propData);
  }, [propData]);

  const truncateTitle = (title) => {
    const MAX_LENGTH = 40;
    return title.length > MAX_LENGTH ? title.substring(0, 57) + '...' : title;
  };

  return (
    <div className='w-full p-3'>
      <p className='text-2xl font-bold text-start'>Reservations</p>
      
      <div className='flex flex-col items-center justify-center w-full p-4 overflow-y-auto' style={{maxHeight: '40prem'}}>
        {Array.isArray(queueData) && queueData?.map((item, index) => (
          <div className='flex flex-row items-center justify-between w-full p-4 border rounded-lg mb-2' key={index}>
            <p className='text-md text-start overflow-clip'>{truncateTitle(item.snippet.title)}</p>
            <p className='text-md text-start'>{item.snippet.channelTitle}</p>
            <button className='bg-red-500 text-white p-2 rounded-md' onClick={() => remove(item)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}
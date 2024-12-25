'use client';
import { useQueue } from '@/contexts/QueueContext';
import QueueView from '@/components/QueueView';
import SearchTable from '@/components/searchTable';
import YouTube from 'react-youtube';
import { GrChapterNext } from "react-icons/gr";

export default function PresentPage() {
  const { queue, setQueue } = useQueue();

  const finishSong = () => {
    const newQueue = [...queue];
    newQueue.shift();
    setQueue(newQueue);
  }

  const remove = (item) => {
    const newQueue = queue.filter((song) => song !== item);
    setQueue(newQueue);
  }

  return (
    <div className='w-full flex flex-col p-4'>
      <div className='flex flex-row space-x-4 py-2'>
        <p className='text-4xl font-bold'>YKaraoke!</p>
        <button 
        onClick={() => finishSong()}
        className=' bg-blue-700 hover:bg-blue-800 flex flex-row items-center justify-center p-2 rounded-md'><GrChapterNext className='mx-2'/> Next Song</button>
        </div>
<div className='flex flex-row w-full h-[30rem] mt-2'>
        <div className='flex flex-col w-4/6 border h-full p-4 rounded-md mx-1'>
        {!queue || queue.length === 0 ? <p className='text-2xl'>No Song Selected</p> :
          <YouTube
            videoId={queue && queue.length > 0 ? queue[0].id.videoId : ''}
            opts={{
              height: '300%',
              width: '100%',
              playerVars: {
                autoplay: 1,
              },
            }}
            onEnd={finishSong}
          />}
        </div>
        <div className='flex flex-col w-3/6 border p-2 rounded-md'>
        {
          <SearchTable reserveAction={(song) => 
            
            {
            setQueue([...queue, song]);
          }}/>

        }
        </div>
        </div>
        <QueueView propData={queue} setPropData={setQueue} finishSong={finishSong} remove={remove}/>
        </div>
  )
}

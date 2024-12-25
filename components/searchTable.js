'use client'
import React, { useState } from 'react'
import { FaPlusCircle } from "react-icons/fa";
import { searchVideos } from '@/lib/videos';
import Image from 'next/image';

export default function SearchTable({width, isHomepage, reserveAction}) {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleSearch = async (e) => {

        e.preventDefault();
          setIsLoading(true);
        try {
            const query = e.target.elements[0].value;
            const response = await searchVideos(query + ' karaoke');
            setData(response.items);
            console.log(response.items);
        } finally {
            setIsLoading(false);
        }
    }

    const truncateTitle = (title) => {
        const MAX_LENGTH = 60;
        return title.length > MAX_LENGTH ? title.substring(0, 57) + '...' : title;
      };
  return (
<div className={`${width && typeof width === 'number' && width > 0? `w-[${width}rem]` : 'w-full'} relative overflow-x-auto shadow-md sm:rounded-lg`}>
    <form className="max-w-md mx-auto mb-4" onSubmit={(e) => handleSearch(e)}>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Here" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

    {isLoading && 
        <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
                }
    {!isLoading && data.length === 0 && 
    <div className="w-full p-4 text-center text-gray-500 dark:text-gray-400">No data found</div>}
    {!isLoading && data.length > 0 && (
    <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-2 py-3"></th>
                <th scope="col" className="px-2 py-3">
                    Title
                </th>
                <th scope="col" className="px-2 py-3">
                    Author
                </th>
                <th scope="col" className="px-2 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {
            data.map((item, key) => (
            <tr key={key} className="bg-white border-b dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-2 py-4">
                    {key + 1}
                </td>
                <td className="flex flex-row  items-center justify-start px-6 py-4 whitespace-nowrap">
                    <div className="flex items
                    -center">
                        <div className="flex items-start justify-start w-[8rem] h-[6.6rem] border rounded-md">
                            <Image width={480} height={360} src={item.snippet.thumbnails['high']['url']} alt="" className="rounded-md" />
                        </div>
                        <div className={`ml-4 ${isHomepage ? 'w-full': 'w-[7rem]'}`}>
                            <p className={` dark:text-white ${isHomepage ? 'w-full': 'text-xs'}`}>
                                {truncateTitle(item.snippet.title)}
                            </p>
                        </div>
                    </div>
                </td>
                <td className="px-2 py-4">
                    {item.snippet.channelTitle}
                </td>
                <td className="px-2 py-4 text-right ">
                    <button 
                    onClick={() => reserveAction(item)}
                    className="flex flex-row items-center w-[7rem] dark:bg-blue-500 dark:hover:bg-blue-700 bg-white p-4 rounded-lg font-medium text-blue-600 dark:text-white hover:underline">
                        <FaPlusCircle className='mr-2 w-4'/>Reserve</button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>)}


    </div>
  )
}

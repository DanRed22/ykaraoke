
'use server';

 function decodeHtmlEntities(text) {
    const entities = {
      '&#39;': "'",
      '&amp;': '&',
      '&quot;': '"',
      '&lt;': '<',
      '&gt;': '>'
    };
    
    return text.replace(/&#39;|&amp;|&quot;|&lt;|&gt;/g, match => entities[match]);
  }


  const filterVideos = async (videos) => {
    const filteredVideos = videos.filter(video => !video.snippet.channelTitle.includes('Sing King') && !video.snippet.channelTitle.includes('Sing2Piano'));
    return filteredVideos;
  }

export const searchVideos = async (query) => {
    console.log(process.env.API_KEY);
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${process.env.API_KEY}`);
  const data = await response.json();
  if (data.items) {
    data.items = data.items.map(item => ({
      ...item,
      snippet: {
        ...item.snippet,
        title: decodeHtmlEntities(item.snippet.title)
      }
    }));
  }
  data.items = await filterVideos(data.items);
  console.log(data)
  return data;

}
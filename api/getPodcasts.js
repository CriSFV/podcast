
export default async function getPodcasts() {
  const url = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  const allorigins = encodeURIComponent(`${url}`);
  try{
    const response = await fetch(`https://api.allorigins.win/raw?url=${allorigins}`);
    const data = await response.json();
    return data;
  }
  catch(error) {
    throw new Error("It was an error:", error);
  };
}

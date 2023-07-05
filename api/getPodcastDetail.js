export default async function getPodcastInfo(id) {
  const url = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`
  const allorigins = encodeURIComponent(`${url}`);
  try{
    const response = await fetch(`https://api.allorigins.win/raw?url=${allorigins}`,{ cache: "no-store" });
    const data = await response.json();
    return data;
  }
  catch(error) {
    throw new Error("It was an error:", error);
  }
}

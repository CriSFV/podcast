export default async function getPodcasts() {
    return await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`
    )
      .then((response) => {
        const data = response.json();
        return Promise.resolve(data);
      })
      .catch((error) => {
        throw new Error("It was an error:", error);
      });
  }
  
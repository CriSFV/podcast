export default async function getPodcastInfo(id) {
  return await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`
    )}`,
    {
      next: {
        revalidate: 86400000,
      },
    }
  )
    .then((response) => {
      const data = response.json();
      return Promise.resolve(data);
    })
    .catch((error) => {
      throw new Error("Upss, it's been an error:", error);
    });
}

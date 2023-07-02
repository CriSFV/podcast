export const formatDataList = (data) => {
  const contents = JSON.parse(data.contents);
  const podcasts = contents?.feed?.entry.map((podcast) => {
    return {
      id: podcast.id.attributes["im:id"],
      title: podcast["im:name"].label,
      author: podcast["im:artist"].label,
      img: podcast["im:image"][2].label,
      summary: podcast.summary.label,
    };
  });
  return podcasts;
};

export const formatPodcastDetail = (data) => {
  const contents = JSON.parse(data.contents);
  const podcast = contents?.results?.map((episode) => {
    return {
      id_author: episode.collectionId,
      wrapperType: episode.wrapperType,
      releaseDate: episode.releaseDate,
      trackTimeMillis: episode.trackTimeMillis,
      trackId: episode.trackId,
      trackName: episode.trackName,
      episodeUrl: episode.episodeUrl,
      description: episode.description,
    };
  });
  return podcast;
};

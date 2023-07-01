import { useRouter } from "next/router";
import PodcastDetail from "../../../components/PodcastDetail";

export default function Podcast({params}) {
  console.log("🚀 ~ file: index.js:5 ~ Podcast ~ params:", params)
  const router = useRouter();
  const { id } = router.query;

  return (
      <PodcastDetail podcastId={id} />
  );
}

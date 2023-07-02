import { useRouter } from "next/router";
import PodcastDetail from "../../../components/PodcastDetail";

export default function Podcast({params}) {
  const router = useRouter();
  const { id } = router.query;

  return (
      <PodcastDetail podcastId={id} />
  );
}

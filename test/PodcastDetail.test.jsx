import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoaderProvider } from "../contexts/LoadingContext";
import { podcastDetailMock } from "./mocks/podcastsMock";
import useCache from "../hooks/useCache";
import PodcastDetail from "../components/PodcastDetail";


jest.mock("../hooks/useCache", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../api/getPodcasts", () => jest.fn());
jest.mock("../api/getPodcastDetail", () => jest.fn());

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: () => ({
    query: {
      trackId: "1000604730376",
      podcastId: "1535809342",
    },
  }),
}));


describe("PodcastDetail", () => {
  it("should render a podcast episodes list", () => {
    useCache.mockImplementation(() => [podcastDetailMock]);

    render(
      <LoaderProvider>
        <PodcastDetail />
      </LoaderProvider>
    );
    const podcastEpisodeList = screen.getByRole("table");
    expect(podcastEpisodeList.children).toHaveLength(2);
  });
});


import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoaderProvider } from "../contexts/LoadingContext";
import { podcastDetailMock } from "./mocks/podcastsMock";
import useLocalStorage from "../hooks/useLocalStorage";
import EpisodeDetail from "../components/EpisodeDetail";

jest.mock("../hooks/useLocalStorage", () => ({
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
      id: "1535809342",
    },
  }),
}));

describe("EpisodeDetail", () => {
  it("should render an episode", () => {
    useLocalStorage.mockImplementation(() => [podcastDetailMock]);

    render(
      <LoaderProvider>
        <EpisodeDetail />
      </LoaderProvider>
    );
    const podcastEpisodeList = screen.getByText(podcastDetailMock[1].trackName);
    expect(podcastEpisodeList).toBeInTheDocument();
  });
});

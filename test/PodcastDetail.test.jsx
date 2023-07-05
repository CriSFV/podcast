import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoaderProvider } from "../contexts/LoadingContext";
import { podcastDetailMock } from "./mocks/podcastsMock";
import useLocalStorage from "../hooks/useLocalStorage";
import PodcastDetail from "../components/PodcastDetail";


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


describe("PodcastDetail", () => {
  it("should render a podcast episodes list", () => {
    useLocalStorage.mockImplementation(() => [podcastDetailMock]);

    render(
      <LoaderProvider>
        <PodcastDetail />
      </LoaderProvider>
    );
    const podcastEpisodeList = screen.getByRole("table");
    expect(podcastEpisodeList.children).toHaveLength(2);
  });
});


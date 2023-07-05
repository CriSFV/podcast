import { render, screen, fireEvent } from "@testing-library/react";
import Landing from "../components/Landing";
import "@testing-library/jest-dom";
import { LoaderProvider } from "../contexts/LoadingContext";
import getPodcasts from "../api/getPodcasts";
import {
  podcastListMock,
  podcastListMockAfterFormated,
  podcastSelectedMock,
  podcastDetailMock,
} from "./mocks/podcastsMock";
import useLocalStorage from "../hooks/useLocalStorage";
import getPodcastInfo from "../api/getPodcastDetail";
import PodcastDetail from "../components/PodcastDetail";
import PodcastCard from "../components/PodcastCard";
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

const LandingWithProvider = (props) => (
  <LoaderProvider>
    <Landing />
  </LoaderProvider>
);

describe("Landing", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should match with snapshot", () => {
    useLocalStorage.mockImplementation(() => [Date.now() - 100]);
    useLocalStorage.mockImplementation(() => [podcastListMockAfterFormated]);

    const component = render(<LandingWithProvider />);
    expect(screen.getByText("Podcaster")).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });

  it("should render the list", () => {
    const getPodcastMock = getPodcasts.mockImplementation(
      () => podcastListMock
    );
    useLocalStorage.mockImplementation(() => [Date.now() - 100]);
    useLocalStorage.mockImplementation(() => [podcastListMockAfterFormated]);

    const component = render(<LandingWithProvider />);
    expect(screen.getByText("Podcaster")).toBeInTheDocument();
    expect(component.container).toHaveTextContent("Jhon Doe");
    expect(getPodcastMock).not.toHaveBeenCalled();
  });

  it("should search a podcast from the input", () => {
    useLocalStorage.mockImplementation(() => [Date.now() - 100]);
    useLocalStorage.mockImplementation(() => [podcastListMockAfterFormated]);

    const userSearch = jest.fn();
    render(
      <LoaderProvider>
        <Landing userSearch={userSearch} />
      </LoaderProvider>
    );
    const input = screen.getByPlaceholderText("Filter podcast");
    const listCounter = screen.getByTestId("list-counter");

    fireEvent.keyUp(input, { target: { value: "doe" } });

    expect(input.value).toBe("doe");
    expect(screen.getByText("Podcast Jhon Doe")).toBeInTheDocument();
    expect(listCounter).toHaveTextContent(1);
  });
});

describe("PodcastDetail", () => {
  it("should render a podcast episodes list", () => {
    getPodcastInfo.mockImplementation(() => {
      podcastDetailMock;
    });
    getPodcasts.mockImplementation(() => {
      podcastListMock;
    });
    useLocalStorage.mockImplementation(() => [podcastDetailMock]);
    // useLocalStorage.mockImplementation(() => [podcastSelectedMock]);

    render(
      <LoaderProvider>
        <PodcastDetail />
      </LoaderProvider>
    );
    const podcastEpisodeList = screen.getByRole("table");
    expect(podcastEpisodeList.children).toHaveLength(2);
  });
});
describe("EpisodeDetail", () => {
  it("should render an episode", () => {
    getPodcastInfo.mockImplementation(() => {
      podcastDetailMock;
    });
    getPodcasts.mockImplementation(() => {
      podcastListMock;
    });
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

describe("PodcastCard", () => {
  it("should render a podcast card", () => {
    render(
      <LoaderProvider>
        <PodcastCard podcast={podcastSelectedMock} />
      </LoaderProvider>
    );
    const podcastCard = screen.getByText(podcastSelectedMock.title);
    expect(podcastCard).toBeInTheDocument();
  });
});

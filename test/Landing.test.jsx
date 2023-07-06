import { render, screen, fireEvent } from "@testing-library/react";
import Landing from "../components/Landing";
import "@testing-library/jest-dom";
import { LoaderProvider } from "../contexts/LoadingContext";
import getPodcasts from "../api/getPodcasts";
import {
  podcastListMock,
  podcastListMockAfterFormated,
} from "./mocks/podcastsMock";
import useCache from "../hooks/useCache";

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
  beforeEach(() => {
    getPodcasts.mockClear();
    useCache.mockClear();
  });
  afterEach(() => {
    getPodcasts.mockRestore();
    useCache.mockRestore();
  });

  it("should match with snapshot", () => {
    useCache.mockImplementation(() => [Date.now() - 100]);
    useCache.mockImplementation(() => [podcastListMockAfterFormated]);

    const component = render(<LandingWithProvider />);
    expect(screen.getByText("Podcaster")).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });

  it("should render the list from localStorage", () => {
    const getPodcastMock = getPodcasts.mockImplementation(
      () => podcastListMock
    );
    useCache.mockImplementation(() => [Date.now() - 100]);
    useCache.mockImplementation(() => [
      podcastListMockAfterFormated,
      jest.fn(),
    ]);

    const component = render(<LandingWithProvider />);
    const podcastList = screen.getAllByRole("listitem");
    expect(screen.getByText("Podcaster")).toBeInTheDocument();
    expect(component.container).toHaveTextContent("Jhon Doe");
    expect(podcastList).toHaveLength(2);
    expect(getPodcastMock).not.toHaveBeenCalled();
  });

  it("should search a podcast from the input", () => {
    useCache.mockImplementation(() => [Date.now() - 100]);
    useCache.mockImplementation(() => [podcastListMockAfterFormated]);
    
    const userSearch = jest.fn();
    render(
      <LoaderProvider>
        <Landing userSearch={userSearch} />
      </LoaderProvider>
    );
    const input = screen.getByPlaceholderText("Filter podcast");
    const listCounter = screen.getByTestId("list-counter");
    expect(listCounter).toHaveTextContent(2);

    fireEvent.keyUp(input, { target: { value: "doe" } });

    expect(input.value).toBe("doe");
    expect(screen.getByText("Podcast Jhon Doe")).toBeInTheDocument();
    expect(screen.queryByText("The Mary Sister Podcast")).not.toBeInTheDocument();
    expect(listCounter).toHaveTextContent(1);
  });
});

import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import Landing from "../components/Landing";
import "@testing-library/jest-dom";
import { LoaderProvider } from "../contexts/LoadingContext";
import getPodcasts from "../api/getPodcasts";
import {
  podcastListMock,
  podcastListMockAfterFormated,
} from "./mocks/podcastsMock";
import useLocalStorage from "../hooks/useLocalStorage";


jest.mock("../hooks/useLocalStorage", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../api/getPodcasts", () => jest.fn());

const LandingWithProvider = (props) => (
  <LoaderProvider>
    <Landing />
  </LoaderProvider>
);

describe("Landing", () => {
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

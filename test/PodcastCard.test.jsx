import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoaderProvider } from "../contexts/LoadingContext";
import {
  podcastSelectedMock,
} from "./mocks/podcastsMock";
import PodcastCard from "../components/PodcastCard";

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
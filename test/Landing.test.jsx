import { render, screen } from "@testing-library/react";
import Landing from "../components/Landing";
import "@testing-library/jest-dom";
import { LoaderProvider } from "../contexts/LoadingContext";
import getPodcasts from "../api/getPodcasts";
import {podcastListMock, podcastListMockAfterFormated} from './mocks/podcastsMock'
import useLocalStorage from "../hooks/useLocalStorage";

const LandingWithProvider = () => (
  <LoaderProvider>
    <Landing />
  </LoaderProvider>
);

jest.mock("../api/getPodcasts", () => jest.fn());
// jest.mock("../hooks/useLocalStorage", ()=>([
//   {}, jest.fn(), jest.fn()
// ]
// )) 

describe("Landing", () => {
  it("should render", () => {
    const stub = jest.spyOn(useLocalStorage,'default')

    // useLocalStorage.mockReturnValueOnce([Date.now()-100])
    // useLocalStorage.mockReturnValueOnce([podcastListMockAfterFormated])

    render(<LandingWithProvider />);
    expect(stub).toHaveBeenCalled()
    // expect(screen.getByText("Podcaster")).toBeInTheDocument();
  });
});


    // useLocalStorage.mockReturnValueOnce({data:{
    //   date: Date.now()-100,
    //   podcastData: podcastListMockAfterLocal
    // }});

    // useLocalStorage.mockReturnValueOnce({
    //   get: jest.fn().mockResolvedValue({ date: jest.fn() })
    // });
    // // // // 

        // jest.spyOn(useLocalStorage, 'getItem').mockReturnValueOnce(Date.now()-100)
    // jest.spyOn(useLocalStorage, 'getItem').mockReturnValueOnce(podcastListMockAfterLocal)
    //    window.localStorage.getItem('date',JSON.stringify(Date.now()-100))
    //    window.localStorage.getItem('podcastData', JSON.stringify(podcastListMock))
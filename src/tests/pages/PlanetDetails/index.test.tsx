import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { act, cleanup, screen } from "@testing-library/react";

import * as PlanetsContext from "../../../contexts/PlanetsContext";
import PlanetDetails from "../../../pages/PlanetDetails";
import { GET_PLANET_BY_ID } from "../../../queries/PlanetByIdQuery";
import { customRender } from "../../testUtils/customRender";

const residentMocks: MockedResponse[] = [
  {
    request: {
      query: GET_PLANET_BY_ID,
      variables: {
        planetId: "1",
      },
    },
    result: {
      data: {
        planet: {
          residentConnection: {
            residents: [
              {
                id: "1",
                name: "Resident1Name",
                birthYear: "2024",
                gender: "n/a",
              },
            ],
          },
        },
      },
    },
  },
];

const errorResidentMock: MockedResponse = {
  request: {
    query: GET_PLANET_BY_ID,
    variables: {
      planetId: "1",
    },
  },
  error: new Error(),
};

const planetMocks = [
  {
    id: "1",
    name: "Tatooine",
    climates: ["climate"],
    terrains: ["terrain"],
  },
];

describe("Planet details", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show planet not found text if planets data is empty", () => {
    vi.spyOn(PlanetsContext, "usePlanets").mockImplementation(() => ({
      planets: [],
      allClimates: [],
      allTerrains: [],
      isLoading: true,
      error: undefined,
      fetchData: async () => undefined,
      planetsDispatch: async () => undefined,
    }));

    customRender(
      <MockedProvider mocks={residentMocks}>
        <PlanetDetails />
      </MockedProvider>,
    );

    expect(screen.getByText("Planet not found")).toBeTruthy();
  });

  describe("planet found", () => {
    beforeAll(() => {
      const usePlanetsSpy = vi.spyOn(PlanetsContext, "usePlanets");
      usePlanetsSpy.mockReturnValue({
        planets: planetMocks,
        allClimates: [],
        allTerrains: [],
        isLoading: false,
        error: undefined,
        fetchData: async () => undefined,
        planetsDispatch: async () => undefined,
      });

      vi.mock("react-router-dom", async (importOriginal) => {
        const mod = await importOriginal<typeof import("react-router-dom")>();
        return {
          ...mod,
          useParams: () => ({
            planetId: "1",
          }),
        };
      });
    });

    it("should show toast error if residents query fails", async () => {
      customRender(
        <MockedProvider mocks={[errorResidentMock]}>
          <PlanetDetails />
        </MockedProvider>,
      );

      expect(
        await screen.findByText("Error while retrieving planet residents data"),
      ).toBeTruthy();
    });

    it("should show planet details", () => {
      customRender(
        <MockedProvider mocks={residentMocks}>
          <PlanetDetails />
        </MockedProvider>,
      );

      expect(screen.getByText("Tatooine")).toBeTruthy();
      expect(screen.getByText("climate")).toBeTruthy();
      expect(screen.getByText("terrain")).toBeTruthy();
    });

    it("should show planet residents when loaded", async () => {
      customRender(
        <MockedProvider mocks={residentMocks} addTypename={false}>
          <PlanetDetails />
        </MockedProvider>,
      );

      expect(await screen.findByTestId("spinner")).toBeTruthy();
      expect(await screen.findByText("Resident1Name")).toBeTruthy();
    });

    it("should open edit modal if edit button clicked", () => {
      customRender(
        <MockedProvider mocks={residentMocks} addTypename={false}>
          <PlanetDetails />
        </MockedProvider>,
      );

      act(() => {
        screen.getByText("Edit").click();
      });

      expect(screen.getByText("Edit planet")).toBeTruthy();
    });

    it("should open delete modal if delete button clicked", () => {
      customRender(
        <MockedProvider mocks={residentMocks} addTypename={false}>
          <PlanetDetails />
        </MockedProvider>,
      );

      act(() => {
        screen.getByText("Delete").click();
      });

      expect(screen.getByText("Delete planet")).toBeTruthy();
    });
  });
});

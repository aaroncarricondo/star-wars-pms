import {
  stringArrayIncludesCaseInsensitive,
  stringArrayToList,
} from "../../utils/arrayUtils";

describe("Array utils", () => {
  it("String array to text list should return the array as text, separated by commas", () => {
    const text = stringArrayToList(["Alderaan", "Tatooine"]);

    expect(text).toBe("Alderaan, Tatooine");
  });

  describe("String array includes", () => {
    it("should return true", () => {
      expect(
        stringArrayIncludesCaseInsensitive(["Alderaan", "Tatooine"], "ooin"),
      ).toBe(true);
    });

    it("should return false", () => {
      expect(
        stringArrayIncludesCaseInsensitive(["Alderaan", "Tatooine"], "ooinn"),
      ).toBe(false);
    });
  });
});

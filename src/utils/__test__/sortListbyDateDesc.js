import { sortListbyDateDesc } from "../sortListbyDateDesc";

describe("Sort List By Date", () => {
  it("should sort no items", () => {
    const result = sortListbyDateDesc([]);

    expect(result).toStrictEqual([]);
  });

  it("should sort one item", () => {
    const result = sortListbyDateDesc([
      {
        date: "2021-03-11T10:40:13+00:00",
      },
    ]);

    expect(result).toStrictEqual([
      {
        date: "2021-03-11T10:40:13+00:00",
      },
    ]);
  });

  it("should sort three items", () => {
    const result = sortListbyDateDesc([
      {
        date: "2021-03-11T10:40:13+00:00",
      },
      {
        date: "2011-03-11T10:40:13+00:00",
      },
      {
        date: "2022-03-11T10:40:13+00:00",
      },
    ]);

    expect(result).toStrictEqual([
      {
        date: "2022-03-11T10:40:13+00:00",
      },
      {
        date: "2021-03-11T10:40:13+00:00",
      },
      {
        date: "2011-03-11T10:40:13+00:00",
      },
    ]);
  });
});

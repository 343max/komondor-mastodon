import { removedDuplicates } from "./removeDuplicates"

describe("removeDuplicates", () => {
  it("removed duplicates", () => {
    const before: { id: string; v: number }[] = [
      { id: "a", v: 1 },
      { id: "b", v: 2 },
      { id: "b", v: 3 },
      { id: "c", v: 4 },
    ]

    const after = removedDuplicates(before)
    expect(after).toStrictEqual([
      { id: "a", v: 1 },
      { id: "b", v: 2 },
      { id: "c", v: 4 },
    ])
  })
})

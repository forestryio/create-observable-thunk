import { ensureArray } from "./ensure-array"

describe("ensure-array", () => {
  it("should return an empty array if given null", () => {
    expect(ensureArray(null)).toEqual([])
  })

  it("should return the array it was given", () => {
    const values = []

    expect(ensureArray(values)).toBe(values)
  })

  it("should return an array containing a function", () => {
    const f = () => "example"

    expect(ensureArray(f)).toContain(f)
  })
})

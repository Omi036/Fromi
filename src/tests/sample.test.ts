import { hasFields } from "../lib/utils/fields"

describe("A Sample Test", () => {
    test("hasFields should return true with sample object", () => {
        const myObject = {name: "John", surname:"Pork"}
        const myObjectVerified = hasFields(myObject, ["name", "surname"])

        expect(myObjectVerified).toBe(true)
    })
})
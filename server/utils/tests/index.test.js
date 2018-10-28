const expect = require("expect");
const { generateMessage } = require("../message");

describe("utils", () => {
  it("generates message", () => {
    const result = generateMessage("user", "text used");
    expect(result).toMatch({
      from: "user",
      text: "text used"
    });
    expect(result.createdAt).toBeA("number");
  });
});

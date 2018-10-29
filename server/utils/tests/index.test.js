const expect = require("expect");
const {
  generateMessage,
  generateMessageFromGeolocation
} = require("../message");

describe("utils", () => {
  it("generates message", () => {
    const result = generateMessage("user", "text used");
    expect(result).toMatch({
      from: "user",
      text: "text used"
    });
    expect(result.createdAt).toBeA("number");
  });

  it("generates url with coordinates", () => {
    const result = generateMessageFromGeolocation("user", 12, 10);
    expect(result).toMatch({
      from: "user",
      lat: 12,
      long: 10,
      url: "https://www.google.com/maps/?q=12,10"
    });
    expect(result.createdAt).toBeA("number");
  });
});

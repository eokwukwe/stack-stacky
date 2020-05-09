import BcryptHelper from "../../src/helpers/BcryptHelper";

describe("BcryptHelper Test", () => {
  describe("Hash string test", () => {
    it("should return hashed equivalent of string passed", async () => {
      const result = await BcryptHelper.hash("abc123");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).not.toBe("abc123");
    });
  });

  describe("Verify hash test", () => {
    let hashed;
    it("should return true if plain string matches hash", async () => {
      hashed = await BcryptHelper.hash("abcde");
      const result = await BcryptHelper.verifyHash("abcde", hashed);
      expect(result).toBeDefined();
      expect(typeof result).toBe("boolean");
      expect(result).toBe(true);
    });

    it("should return false if plain string does not matche hash", async () => {
      const result = await BcryptHelper.verifyHash("abc12378", hashed);
      expect(result).toBeDefined();
      expect(typeof result).toBe("boolean");
      expect(result).toBe(false);
    });
  });
});

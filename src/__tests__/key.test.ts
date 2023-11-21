import { KeyHandler, IKeyExtended, Connection, ILedgerResponse } from "../index";

test("Create 12 worded Phrase", async () => {
  const name = "test";
  const keyHandler = new KeyHandler();
  const key: IKeyExtended = await keyHandler.generateBIP39Key(name);

  expect(key.name).toBe(name);
  expect(key.type).toBe("secp256k1");
  expect(key.key).not.toBeNull();
  expect(key.key).not.toBeUndefined();
  expect(key.phrase).not.toBeNull();
  expect(key.phrase).not.toBeUndefined();
  expect(key.phrase).toEqual(expect.any(String));
});

test("Restore 12 Worded Phrase", async () => {
  const name = "test";
  const phrase = "credit banana park frown retire clinic science rail loan opera bonus supreme";
  const keyHandler = new KeyHandler();
  const key: IKeyExtended = await keyHandler.restoreBIP39Key(name, phrase, true);

  expect(key.name).toBe(name);
  expect(key.type).toBe("secp256k1");
  expect(key.key).not.toBeNull();
  expect(key.key).not.toBeUndefined();
  //expect(key.key.pub.pkcs8pem).toBe("0x0436c0ffe09f341ba81acdfbd736ea6a3d3a6e497707cc18167b9032d2c6f7f258e9215498652d381b19bc5f6c3ed500ce8c368b9ff42420a473a3cc99652ca2be");
  expect(key.key.pub.pkcs8pem).toBe("0x0236c0ffe09f341ba81acdfbd736ea6a3d3a6e497707cc18167b9032d2c6f7f258");
  expect(key.key.prv.pkcs8pem).toBe("0xce23c70e5380f46ec633bebf8e910593de2495af1d91979b01992fe2a098fb58");
  expect(key.phrase).not.toBeNull();
  expect(key.phrase).not.toBeUndefined();
  expect(key.phrase).toEqual(expect.any(String));
});

test("Onboard Key Uncompressed", () => {
  const keyHandler = new KeyHandler();
  const connection = new Connection("http", "localhost", 5260);

  keyHandler.generateBIP39Key("test-onboard-uncompressed").then((key: IKeyExtended) => {
    keyHandler.onboardKey(key, connection).then((res: ILedgerResponse) => {
      expect(res.$streams.new).not.toBeUndefined();
    });
  });
});

test("Onboard Key Compressed", () => {
  const keyHandler = new KeyHandler();
  const connection = new Connection("http", "localhost", 5260);

  keyHandler.generateBIP39Key("test-onboard-compressed", true).then((key: IKeyExtended) => {
    keyHandler.onboardKey(key, connection).then((res: ILedgerResponse) => {
      expect(res.$streams.new).not.toBeUndefined();
    });
  });
});

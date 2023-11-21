import { KeyHandler as KH, IKey, KeyType } from "@activeledger/sdk";
import { generateMnemonic } from "bip39";
import * as crypto from "crypto";

/**
 * Extends SDK IKey to include phrase words
 *
 * @export
 * @interface IKeyExtended
 * @extends {IKey}
 */
export interface IKeyExtended extends IKey {
  phrase?: string;
}

/**
 * Extends SDK KeyHandler for compatibility and adds BIP39 features
 *
 * @export
 * @class KeyHandler
 * @extends {KH}
 */
export class KeyHandler extends KH {
  /**
   * Generate new Key Pair with BIP39 wordlist
   *
   * @param {string} keyName
   * @param {boolean} [compressed]
   * @returns {Promise<IKeyExtended>}
   * @memberof KeyHandler
   */
  public generateBIP39Key(keyName: string, compressed?: boolean): Promise<IKeyExtended> {
    return new Promise((resolve, reject) => {
      try {
        const phrase = generateMnemonic();
        const curve: crypto.ECDH = crypto.createECDH("secp256k1");
        curve.setPrivateKey(crypto.createHash("sha256").update(phrase, "utf8").digest());

        const keyHolder: IKeyExtended = {
          key: {
            pub: {
              pkcs8pem:
                "0x" + (compressed ? curve.getPublicKey("hex", "compressed") : curve.getPublicKey("hex", "uncompressed")),
            },
            prv: {
              pkcs8pem: "0x" + curve.getPrivateKey().toString("hex"),
            },
          },
          name: keyName,
          type: KeyType.EllipticCurve,
          phrase,
        };

        return resolve(keyHolder);
      } catch (error) {
        return reject(error);
      }
    });
  }

  /**
   * Generate Key Pair from BIP39 wordlist
   *
   * @param {string} keyName
   * @param {string} phrase
   * @param {boolean} [compressed]
   * @returns {Promise<IKeyExtended>}
   * @memberof KeyHandler
   */
  public restoreBIP39Key(keyName: string, phrase: string, compressed?: boolean): Promise<IKeyExtended> {
    return new Promise((resolve, reject) => {
      try {
        const curve: crypto.ECDH = crypto.createECDH("secp256k1");
        curve.setPrivateKey(crypto.createHash("sha256").update(phrase, "utf8").digest());

        const keyHolder: IKeyExtended = {
          key: {
            pub: {
              pkcs8pem:
                "0x" + (compressed ? curve.getPublicKey("hex", "compressed") : curve.getPublicKey("hex", "uncompressed")),
            },
            prv: {
              pkcs8pem: "0x" + curve.getPrivateKey().toString("hex"),
            },
          },
          name: keyName,
          type: KeyType.EllipticCurve,
          phrase,
        };
        return resolve(keyHolder);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

<img src="https://github.com/activeledger/activeledger/blob/master/docs/assets/Asset-23.png" alt="Activeledger" width="500"/>

# Activeledger - Node SDK with BIP39 Support

Extends the default NodeJS SDK with added support for generating key pairs with a BIP39 wordlist and restoring Key pair from a BIP39 wordlist

### GitHub

[Repository here](https://github.com/activeledger/SDK-NodeJS-BIP39)

### Further Documentation

[Documentation here](https://activeledger.github.io/SDK-NodeJS/)

## Installation

```
$ npm i -s @activeledger/sdk-bip39
```

### KeyHandler

KeyHandler has been extended so Elliptic curve keys can follow BIP39. Both compressed and uncompressed formats have been supported

#### Generating a key

When generating a key you must pass it a name.

##### Example

Note: This example uses the IKeyExtended interface which provides the structure of the key

```typescript
import { KeyHandler, IKeyExtended } from "@activeledger/sdk-bip39";

const keyHandler = new KeyHandler();

let key: IKeyExtended;

// Generate RSA Key
keyHandler
  .generateBIP39Key("keyname", true)
  .then((generatedKey: IKey) => {
    key = generatedKey;
  })
  .catch();
// or to generate an uncompressed key
// keyHandler.generateBIP39Key("keyname", false)
```

### Activeledger

[Visit Activeledger.io](https://activeledger.io/)

[Read Activeledgers documentation](https://github.com/activeledger/activeledger)

## License

This project is licensed under the [MIT](https://github.com/activeledger/activeledger/blob/master/LICENSE) License
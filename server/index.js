const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp256k1 =  require('@noble/curves/secp256k1');

app.use(cors());
app.use(express.json());

const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
};

let privateKeys = {};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;

  let pk = privateKeys[address];

  if (!pk) {
    const priv = secp256k1.secp256k1.utils.randomPrivateKey();
    pk = { address, priv: priv.toString() };
    privateKeys[address] = pk;
  }

  res.send({ balance, privateKey: pk.priv });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, privateKey } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const arr = privateKey.split(",").map(privateKey => parseInt(privateKey));
  const private = new Uint8Array(arr);

  if (privateKeys[sender].priv !== privateKey) {
    res.status(400).send({ message: "Error. Private key does not match sender!" });
    return;
  }
  
  if (sender) {

    const msg = new Uint8Array(32).fill(1);
  
    const sig = secp256k1.secp256k1.sign(msg, private);

    const publicKey = secp256k1.secp256k1.getPublicKey(private);
  
    const isValid = secp256k1.secp256k1.verify(sig, msg, publicKey) === true;
  
    if (isValid && balances[sender] >= amount) {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    } else {
      res.status(400).send({ message: "Error. Transaction failed!" });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

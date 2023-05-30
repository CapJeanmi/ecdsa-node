import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, setPrivateKey, privateKey }) {

  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance, privateKey },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
      setPrivateKey(privateKey);
    } else {
      setBalance(0);
      setPrivateKey("");
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <label>
        Your Private Key
        <input placeholder="Here you can view your Private Key" value={privateKey} onChange={onChange} disabled></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

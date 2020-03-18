import React, { Component } from "react";
import EstateContract from "./contracts/EstateContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class EstateContractJ extends Component {
  state = { estateList: [], index:0, web3: null, accounts: null, contract: null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EstateContract.networks[networkId];
      const instance = new web3.eth.Contract(
        EstateContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.run);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  run = async () => {
    const { accounts, contract} = this.state;

    // Stores a given value, 5 by default.
    var index = await contract.methods.getIndex().call();
    var eList = [];
      for(var i = 0;i < index;i++){
          var ele = await contract.methods.getEstate(i).call();
          eList[i] = ele;
      }

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ estateList: eList ,index});
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="ES">
        <h1>Test</h1>
        <div id="list">
            <h2>EstateList {this.state.index}</h2>
            <ul>
            {
                this.state.estateList.map((estate,i) => {
                    return <li key={i}> EstateID: {estate.estateId}, Create Date: {estate.beginDate}, Owner: {estate.owner}</li>
                })
            }
            </ul>
        </div>
        <div id="create">
          <form>
            <input type="text" id="createEstate" size="20" placeholder="pcno,scno..."></input>
            <input type="text" id="createDate" size="20" placeholder="2020xxxx..."></input>
            <input type="text" id="createOwner" size="20" placeholder="yuan-circle"></input>
            <button onClick={async ()=> {
                const esName = document.getElementById("createEstate").value;
                const esdate = document.getElementById("createDate").value;
                const esOwner = document.getElementById("createOwner").value;
                if(esName == "" || esdate == "" || esOwner == ""){
                    alert("should give the name and date");
                }
                else{
                    var { accounts, contract,index,estateList} = this.state;
                    await contract.methods.createEstate(esName,esdate,esOwner).send({from: accounts[0]});
                    index += 1;
                    var ele = {estateId:esName,beginDate:esdate,endDate:esdate,owner:esOwner};
                    estateList[index] = ele;
                    this.setState({estateList,index});
                }
            }}>Create Estate</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EstateContractJ;

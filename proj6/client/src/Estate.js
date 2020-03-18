import React,{ Component } from "react";
import EstateContract from "./contracts/Estate.json";
import getWeb3 from "./getWeb3";

class Estate extends Component {
    state = {name:null,date:null,owner:null,web3:null,accounts:null,contract:null};
    componentDidMount = async() =>{
        try{
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
            this.setState({web3, accounts, contract: instance}, this.run);
        }catch (error){
            alert(
                `Failed to load`
            );
            console.error(error);
        }
    };

    run = async () => {
        const {accounts,contract} = this.state;
        const setname = "ninaLand";
        const setdate = "20200315";
        const setowner = "nina";
        await contract.methods.set(setname,setdate,setowner).send({from: accounts[0]});
        const name = await contract.methods.getName().call();
        const date = await contract.methods.getDate().call();
        const owner = await contract.methods.getOwner().call();
        this.setState({name,date,owner});
    };
    render(){
        return(
            <div className="EstateTest">
                <h1>First test</h1>
                <div>name: {this.state.name}</div>
                <div>date: {this.state.date}</div>
                <div>owner: {this.state.owner}</div>
            </div>
        );
    }
}

export default Estate;

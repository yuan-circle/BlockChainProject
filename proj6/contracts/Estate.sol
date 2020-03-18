pragma solidity >=0.4.21 < 0.7.0;

contract Estate{
    string name;
    string date;
    string owner;
    constructor() public {
        name = "Estate 1";
        date = "20200314";
        owner = "Circle";
    }
    function set (string memory n,string memory d,string memory o) public {
        name = n;
        date = d;
        owner = o;
    }
    function getName() public view returns(string memory){
        return name;
    }
    function getDate() public view returns(string memory){
        return date;
    }
    function getOwner() public view returns(string memory){
        return owner;
    }
}

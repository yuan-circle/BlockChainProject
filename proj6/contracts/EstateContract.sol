pragma solidity >=0.4.21 < 0.7.0;
pragma experimental ABIEncoderV2;

contract EstateContract{
    event test(string _t);
    struct Estate{
        string estateId;
        string beginDate;
        string endDate;
        string owner;
    }
    uint index;
    mapping(uint => Estate) public estateList;

    constructor() public {
        index = 0;
    }
    function createEstate(string memory esName,string memory esDate,string memory esOwner) public {
        estateList[index] = Estate(esName,esDate,esDate,esOwner);
        index = index + 1;
        emit test("createEstate");
    }
    function getEstate(uint indexI) public view returns(Estate memory){
        return estateList[indexI];
    }
    function getIndex() public view returns(uint){
        return index;
    }
}

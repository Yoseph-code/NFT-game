// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YogiToken is ERC721, Ownable {
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    uint256 COUNTER;
    uint256 fee = 0.01 ether;

    struct Yogi {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }

    Yogi[] public yogis;

    event NewYogi(address indexed owner, uint256 id, uint256 dna);

    function _createRandomNum(uint256 _mod) internal view returns (uint256) {
        uint256 randomNum = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );

        return randomNum % _mod;
    }

    function updateFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function _createYogi(string memory _name) internal {
        uint8 randRarity = uint8(_createRandomNum(100));
        uint256 randDna = _createRandomNum(10**16);
        Yogi memory newYogi = Yogi(_name, COUNTER, randDna, 1, randRarity);
        yogis.push(newYogi);
        _safeMint(msg.sender, COUNTER);
        emit NewYogi(msg.sender, COUNTER, randDna);
        COUNTER++;
    }

    function createRandonYogi(string memory _name) public payable {
        require(msg.value <= fee, "Dont have enougth Ether");
        _createYogi(_name);
    }

    function getYogis() public view returns (Yogi[] memory) {
        return yogis;
    }

    function getOwnerYogis(address _owner) public view returns (Yogi[] memory) {
        Yogi[] memory result = new Yogi[](balanceOf(_owner));
        uint256 counter = 0;
        for (uint256 i = 0; i < yogis.length; i++) {
            if (ownerOf(i) == _owner) {
                result[counter] = yogis[i];
                counter++;
            }
        }
        return result;
    }

    // Acctions
    function levelUp(uint256 _yogiId) public {
        require(ownerOf(_yogiId) == msg.sender, "Error in levelUp");
        Yogi storage yogi = yogis[_yogiId];
        yogi.level++;
    }
}

// contract/CryptoBeetles.sol
// SPDX-License-Identifier: UNDEFINER
pragma solidity 0.8.17; 

mport "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameItem is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory _name,string memory _symbol) ERC721(_name, _symbol) {}

    function awardItem(string memory tokenURI)
        public  
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

}

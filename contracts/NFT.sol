// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721Enumerable, ERC721URIStorage {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;

  constructor() ERC721("NFT", "NFT") {}

  function giveAway(address to) public returns (uint256) {
    uint tokenId = _tokenIds.current();

    string memory mockTokenURI = "https://arweave.net/qT6xZnHd2UHeNH7KhrCz_g1VpHWoLsHRCySd_DAy8EE";

    _safeMint(to, tokenId);
    _setTokenURI(tokenId, mockTokenURI);

    _tokenIds.increment();

    console.log("Token ID: %s", tokenId, to);

    return tokenId;
  }
  
  function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal virtual override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, ERC721URIStorage) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

}

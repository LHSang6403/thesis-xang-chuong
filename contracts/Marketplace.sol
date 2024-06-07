// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// ReentrancyGuard
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
  using Counters for Counters.Counter;
  uint256 public listingPrice;

  constructor(uint256 _listingPrice) {
    listingPrice = _listingPrice;
  }

  struct Item { 
    address nftContract;
    uint256 tokenId;
    uint256 price;
    address payable seller;
    bool sold;
  }

  Item[] public items;
  Counters.Counter private _itemIds;

  function listNft(address _nftAddress, uint256 _tokenId, uint256 _price) public payable nonReentrant returns (uint256) {
    require(_price > 0, "Price must be at least 1 wei");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    IERC721(_nftAddress).transferFrom(msg.sender, address(this), _tokenId);

    items.push(Item(_nftAddress, _tokenId, _price, payable(msg.sender), false));

    return itemId;
  }

  function delistNft(uint256 _itemId) public {
    Item storage item = items[_itemId];
    require(msg.sender == item.seller, "You are not the seller");
    require(item.sold == false, "Item is already sold");

    IERC721(item.nftContract).transferFrom(address(this), msg.sender, item.tokenId);

    delete items[_itemId];
  }

  function changePrice(uint256 _itemId, uint256 _price) public {
    Item storage item = items[_itemId];
    require(msg.sender == item.seller, "You are not the seller");
    require(item.sold == false, "Item is already sold");

    item.price = _price;
  }

  function nftPrice(uint256 _itemId) public view returns (uint256) {
    return items[_itemId].price;
  }

  function buyNft(uint256 _itemId) public payable nonReentrant {
    Item storage item = items[_itemId];
    require(item.sold == false, "Item is already sold");
    require(msg.value == item.price, "Price must be equal to listing price");

    item.sold = true;
    IERC721(item.nftContract).transferFrom(address(this), msg.sender, item.tokenId);

    payable(item.seller).transfer(msg.value);
  }

  function isSold(uint256 _itemId) public view returns (bool) {
    return items[_itemId].sold;
  }
}
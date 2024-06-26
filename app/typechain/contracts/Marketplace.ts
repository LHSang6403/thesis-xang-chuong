/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface MarketplaceInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "buyNft"
      | "changePrice"
      | "delistNft"
      | "isSold"
      | "items"
      | "listNft"
      | "listingPrice"
      | "nftPrice"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "buyNft",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changePrice",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "delistNft",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isSold",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "items", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "listNft",
    values: [AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "listingPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nftPrice",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "buyNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "delistNft", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isSold", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "items", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "listNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "listingPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nftPrice", data: BytesLike): Result;
}

export interface Marketplace extends BaseContract {
  connect(runner?: ContractRunner | null): Marketplace;
  waitForDeployment(): Promise<this>;

  interface: MarketplaceInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  buyNft: TypedContractMethod<[_itemId: BigNumberish], [void], "payable">;

  changePrice: TypedContractMethod<
    [_itemId: BigNumberish, _price: BigNumberish],
    [void],
    "nonpayable"
  >;

  delistNft: TypedContractMethod<[_itemId: BigNumberish], [void], "nonpayable">;

  isSold: TypedContractMethod<[_itemId: BigNumberish], [boolean], "view">;

  items: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, string, boolean] & {
        nftContract: string;
        tokenId: bigint;
        price: bigint;
        seller: string;
        sold: boolean;
      }
    ],
    "view"
  >;

  listNft: TypedContractMethod<
    [_nftAddress: AddressLike, _tokenId: BigNumberish, _price: BigNumberish],
    [bigint],
    "payable"
  >;

  listingPrice: TypedContractMethod<[], [bigint], "view">;

  nftPrice: TypedContractMethod<[_itemId: BigNumberish], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "buyNft"
  ): TypedContractMethod<[_itemId: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "changePrice"
  ): TypedContractMethod<
    [_itemId: BigNumberish, _price: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "delistNft"
  ): TypedContractMethod<[_itemId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "isSold"
  ): TypedContractMethod<[_itemId: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "items"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, string, boolean] & {
        nftContract: string;
        tokenId: bigint;
        price: bigint;
        seller: string;
        sold: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "listNft"
  ): TypedContractMethod<
    [_nftAddress: AddressLike, _tokenId: BigNumberish, _price: BigNumberish],
    [bigint],
    "payable"
  >;
  getFunction(
    nameOrSignature: "listingPrice"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "nftPrice"
  ): TypedContractMethod<[_itemId: BigNumberish], [bigint], "view">;

  filters: {};
}

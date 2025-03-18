"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getAllValidListings } from "thirdweb/extensions/marketplace";
import { useActiveAccount } from "thirdweb/react";
import { defineChain, getContract } from "thirdweb";
import { client } from "@/app/client";

import { arbitrumSepolia } from "thirdweb/chains";
import { MARKETPLACE_CONTRACT_ADDRESS } from "@/constants/addresses";
type Listing = {
  id: string;
  assetContractAddress: string;
  tokenId: string;
  quantity: string;
  currencyValuePerToken: {
    displayValue: string;
    symbol: string;
  };
  asset: {
    metadata: {
      name: string;
      description: string;
      image: string;
      attributes: {
        trait_type: string;
        value: string;
      }[];
    };
    supply: string;
    id: string;
  };
};

export default function NFTGrid() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // State to track which NFTs are liked by the user
  const [likedNfts, setLikedNfts] = useState<string[]>([]);

  const chain = defineChain(arbitrumSepolia);

  const market = getContract({
    address: MARKETPLACE_CONTRACT_ADDRESS,
    chain,
    client,
  });

  const formatIpfsUrl = (url: string) => {
    if (!url || !url.startsWith("ipfs://")) return "/placeholder.svg";
    return url.replace(
      "ipfs://",
      "https://d877020b8b0fc8b22cc94da95dfb1ef7.ipfscdn.io/ipfs/"
    );
  };

  useEffect(() => {
    const fetchValidListings = async () => {
      setIsLoading(true);
      try {
        const lists = await getAllValidListings({
          contract: market,
          start: 0,
          count: BigInt(15),
        });
        setListings(lists as unknown as Listing[]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchValidListings();
  }, []);

  // Function to handle liking an NFT
  const handleLike = (id: string) => {
    // Update liked NFTs list
    if (likedNfts.includes(id)) {
      // If already liked, unlike it
      setLikedNfts(likedNfts.filter((nftId) => nftId !== id));
    } else {
      // If not liked, like it
      setLikedNfts([...likedNfts, id]);
    }
  };

  // Function to get attribute value by trait type
  const getAttributeValue = (attributes: any[], traitType: string) => {
    const attribute = attributes.find((attr) => attr.trait_type === traitType);
    return attribute ? attribute.value : "N/A";
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading NFTs...</div>;
  }

  if (listings.length === 0) {
    return <div className="text-center py-10">No NFTs found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => {
        const power = getAttributeValue(
          listing.asset.metadata.attributes,
          "power"
        );
        const ability = getAttributeValue(
          listing.asset.metadata.attributes,
          "ability"
        );
        const level = getAttributeValue(
          listing.asset.metadata.attributes,
          "level"
        );
        const type = getAttributeValue(
          listing.asset.metadata.attributes,
          "type"
        );

        return (
          <Card
            key={listing.id}
            className="pixel-card bg-zinc-800 border-purple-500 overflow-hidden"
          >
            <Link href={`/nft/${listing.id}`}>
              <div className="relative aspect-square">
                <img
                  src={formatIpfsUrl(listing.asset.metadata.image)}
                  alt={listing.asset.metadata.name}
                  className="w-full h-full object-cover pixel-image"
                />
                <div className="absolute top-2 right-2 bg-zinc-900/70 px-2 py-1 rounded pixel-tag">
                  <span className="text-xs text-green-400">{type}</span>
                </div>
                <div className="absolute bottom-2 left-2 bg-zinc-900/70 px-2 py-1 rounded pixel-tag">
                  <span className="text-xs text-purple-400">
                    {listing.asset.supply === "1"
                      ? "Unique"
                      : `Supply: ${listing.asset.supply}`}
                  </span>
                </div>
              </div>
            </Link>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white">
                  {listing.asset.metadata.name}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    likedNfts.includes(listing.id)
                      ? "text-red-500 hover:text-red-400"
                      : "text-purple-400 hover:text-purple-300"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handleLike(listing.id);
                  }}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      likedNfts.includes(listing.id) ? "fill-red-500" : ""
                    }`}
                  />
                  <span className="sr-only">Like</span>
                </Button>
              </div>

              {/* Item attributes */}
              <div className="grid grid-cols-3 gap-1 mb-3 text-center">
                <div className="bg-zinc-900 rounded p-1">
                  <p className="text-xs text-zinc-500">Power</p>
                  <p className="text-sm text-green-400">{power}</p>
                </div>
                <div className="bg-zinc-900 rounded p-1">
                  <p className="text-xs text-zinc-500">Ability</p>
                  <p className="text-sm text-purple-400">{ability}</p>
                </div>
                <div className="bg-zinc-900 rounded p-1">
                  <p className="text-xs text-zinc-500">Level</p>
                  <p className="text-sm text-green-400">{level}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-zinc-500">Current price</p>
                  <p className="text-lg font-bold text-green-400">
                    {listing.currencyValuePerToken.displayValue}{" "}
                    {listing.currencyValuePerToken.symbol}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">ID</p>
                  <p className="text-sm text-purple-400">#{listing.asset.id}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button
                className="w-full pixel-button bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  console.log("Buy NFT:", listing.id);
                }}
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

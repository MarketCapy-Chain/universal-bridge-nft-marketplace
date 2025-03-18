import Link from "next/link"
import { Heart } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Sample NFT data - expanded with more items for each category
const nfts = [
  {
    id: 1,
    name: "Flaming Sword",
    type: "swords",
    price: 0.25,
    image: "/placeholder.svg?height=400&width=400",
    likes: 42,
    supply: 1,
    attributes: {
      power: 85,
      ability: "Ignite",
      level: 20,
    },
  },
  {
    id: 2,
    name: "Arcane Staff",
    type: "staffs",
    price: 0.35,
    image: "/placeholder.svg?height=400&width=400",
    likes: 38,
    supply: 3,
    attributes: {
      power: 65,
      ability: "Teleport",
      level: 25,
    },
  },
  {
    id: 3,
    name: "Health Potion",
    type: "potions",
    price: 0.15,
    image: "/placeholder.svg?height=400&width=400",
    likes: 24,
    supply: 10,
    attributes: {
      power: 50,
      ability: "Regenerate",
      level: 5,
    },
  },
  {
    id: 4,
    name: "Frost Blade",
    type: "swords",
    price: 0.28,
    image: "/placeholder.svg?height=400&width=400",
    likes: 31,
    supply: 5,
    attributes: {
      power: 75,
      ability: "Freeze",
      level: 18,
    },
  },
  {
    id: 5,
    name: "Lightning Staff",
    type: "staffs",
    price: 0.4,
    image: "/placeholder.svg?height=400&width=400",
    likes: 45,
    supply: 2,
    attributes: {
      power: 90,
      ability: "Shock",
      level: 30,
    },
  },
  {
    id: 6,
    name: "Invisibility Potion",
    type: "potions",
    price: 0.18,
    image: "/placeholder.svg?height=400&width=400",
    likes: 29,
    supply: 8,
    attributes: {
      power: 40,
      ability: "Vanish",
      level: 12,
    },
  },
  {
    id: 7,
    name: "Dragon Slayer",
    type: "swords",
    price: 0.55,
    image: "/placeholder.svg?height=400&width=400",
    likes: 67,
    supply: 1,
    attributes: {
      power: 95,
      ability: "Slay",
      level: 35,
    },
  },
  {
    id: 8,
    name: "Nature Staff",
    type: "staffs",
    price: 0.32,
    image: "/placeholder.svg?height=400&width=400",
    likes: 41,
    supply: 4,
    attributes: {
      power: 70,
      ability: "Grow",
      level: 22,
    },
  },
  {
    id: 9,
    name: "Strength Potion",
    type: "potions",
    price: 0.12,
    image: "/placeholder.svg?height=400&width=400",
    likes: 19,
    supply: 15,
    attributes: {
      power: 45,
      ability: "Empower",
      level: 8,
    },
  },
]

export default function CategoryNFTGrid({ category }: { category: string }) {
  // Filter NFTs based on category, or show all if category is "all"
  const filteredNFTs = category === "all" ? nfts : nfts.filter((nft) => nft.type === category)

  return (
    <div>
      {filteredNFTs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl text-purple-400 mb-4">No items found in this category</h3>
          <p className="text-zinc-400">Check back later or explore other categories</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNFTs.map((nft) => (
            <Card key={nft.id} className="pixel-card bg-zinc-800 border-purple-500 overflow-hidden">
              <Link href={`/nft/${nft.id}`}>
                <div className="relative aspect-square">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full h-full object-cover pixel-image"
                  />
                  <div className="absolute top-2 right-2 bg-zinc-900/70 px-2 py-1 rounded pixel-tag">
                    <span className="text-xs text-green-400">{nft.type}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-zinc-900/70 px-2 py-1 rounded pixel-tag">
                    <span className="text-xs text-purple-400">
                      {nft.supply === 1 ? "Unique" : `Supply: ${nft.supply}`}
                    </span>
                  </div>
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-white">{nft.name}</h3>
                  <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-300">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Like</span>
                  </Button>
                </div>

                {/* Item attributes */}
                <div className="grid grid-cols-3 gap-1 mb-3 text-center">
                  <div className="bg-zinc-900 rounded p-1">
                    <p className="text-xs text-zinc-500">Power</p>
                    <p className="text-sm text-green-400">{nft.attributes.power}</p>
                  </div>
                  <div className="bg-zinc-900 rounded p-1">
                    <p className="text-xs text-zinc-500">Ability</p>
                    <p className="text-sm text-purple-400">{nft.attributes.ability}</p>
                  </div>
                  <div className="bg-zinc-900 rounded p-1">
                    <p className="text-xs text-zinc-500">Level</p>
                    <p className="text-sm text-green-400">{nft.attributes.level}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-zinc-500">Current price</p>
                    <p className="text-lg font-bold text-green-400">{nft.price} ETH</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500">Likes</p>
                    <p className="text-sm text-purple-400">{nft.likes}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button className="w-full pixel-button bg-purple-600 hover:bg-purple-700">Buy Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


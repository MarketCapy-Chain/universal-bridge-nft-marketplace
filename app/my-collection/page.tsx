import Link from "next/link"
import { ArrowLeft, Grid, ListFilter } from "lucide-react"

import PixelHeader from "@/components/pixel-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample user collection data
const userCollection = [
  {
    id: 1,
    name: "Flaming Sword",
    type: "swords",
    price: 0.25,
    image: "/placeholder.svg?height=400&width=400",
    purchaseDate: "2025-01-15",
    rarity: "Epic",
  },
  {
    id: 5,
    name: "Lightning Staff",
    type: "staffs",
    price: 0.4,
    image: "/placeholder.svg?height=400&width=400",
    purchaseDate: "2025-02-03",
    rarity: "Rare",
  },
  {
    id: 3,
    name: "Health Potion",
    type: "potions",
    price: 0.15,
    image: "/placeholder.svg?height=400&width=400",
    purchaseDate: "2025-02-10",
    rarity: "Common",
  },
]

export default function MyCollectionPage() {
  return (
    <div className="pixel-container min-h-screen bg-zinc-900 text-white">
      <PixelHeader />

      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="pixel-border p-6 mb-8 bg-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="pixel-text text-3xl font-bold text-green-400 mb-2">My Collection</h1>
              <p className="text-zinc-300">Your personal NFT collection of magical items and artifacts</p>
            </div>
            <div className="flex gap-2">
              <Button className="pixel-button bg-purple-600 hover:bg-purple-700">
                <ListFilter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button className="pixel-button bg-green-600 hover:bg-green-700">
                <Grid className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          <Tabs defaultValue="collected" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger
                value="collected"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Collected
              </TabsTrigger>
              <TabsTrigger value="created" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Created
              </TabsTrigger>
              <TabsTrigger
                value="favorited"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Favorited
              </TabsTrigger>
            </TabsList>

            <TabsContent value="collected">
              {userCollection.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl text-purple-400 mb-4">No items in your collection yet</h3>
                  <p className="text-zinc-400 mb-6">Start collecting magical items from the marketplace</p>
                  <Button className="pixel-button bg-purple-600 hover:bg-purple-700">
                    <Link href="/category/all">Browse Marketplace</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userCollection.map((item) => (
                    <Card key={item.id} className="pixel-card bg-zinc-800 border-purple-500 overflow-hidden">
                      <Link href={`/nft/${item.id}`}>
                        <div className="relative aspect-square">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover pixel-image"
                          />
                          <div className="absolute top-2 right-2 bg-zinc-900/70 px-2 py-1 rounded pixel-tag">
                            <span className="text-xs text-green-400">{item.type}</span>
                          </div>
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <h3 className="font-bold text-lg text-white">{item.name}</h3>
                          <p className="text-sm text-zinc-400">Purchased on {item.purchaseDate}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-zinc-500">Value</p>
                            <p className="text-lg font-bold text-green-400">{item.price} ETH</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-zinc-500">Rarity</p>
                            <p className="text-sm text-purple-400">{item.rarity}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex gap-2">
                        <Button className="w-full pixel-button bg-purple-600 hover:bg-purple-700">Transfer</Button>
                        <Button className="w-full pixel-button bg-green-600 hover:bg-green-700">List for Sale</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="created">
              <div className="text-center py-12">
                <h3 className="text-xl text-purple-400 mb-4">You haven't created any NFTs yet</h3>
                <p className="text-zinc-400 mb-6">Start creating your own magical items</p>
                <Button className="pixel-button bg-purple-600 hover:bg-purple-700">Create NFT</Button>
              </div>
            </TabsContent>

            <TabsContent value="favorited">
              <div className="text-center py-12">
                <h3 className="text-xl text-purple-400 mb-4">No favorited items yet</h3>
                <p className="text-zinc-400 mb-6">Browse the marketplace and favorite items you like</p>
                <Button className="pixel-button bg-purple-600 hover:bg-purple-700">
                  <Link href="/category/all">Browse Marketplace</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="pixel-border-top bg-zinc-800 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-300 mb-2">© 2025 Pixel Realm NFT Marketplace</p>
          <div className="flex justify-center gap-4">
            <Link href="/about" className="text-green-400 hover:text-green-300">
              About
            </Link>
            <Link href="/faq" className="text-green-400 hover:text-green-300">
              FAQ
            </Link>
            <Link href="/terms" className="text-green-400 hover:text-green-300">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface User {
  id: string
  name: string
  email: string
}

interface Property {
  id: string
  name: string
  location: string
  price: string
}

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [loadingIds, setLoadingIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_DASHBOARD_SERVICE}/home`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setUser(data.user)
      setFavorites(data.favourites || [])
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      fetchData()
    }
  }, [router])

  const properties: Property[] = [
    { id: "p1", name: "2BHK Apartment", location: "Kathmandu", price: "$80,000" },
    { id: "p2", name: "Luxury Villa", location: "Pokhara", price: "$250,000" },
    { id: "p3", name: "Studio Flat", location: "Lalitpur", price: "$40,000" },
    { id: "p4", name: "Family House", location: "Bhaktapur", price: "$120,000" },
    { id: "p5", name: "Modern Apartment", location: "Chitwan", price: "$70,000" },
    { id: "p6", name: "Budget Room", location: "Biratnagar", price: "$20,000" },
    { id: "p7", name: "Penthouse", location: "Kathmandu", price: "$300,000" },
    { id: "p8", name: "Lakeview House", location: "Pokhara", price: "$200,000" }
  ]

  const toggleFavorite = async (propertyId: string) => {
    const token = localStorage.getItem("token")
    if (!token) return

    const isFav = favorites.includes(propertyId)
    setLoadingIds(prev => [...prev, propertyId])

    try {
      if (isFav) {
        await axios.delete(`${process.env.NEXT_PUBLIC_FAVORITE_SERVICE}/remove/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setFavorites(prev => prev.filter(id => id !== propertyId))
        toast.success("Removed from favourites")
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_FAVORITE_SERVICE}/add`,
          { id: propertyId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setFavorites(prev => [...prev, propertyId])
        toast.success("Added to favourites")
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong")
    } finally {
      setLoadingIds(prev => prev.filter(id => id !== propertyId))
    }
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* user info */}
      user &&
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      {/* properties */}
      <h2 className="text-xl font-semibold mb-4">Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(p => (
          <div
            key={p.id}
            className="p-4 border rounded-lg flex justify-between items-center shadow-sm"
          >
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-gray-500">{p.location}</p>
              <p className="text-gray-700 font-medium">{p.price}</p>
            </div>
            <button
              disabled={loadingIds.includes(p.id)}
              onClick={() => toggleFavorite(p.id)}
              className={`text-2xl transition ${favorites.includes(p.id)
                ? "text-red-500"
                : "text-gray-400 hover:text-red-500"
                }`}
            >
              Like
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, AlertTriangle, X } from "lucide-react"

const contacts = [
  {
    id: 1,
    name: "James's wallet",
    role: "Ethereum",
    address: "0xC524b945DD820f70333f4696102D10bC12629C",
    avatar: { bg: "bg-red-500", pattern: "dots" },
  },
  {
    id: 2,
    name: "James's wallet",
    role: "Ethereum",
    address: "0xC524b945DD820f70333f4696102D10bC12629C",
    avatar: { bg: "bg-blue-500", pattern: "grid" },
  },
  {
    id: 3,
    name: "James's wallet",
    role: "Ethereum",
    address: "0xC524b945DD820f70333f4696102D10bC12629C",
    avatar: { bg: "bg-green-500", pattern: "circles" },
  },
  {
    id: 4,
    name: "James's wallet",
    role: "Ethereum",
    address: "0xC524b945DD820f70333f4696102D10bC12629C",
    avatar: { bg: "bg-purple-500", pattern: "squares" },
  },
  {
    id: 5,
    name: "James's wallet",
    role: "Ethereum",
    address: "0xC524b945DD820f70333f4696102D10bC12629C",
    avatar: { bg: "bg-indigo-500", pattern: "triangles" },
  },
  {
    id: 6,
    name: "James's wallet",
    role: "Ethereum",
    address: "0xC524b945DD820f70333f4696102D10bC12629C",
    avatar: { bg: "bg-pink-500", pattern: "hexagons" },
  },
  {
    id: 7,
    name: "James's wallet",
    role: "Ethereum",
    address: "0xC524b945DD820f70333f4696102D10bC12629C",
    avatar: { bg: "bg-gray-500", pattern: "waves" },
  },
  {
    id: 8,
    name: "James's wallet",
    role: "Ethereum",
    address: "0xC524b945DD820f70333f4696102D10bC12629C",
    avatar: { bg: "bg-yellow-500", pattern: "stripes" },
  },
]

const tabs = [
  { id: "company", name: "Company" },
  { id: "permissions", name: "Permissions" },
  { id: "hiring", name: "Hiring templates" },
  { id: "address", name: "Address book" },
]

export default function AddressBookSettings() {
  const [activeTab, setActiveTab] = useState("address")
  const [contactList, setContactList] = useState(contacts)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; contact: any }>({
    isOpen: false,
    contact: null,
  })

  const handleDeleteClick = (contact: any) => {
    setDeleteModal({ isOpen: true, contact })
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.contact) {
      setContactList((prev) => prev.filter((c) => c.id !== deleteModal.contact.id))
    }
    setDeleteModal({ isOpen: false, contact: null })
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, contact: null })
  }

  const getAvatarPattern = (pattern: string) => {
    const patterns = {
      dots: "radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)",
      grid: "linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
      circles: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 30%, transparent 30%)",
      squares:
        "repeating-linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 4px, transparent 4px, transparent 8px)",
      triangles:
        "repeating-linear-gradient(60deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 4px, transparent 4px, transparent 8px)",
      hexagons: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 20%, transparent 20%)",
      waves:
        "repeating-linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 2px, transparent 2px, transparent 6px)",
      stripes:
        "repeating-linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 3px, transparent 3px, transparent 6px)",
    }
    return patterns[pattern as keyof typeof patterns] || ""
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 md:px-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Address book</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactList.map((contact) => (
            <Card key={contact.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">

                <div
                  className={`w-12 h-12 rounded-lg ${contact.avatar.bg} flex-shrink-0`}
                  style={{
                    backgroundImage: getAvatarPattern(contact.avatar.pattern),
                    backgroundSize: "8px 8px",
                  }}
                />


                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900">{contact.name}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{contact.role}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{contact.address}</p>
                </div>


                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClick(contact)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeleteCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Remove address</h3>
              <p className="text-gray-600 mx-12">Are you sure you want to delete <span className="font-semibold">{deleteModal.contact?.name}</span> address</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handleDeleteCancel}
                className="flex-1 py-3 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="flex-1 py-3 bg-[#5E2A8C] hover:bg-[#5E2A8C]/70 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

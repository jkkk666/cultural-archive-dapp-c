import React from 'react'

interface HeaderProps {
  account: string | null
  isConnected: boolean
  onConnect: () => void
  onDisconnect: () => void
}

export default function Header({ account, isConnected, onConnect, onDisconnect }: HeaderProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cultural-500 to-cultural-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">文</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">文化档案</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  已连接
                </div>
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-mono">
                  {formatAddress(account!)}
                </div>
                <button
                  onClick={onDisconnect}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  断开连接
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                连接钱包
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 
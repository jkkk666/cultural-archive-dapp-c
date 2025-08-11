'use client'

import React, { useState, useEffect } from 'react'
import { Archive } from '../types/archive'
import ArchiveList from '../components/ArchiveList'
import CreateArchiveModal from '../components/CreateArchiveModal'
import EditArchiveModal from '../components/EditArchiveModal'
import PermissionModal from '../components/PermissionModal'
import ArchiveDetailModal from '../components/ArchiveDetailModal'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [archives, setArchives] = useState<Archive[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedArchive, setSelectedArchive] = useState<Archive | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkConnection()
  }, [])

  useEffect(() => {
    if (isConnected) {
      loadArchives()
    }
  }, [isConnected])

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
        }
      } catch (error) {
        console.error('检查连接状态失败:', error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
        setIsConnected(true)
      } catch (error) {
        console.error('连接钱包失败:', error)
      }
    } else {
      alert('请安装MetaMask钱包')
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const loadArchives = async () => {
    setLoading(true)
    try {
      // 模拟加载档案数据
      const mockArchives: Archive[] = [
        {
          id: 1,
          title: "古代青铜器收藏",
          description: "珍贵的古代青铜器文物收藏，包含商周时期的礼器、乐器等。这些文物具有重要的历史价值和艺术价值，是中华文明的重要见证。",
          ipfsHash: "QmXxxx1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          category: "文物",
          location: "中国",
          year: 2023,
          creator: "0x8c4b1234567890abcdef1234567890abcdef1234567890abcdef1234567890ff75",
          createdAt: Date.now() - 86400000 * 7,
          isPublic: true,
          tags: ["青铜器", "古代", "文物", "商周", "礼器"]
        },
        {
          id: 2,
          title: "传统戏曲录音集",
          description: "京剧、昆曲等传统戏曲的珍贵录音资料，收录了多位著名艺术家的经典唱段。这些录音资料对于研究中国传统戏曲艺术具有重要价值。",
          ipfsHash: "QmYxxxabcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
          category: "音频",
          location: "北京",
          year: 2022,
          creator: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          createdAt: Date.now() - 86400000 * 14,
          isPublic: true,
          tags: ["戏曲", "京剧", "昆曲", "录音", "传统艺术"]
        },
        {
          id: 3,
          title: "古代建筑摄影集",
          description: "中国古代建筑的精美摄影作品，包括故宫、颐和园、苏州园林等著名建筑。这些照片记录了传统建筑的精美细节和建筑艺术。",
          ipfsHash: "QmZxxx1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          category: "图片",
          location: "中国各地",
          year: 2021,
          creator: "0x8c4b1234567890abcdef1234567890abcdef1234567890abcdef1234567890ff75",
          createdAt: Date.now() - 86400000 * 30,
          isPublic: false,
          tags: ["建筑", "摄影", "古代", "故宫", "园林"]
        }
      ]
      setArchives(mockArchives)
    } catch (error) {
      console.error('加载档案失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateArchive = async (archiveData: Omit<Archive, 'id' | 'creator' | 'createdAt'>) => {
    try {
      // 模拟创建档案
      const newArchive: Archive = {
        id: archives.length + 1,
        ...archiveData,
        creator: account!,
        createdAt: Date.now()
      }
      setArchives([newArchive, ...archives])
      setIsCreateModalOpen(false)
    } catch (error) {
      console.error('创建档案失败:', error)
    }
  }

  const handleEditArchive = (archive: Archive) => {
    setSelectedArchive(archive)
    setIsEditModalOpen(true)
  }

  const handleUpdateArchive = (archiveId: number, archiveData: Omit<Archive, 'id' | 'creator' | 'createdAt'>) => {
    setArchives(archives.map(archive => 
      archive.id === archiveId 
        ? { ...archive, ...archiveData }
        : archive
    ))
    setIsEditModalOpen(false)
  }

  const handleDeleteArchive = (archiveId: number) => {
    if (confirm('确定要删除这个档案吗？此操作不可撤销。')) {
      setArchives(archives.filter(a => a.id !== archiveId))
    }
  }

  const handleViewArchive = (archive: Archive) => {
    setSelectedArchive(archive)
    setIsDetailModalOpen(true)
  }

  const handleManagePermissions = (archive: Archive) => {
    setSelectedArchive(archive)
    setIsPermissionModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* 头部 */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
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
                    onClick={disconnectWallet}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    断开连接
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  连接钱包
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            文化数字档案
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            基于区块链技术保护和管理珍贵的文化遗产数字档案，
            确保其真实性、完整性和永久性
          </p>
        </div>

        {!isConnected ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                连接钱包
              </h2>
              <p className="text-gray-600 mb-6">
                请连接您的Web3钱包以访问文化档案系统
              </p>
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                连接钱包
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                档案列表
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                创建档案
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">加载中...</p>
              </div>
            ) : (
              <ArchiveList 
                archives={archives}
                onEdit={handleEditArchive}
                onDelete={handleDeleteArchive}
                onView={handleViewArchive}
                onManagePermissions={handleManagePermissions}
              />
            )}
          </div>
        )}
      </main>

      {/* 模态框 */}
      <CreateArchiveModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateArchive}
      />

      <EditArchiveModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        archive={selectedArchive}
        onSubmit={handleUpdateArchive}
      />

      <PermissionModal
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        archive={selectedArchive}
      />

      <ArchiveDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        archive={selectedArchive}
      />
    </div>
  )
}

declare global {
  interface Window {
    ethereum?: any
  }
} 
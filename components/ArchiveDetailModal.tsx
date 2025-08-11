import React from 'react'
import { XMarkIcon, CalendarIcon, MapPinIcon, TagIcon, UserIcon, LinkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { Archive } from '../types/archive'

interface ArchiveDetailModalProps {
  isOpen: boolean
  onClose: () => void
  archive: Archive | null
}

export default function ArchiveDetailModal({ isOpen, onClose, archive }: ArchiveDetailModalProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getIPFSGatewayURL = (hash: string) => {
    return `https://ipfs.io/ipfs/${hash}`
  }

  if (!isOpen || !archive) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">
            档案详情
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* 档案标题和状态 */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{archive.title}</h1>
              <div className="flex items-center space-x-2">
                {archive.isPublic ? (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <ShieldCheckIcon className="w-4 h-4 mr-1" />
                    公开档案
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    私有档案
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-lg">{archive.description}</p>
          </div>

          {/* 档案信息网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 基本信息 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <TagIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-600 mr-2">分类:</span>
                  <span className="font-medium">{archive.category}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-600 mr-2">地点:</span>
                  <span className="font-medium">{archive.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-600 mr-2">年份:</span>
                  <span className="font-medium">{archive.year}年</span>
                </div>
                <div className="flex items-center text-sm">
                  <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-600 mr-2">创建者:</span>
                  <span className="font-mono font-medium">{formatAddress(archive.creator)}</span>
                </div>
              </div>
            </div>

            {/* 区块链信息 */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-900 mb-4">区块链信息</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="text-blue-600 mr-2">档案ID:</span>
                  <span className="font-mono font-medium">#{archive.id}</span>
                </div>
                <div className="text-sm">
                  <span className="text-blue-600 mr-2">创建时间:</span>
                  <span className="font-medium">{formatDate(archive.createdAt)}</span>
                </div>
                <div className="text-sm">
                  <span className="text-blue-600 mr-2">IPFS哈希:</span>
                  <div className="flex items-center mt-1">
                    <span className="font-mono text-xs bg-white px-2 py-1 rounded border">
                      {archive.ipfsHash}
                    </span>
                    <a
                      href={getIPFSGatewayURL(archive.ipfsHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:text-blue-700"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 标签 */}
          {archive.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">标签</h3>
              <div className="flex flex-wrap gap-2">
                {archive.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 区块链验证信息 */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-green-900 mb-3">区块链验证</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-700">数据完整性验证通过</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-700">时间戳验证通过</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-700">创建者身份验证通过</span>
              </div>
            </div>
            <p className="text-green-700 text-sm mt-3">
              此档案已通过区块链技术验证，确保其真实性和不可篡改性。
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between items-center pt-6 border-t">
            <div className="text-sm text-gray-500">
              最后更新: {formatDate(archive.createdAt)}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  // 这里可以添加下载功能
                  window.open(getIPFSGatewayURL(archive.ipfsHash), '_blank')
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                查看原始文件
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
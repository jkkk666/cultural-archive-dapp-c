import React, { useState } from 'react'
import { Archive } from '../types/archive'
import { CalendarIcon, MapPinIcon, TagIcon, EyeIcon, PencilIcon, TrashIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline'

interface ArchiveListProps {
  archives: Archive[]
  onEdit?: (archive: Archive) => void
  onDelete?: (archiveId: number) => void
  onView?: (archive: Archive) => void
  onManagePermissions?: (archive: Archive) => void
}

export default function ArchiveList({ 
  archives, 
  onEdit, 
  onDelete, 
  onView,
  onManagePermissions 
}: ArchiveListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [searchTerm, setSearchTerm] = useState('')

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN')
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      '文物': 'bg-red-100 text-red-800',
      '音频': 'bg-blue-100 text-blue-800',
      '视频': 'bg-green-100 text-green-800',
      '图片': 'bg-yellow-100 text-yellow-800',
      '文档': 'bg-purple-100 text-purple-800',
      '其他': 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || colors['其他']
  }

  const categories = ['全部', '文物', '音频', '视频', '图片', '文档', '其他']

  const filteredArchives = archives.filter(archive => {
    const matchesCategory = selectedCategory === '全部' || archive.category === selectedCategory
    const matchesSearch = archive.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         archive.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         archive.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  if (archives.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <EyeIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无档案</h3>
          <p className="text-gray-600">还没有创建任何文化档案，点击"创建档案"开始吧！</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* 搜索和筛选 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索档案..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          共找到 {filteredArchives.length} 个档案
        </div>
      </div>

      {/* 档案列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArchives.map((archive) => (
          <div key={archive.id} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
                  {archive.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(archive.category)}`}>
                  {archive.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {archive.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span>{archive.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>{archive.year}年</span>
                </div>
              </div>
              
              {archive.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <TagIcon className="w-4 h-4 mr-2" />
                    <span>标签</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {archive.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {archive.tags.length > 3 && (
                      <span className="text-gray-400 text-xs">+{archive.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  创建于 {formatDate(archive.createdAt)}
                </div>
                <div className="flex items-center space-x-2">
                  {archive.isPublic ? (
                    <LockOpenIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <LockClosedIcon className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onView?.(archive)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                  >
                    <EyeIcon className="w-4 h-4 mr-1" />
                    查看
                  </button>
                  <button
                    onClick={() => onEdit?.(archive)}
                    className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    编辑
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onManagePermissions?.(archive)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    权限
                  </button>
                  <button
                    onClick={() => onDelete?.(archive.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
import React, { useState } from 'react'
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { CreateArchiveData } from '../types/archive'

interface CreateArchiveModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateArchiveData) => void
}

export default function CreateArchiveModal({ isOpen, onClose, onSubmit }: CreateArchiveModalProps) {
  const [formData, setFormData] = useState<CreateArchiveData>({
    title: '',
    description: '',
    ipfsHash: '',
    category: '',
    location: '',
    year: new Date().getFullYear(),
    isPublic: true,
    tags: []
  })
  const [tagInput, setTagInput] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleInputChange = (field: keyof CreateArchiveData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // 这里应该实现IPFS上传逻辑
      // 暂时使用模拟的IPFS哈希
      const mockIpfsHash = `Qm${Math.random().toString(36).substring(2, 15)}`
      handleInputChange('ipfsHash', mockIpfsHash)
    } catch (error) {
      console.error('文件上传失败:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.ipfsHash) {
      onSubmit(formData)
      setFormData({
        title: '',
        description: '',
        ipfsHash: '',
        category: '',
        location: '',
        year: new Date().getFullYear(),
        isPublic: true,
        tags: []
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">创建文化档案</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              档案标题 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cultural-500 focus:border-transparent"
              placeholder="请输入档案标题"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              档案描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cultural-500 focus:border-transparent"
              placeholder="请输入档案描述"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cultural-500 focus:border-transparent"
              >
                <option value="">选择分类</option>
                <option value="文物">文物</option>
                <option value="音频">音频</option>
                <option value="视频">视频</option>
                <option value="图片">图片</option>
                <option value="文档">文档</option>
                <option value="其他">其他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                年份
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cultural-500 focus:border-transparent"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              地点
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cultural-500 focus:border-transparent"
              placeholder="请输入地点"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              上传文件 *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-cultural-600 text-white px-4 py-2 rounded-lg hover:bg-cultural-700 transition-colors"
              >
                {uploading ? '上传中...' : '选择文件'}
              </label>
              {formData.ipfsHash && (
                <p className="mt-2 text-sm text-gray-600">
                  IPFS哈希: {formData.ipfsHash}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标签
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cultural-500 focus:border-transparent"
                placeholder="输入标签后按回车添加"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-cultural-600 text-white rounded-lg hover:bg-cultural-700 transition-colors"
              >
                添加
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-cultural-100 text-cultural-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-cultural-600 hover:text-cultural-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => handleInputChange('isPublic', e.target.checked)}
              className="w-4 h-4 text-cultural-600 focus:ring-cultural-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
              设为公开档案
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-cultural-600 text-white rounded-lg hover:bg-cultural-700 transition-colors"
            >
              创建档案
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 
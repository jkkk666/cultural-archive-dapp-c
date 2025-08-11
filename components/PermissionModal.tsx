import React, { useState } from 'react'
import { XMarkIcon, UserPlusIcon, UserMinusIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Archive } from '../types/archive'

interface PermissionModalProps {
  isOpen: boolean
  onClose: () => void
  archive: Archive | null
}

interface UserPermission {
  address: string
  canView: boolean
  canEdit: boolean
  canDelete: boolean
}

export default function PermissionModal({ isOpen, onClose, archive }: PermissionModalProps) {
  const [newUserAddress, setNewUserAddress] = useState('')
  const [permissions, setPermissions] = useState<UserPermission[]>([
    {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      canView: true,
      canEdit: false,
      canDelete: false
    },
    {
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      canView: true,
      canEdit: true,
      canDelete: false
    }
  ])

  const handleAddUser = () => {
    if (newUserAddress.trim() && !permissions.find(p => p.address === newUserAddress)) {
      setPermissions([...permissions, {
        address: newUserAddress,
        canView: true,
        canEdit: false,
        canDelete: false
      }])
      setNewUserAddress('')
    }
  }

  const handleRemoveUser = (address: string) => {
    setPermissions(permissions.filter(p => p.address !== address))
  }

  const handlePermissionChange = (address: string, permission: keyof Omit<UserPermission, 'address'>, value: boolean) => {
    setPermissions(permissions.map(p => 
      p.address === address ? { ...p, [permission]: value } : p
    ))
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!isOpen || !archive) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">
            管理档案权限 - {archive.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* 档案信息 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">档案信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">标题:</span> {archive.title}
              </div>
              <div>
                <span className="text-gray-600">分类:</span> {archive.category}
              </div>
              <div>
                <span className="text-gray-600">创建者:</span> {formatAddress(archive.creator)}
              </div>
              <div>
                <span className="text-gray-600">状态:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  archive.isPublic 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {archive.isPublic ? '公开' : '私有'}
                </span>
              </div>
            </div>
          </div>

          {/* 添加新用户 */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-3">添加用户权限</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newUserAddress}
                onChange={(e) => setNewUserAddress(e.target.value)}
                placeholder="输入用户钱包地址"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddUser}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <UserPlusIcon className="w-4 h-4 mr-2" />
                添加
              </button>
            </div>
          </div>

          {/* 权限列表 */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">用户权限列表</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      用户地址
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">
                      <EyeIcon className="w-4 h-4 mx-auto" />
                      查看
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">
                      <PencilIcon className="w-4 h-4 mx-auto" />
                      编辑
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">
                      <TrashIcon className="w-4 h-4 mx-auto" />
                      删除
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((permission, index) => (
                    <tr key={permission.address} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-mono">
                        {formatAddress(permission.address)}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={permission.canView}
                          onChange={(e) => handlePermissionChange(permission.address, 'canView', e.target.checked)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={permission.canEdit}
                          onChange={(e) => handlePermissionChange(permission.address, 'canEdit', e.target.checked)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={permission.canDelete}
                          onChange={(e) => handlePermissionChange(permission.address, 'canDelete', e.target.checked)}
                          className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <button
                          onClick={() => handleRemoveUser(permission.address)}
                          className="text-red-600 hover:text-red-700 flex items-center justify-center mx-auto"
                        >
                          <UserMinusIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 权限说明 */}
          <div className="mt-6 bg-yellow-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-900 mb-2">权限说明</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• <strong>查看权限:</strong> 用户可以查看档案内容和元数据</li>
              <li>• <strong>编辑权限:</strong> 用户可以修改档案信息和内容</li>
              <li>• <strong>删除权限:</strong> 用户可以删除档案（谨慎授予）</li>
              <li>• 权限变更将立即生效并记录在区块链上</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end space-x-4 p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            onClick={() => {
              // 这里会调用智能合约更新权限
              console.log('更新权限:', permissions)
              onClose()
            }}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            保存权限
          </button>
        </div>
      </div>
    </div>
  )
} 
'use client'

import React from 'react'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          文化档案 DApp
        </h1>
        <p className="text-gray-600 mb-6">
          基于区块链技术的文化数字档案管理系统
        </p>
        <div className="space-y-4">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            ✅ 应用运行正常
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            🔗 准备连接Web3钱包
          </div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg">
            📁 IPFS存储已配置
          </div>
        </div>
      </div>
    </div>
  )
} 
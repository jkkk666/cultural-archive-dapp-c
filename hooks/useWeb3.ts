import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export function useWeb3() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
          setProvider(new ethers.BrowserProvider(window.ethereum))
        }
      } catch (error) {
        console.error('检查连接状态失败:', error)
      }
    }
  }

  const connect = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
        setIsConnected(true)
        setProvider(new ethers.BrowserProvider(window.ethereum))
      } catch (error) {
        console.error('连接钱包失败:', error)
      }
    } else {
      alert('请安装MetaMask钱包')
    }
  }

  const disconnect = () => {
    setAccount(null)
    setIsConnected(false)
    setProvider(null)
  }

  return {
    account,
    isConnected,
    provider,
    connect,
    disconnect
  }
}

declare global {
  interface Window {
    ethereum?: any
  }
} 
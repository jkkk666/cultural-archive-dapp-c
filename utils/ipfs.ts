import { create } from 'ipfs-http-client'

// 配置IPFS客户端
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const result = await ipfs.add(file)
    return result.path
  } catch (error) {
    console.error('IPFS上传失败:', error)
    throw new Error('文件上传失败')
  }
}

export const getIPFSGatewayURL = (hash: string): string => {
  return `https://ipfs.io/ipfs/${hash}`
}

export const getInfuraIPFSURL = (hash: string): string => {
  return `https://ipfs.infura.io/ipfs/${hash}`
} 
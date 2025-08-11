import { ethers } from 'ethers'
import CulturalArchiveABI from '../artifacts/contracts/CulturalArchive.sol/CulturalArchive.json'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

export class CulturalArchiveContract {
  private contract: any
  private provider: ethers.BrowserProvider

  constructor(provider: ethers.BrowserProvider) {
    this.provider = provider
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CulturalArchiveABI.abi, provider)
  }

  async createArchive(
    title: string,
    description: string,
    ipfsHash: string,
    category: string,
    location: string,
    year: number,
    isPublic: boolean,
    tags: string[]
  ): Promise<number> {
    try {
      const signer = await this.provider.getSigner()
      const contractWithSigner = this.contract.connect(signer)
      
      const tx = await contractWithSigner.createArchive(
        title,
        description,
        ipfsHash,
        category,
        location,
        year,
        isPublic,
        tags
      )
      const receipt = await tx.wait()
      
      // Get archive ID from event
      const event = receipt.events?.find((e: any) => e.event === 'ArchiveCreated')
      return event?.args?.id?.toNumber() || 0
    } catch (error) {
      console.error('Failed to create archive:', error)
      throw error
    }
  }

  async getArchive(archiveId: number) {
    try {
      const archive = await this.contract.getArchive(archiveId)
      return {
        id: archive.id.toNumber(),
        title: archive.title,
        description: archive.description,
        ipfsHash: archive.ipfsHash,
        category: archive.category,
        location: archive.location,
        year: archive.year.toNumber(),
        creator: archive.creator,
        createdAt: archive.createdAt.toNumber(),
        isPublic: archive.isPublic,
        tags: archive.tags
      }
    } catch (error) {
      console.error('Failed to get archive:', error)
      throw error
    }
  }

  async getUserArchives(userAddress: string): Promise<number[]> {
    try {
      const archiveIds = await this.contract.getUserArchives(userAddress)
      return archiveIds.map((id: any) => id.toNumber())
    } catch (error) {
      console.error('Failed to get user archives:', error)
      throw error
    }
  }

  async getCategoryArchives(category: string): Promise<number[]> {
    try {
      const archiveIds = await this.contract.getCategoryArchives(category)
      return archiveIds.map((id: any) => id.toNumber())
    } catch (error) {
      console.error('Failed to get category archives:', error)
      throw error
    }
  }

  async getTotalArchives(): Promise<number> {
    try {
      const total = await this.contract.getTotalArchives()
      return total.toNumber()
    } catch (error) {
      console.error('Failed to get total archives:', error)
      throw error
    }
  }

  async grantAccess(archiveId: number, userAddress: string, permissions: number) {
    try {
      const signer = await this.provider.getSigner()
      const contractWithSigner = this.contract.connect(signer)
      
      const tx = await contractWithSigner.grantAccess(archiveId, userAddress, permissions)
      await tx.wait()
    } catch (error) {
      console.error('Failed to grant access:', error)
      throw error
    }
  }

  async revokeAccess(archiveId: number, userAddress: string) {
    try {
      const signer = await this.provider.getSigner()
      const contractWithSigner = this.contract.connect(signer)
      
      const tx = await contractWithSigner.revokeAccess(archiveId, userAddress)
      await tx.wait()
    } catch (error) {
      console.error('Failed to revoke access:', error)
      throw error
    }
  }
} 
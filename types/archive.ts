export interface Archive {
  id: number
  title: string
  description: string
  ipfsHash: string
  category: string
  location: string
  year: number
  creator: string
  createdAt: number
  isPublic: boolean
  tags: string[]
}

export interface CreateArchiveData {
  title: string
  description: string
  ipfsHash: string
  category: string
  location: string
  year: number
  isPublic: boolean
  tags: string[]
}

export interface ArchiveAccess {
  canView: boolean
  canEdit: boolean
  canDelete: boolean
} 
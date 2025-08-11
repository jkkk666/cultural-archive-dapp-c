export interface CulturalArchiveABI {
  abi: any[];
  [key: string]: any;
}

export interface Archive {
  id: number;
  title: string;
  description: string;
  ipfsHash: string;
  category: string;
  location: string;
  year: number;
  creator: string;
  createdAt: number;
  isPublic: boolean;
  tags: string[];
}

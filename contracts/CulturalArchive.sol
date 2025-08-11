// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CulturalArchive is Ownable, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter private _archiveIds;

    struct Archive {
        uint256 id;
        string title;
        string description;
        string ipfsHash;
        string category;
        string location;
        uint256 year;
        address creator;
        uint256 createdAt;
        bool isPublic;
        string[] tags;
    }

    struct ArchiveAccess {
        bool canView;
        bool canEdit;
        bool canDelete;
    }

    mapping(uint256 => Archive) public archives;
    mapping(address => mapping(uint256 => ArchiveAccess)) public accessControl;
    mapping(address => uint256[]) public userArchives;
    mapping(string => uint256[]) public categoryArchives;
    mapping(string => uint256[]) public tagArchives;

    event ArchiveCreated(uint256 indexed id, address indexed creator, string title);
    event ArchiveUpdated(uint256 indexed id, address indexed updater);
    event ArchiveDeleted(uint256 indexed id, address indexed deleter);
    event AccessGranted(uint256 indexed archiveId, address indexed user, uint8 permissions);
    event AccessRevoked(uint256 indexed archiveId, address indexed user);
    
    modifier onlyArchiveOwner(uint256 archiveId) {
        require(archives[archiveId].creator == msg.sender, "Only archive creator can perform this operation");
        _;
    }
    
    modifier hasAccess(uint256 archiveId, uint8 permission) {
        require(
            archives[archiveId].creator == msg.sender ||
            accessControl[msg.sender][archiveId].canView ||
            archives[archiveId].isPublic,
            "No access permission"
        );
        _;
    }
    
    function createArchive(
        string memory title,
        string memory description,
        string memory ipfsHash,
        string memory category,
        string memory location,
        uint256 year,
        bool isPublic,
        string[] memory tags
    ) public whenNotPaused returns (uint256) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        _archiveIds.increment();
        uint256 newArchiveId = _archiveIds.current();
        
        archives[newArchiveId] = Archive({
            id: newArchiveId,
            title: title,
            description: description,
            ipfsHash: ipfsHash,
            category: category,
            location: location,
            year: year,
            creator: msg.sender,
            createdAt: block.timestamp,
            isPublic: isPublic,
            tags: tags
        });
        
        userArchives[msg.sender].push(newArchiveId);
        categoryArchives[category].push(newArchiveId);
        
        for (uint i = 0; i < tags.length; i++) {
            tagArchives[tags[i]].push(newArchiveId);
        }
        
        emit ArchiveCreated(newArchiveId, msg.sender, title);
        return newArchiveId;
    }
    
    function updateArchive(
        uint256 archiveId,
        string memory title,
        string memory description,
        string memory ipfsHash,
        string memory category,
        string memory location,
        uint256 year,
        bool isPublic,
        string[] memory tags
    ) public onlyArchiveOwner(archiveId) whenNotPaused {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        Archive storage archive = archives[archiveId];
        
        // Update category index
        if (keccak256(bytes(archive.category)) != keccak256(bytes(category))) {
            removeFromCategory(archiveId, archive.category);
            categoryArchives[category].push(archiveId);
        }
        
        // Update tag index
        for (uint i = 0; i < archive.tags.length; i++) {
            removeFromTag(archiveId, archive.tags[i]);
        }
        for (uint i = 0; i < tags.length; i++) {
            tagArchives[tags[i]].push(archiveId);
        }
        
        archive.title = title;
        archive.description = description;
        archive.ipfsHash = ipfsHash;
        archive.category = category;
        archive.location = location;
        archive.year = year;
        archive.isPublic = isPublic;
        archive.tags = tags;
        
        emit ArchiveUpdated(archiveId, msg.sender);
    }
    
    function deleteArchive(uint256 archiveId) public onlyArchiveOwner(archiveId) whenNotPaused {
        Archive storage archive = archives[archiveId];
        
        // Remove from category index
        removeFromCategory(archiveId, archive.category);
        
        // Remove from tag index
        for (uint i = 0; i < archive.tags.length; i++) {
            removeFromTag(archiveId, archive.tags[i]);
        }
        
        // Remove from user archives
        removeFromUserArchives(archiveId, msg.sender);
        
        // Delete archive
        delete archives[archiveId];
        
        emit ArchiveDeleted(archiveId, msg.sender);
    }
    
    function grantAccess(uint256 archiveId, address user, uint8 permissions) public onlyArchiveOwner(archiveId) {
        accessControl[user][archiveId] = ArchiveAccess({
            canView: (permissions & 1) != 0,
            canEdit: (permissions & 2) != 0,
            canDelete: (permissions & 4) != 0
        });
        
        emit AccessGranted(archiveId, user, permissions);
    }
    
    function revokeAccess(uint256 archiveId, address user) public onlyArchiveOwner(archiveId) {
        delete accessControl[user][archiveId];
        emit AccessRevoked(archiveId, user);
    }
    
    function getArchive(uint256 archiveId) public view returns (Archive memory) {
        require(archives[archiveId].creator != address(0), "Archive does not exist");
        return archives[archiveId];
    }
    
    function getUserArchives(address user) public view returns (uint256[] memory) {
        return userArchives[user];
    }
    
    function getCategoryArchives(string memory category) public view returns (uint256[] memory) {
        return categoryArchives[category];
    }
    
    function getTagArchives(string memory tag) public view returns (uint256[] memory) {
        return tagArchives[tag];
    }
    
    function getTotalArchives() public view returns (uint256) {
        return _archiveIds.current();
    }
    
    function pause() public onlyOwner {
        _pause();
    }
    
    function unpause() public onlyOwner {
        _unpause();
    }
    
    function removeFromCategory(uint256 archiveId, string memory category) private {
        uint256[] storage categoryList = categoryArchives[category];
        for (uint i = 0; i < categoryList.length; i++) {
            if (categoryList[i] == archiveId) {
                categoryList[i] = categoryList[categoryList.length - 1];
                categoryList.pop();
                break;
            }
        }
    }
    
    function removeFromTag(uint256 archiveId, string memory tag) private {
        uint256[] storage tagList = tagArchives[tag];
        for (uint i = 0; i < tagList.length; i++) {
            if (tagList[i] == archiveId) {
                tagList[i] = tagList[tagList.length - 1];
                tagList.pop();
                break;
            }
        }
    }
    
    function removeFromUserArchives(uint256 archiveId, address user) private {
        uint256[] storage userList = userArchives[user];
        for (uint i = 0; i < userList.length; i++) {
            if (userList[i] == archiveId) {
                userList[i] = userList[userList.length - 1];
                userList.pop();
                break;
            }
        }
    }
} 
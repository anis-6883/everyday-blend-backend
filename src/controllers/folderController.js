const Folder = require('../models/Folder'); 
const { Exclude } = require('../utils');

const createFolder = async folderData => {
    try {
        const newFolder = await Folder.create(folderData);

        const folder = Exclude(newFolder.toObject(), [
            'id',
            'createdAt',
            'updatedAt'
        ]);

        return { status: true, message: 'Folder created successfully', data: folder };
    } catch (error) {
        console.error('Error in createFolder:', error);
        console.log('Error code:', error.code);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
            throw new Error('Folder is already in use'); 
        }
        throw new Error('Failed to create folder');
    }
};

const getAllFolder = async () => {
    try {
        const allFolderData = await Folder.find();

        return allFolderData;
    } catch (error) {
        console.error('Error while fetching all folder data:', error);
        throw new Error('Failed to fetch folder data');
    }
};

const getFolderByName = async folderName => {
    try {
        const folderData = await Folder.findOne({ name: folderName });

        return folderData;
    } catch (error) {
        console.error('Error while fetching folder by name:', error);
        throw new Error('Failed to fetch folder by name');
    }
};

const updateFolderById = async (folderId, newData) => {
    try {
        const updatedFolder = await Folder.findByIdAndUpdate(folderId, newData, { new: true });

        return updatedFolder;
    } catch (error) {
        console.error('Error while updating folder by ID:', error);
        throw new Error('Failed to update folder by ID');
    }
};

const deleteFolderById = async folderId => {
    try {
        const deleteResult = await Folder.findByIdAndDelete(folderId);

        if (deleteResult) {
            return 1;
        } else {
            return 0; 
        }
    } catch (error) {
        console.error('Error while deleting folder by ID:', error);
        throw new Error('Failed to delete folder by ID');
    }
};

module.exports = {
    createFolder,
    getAllFolder,
    getFolderByName,
    updateFolderById,
    deleteFolderById
};

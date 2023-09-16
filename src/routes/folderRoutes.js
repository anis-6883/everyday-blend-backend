const express = require('express');
const { body, param, validationResult } = require('express-validator');
const folderController = require('../controllers/folderController');
const router = express.Router();

router.post(
    '/create',
    [body('name').notEmpty().withMessage('Name is required'), body('user_id').notEmpty().withMessage('User ID is required')],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: false, errors: errors.array() });
            }

            const folderData = req.body;
            const newFolder = await folderController.createFolder(folderData);
            return res.status(201).json(newFolder);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);

router.get('/all', async (req, res, next) => {
    try {
        const allFolderData = await folderController.getAllFolder();

        return res.status(200).json({ status: true, data: allFolderData });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/find/:folderName', [param('folderName').notEmpty().withMessage('Folder name is required')], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, errors: errors.array() });
        }
        const folderName = req.params.folderName;
        const folderData = await folderController.getFolderByName(folderName);

        if (!folderData) {
            return res.status(404).json({ status: false, message: 'Folder does not exists' });
        }

        return res.status(200).json({ status: true, data: folderData });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.put(
    '/:folderId',
    [
        param('folderId').notEmpty().withMessage('Folder ID is required'),
        body('newData').isObject().notEmpty().withMessage('New data is required')
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: false, errors: errors.array() });
            }

            const folderId = req.params.folderId;
            const newData = req.body.newData;
            const updatedFolder = await folderController.updateFolderById(folderId, newData);

            if (!updatedFolder) {
                return res.status(404).json({ status: false, message: 'Folder not found' });
            }

            return res.status(200).json({ status: true, data: updatedFolder });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);

router.delete('/:folderId', [param('folderId').notEmpty().withMessage('Folder ID is required')], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, errors: errors.array() });
        }

        const folderId = req.params.folderId;
        const deleteResult = await folderController.deleteFolderById(folderId);

        if (deleteResult === 0) {
            return res.status(404).json({ status: false, message: 'Folder not found' });
        }

        return res.status(200).json({ status: true, message: 'Folder deleted successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;

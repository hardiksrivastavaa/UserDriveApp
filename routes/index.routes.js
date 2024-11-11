const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authe.js');
const { storage } = require('../config/cloudConfig.js');
const multer = require('multer');
const upload = multer({ storage: storage });
const fileModel = require('../models/files.model.js');


router.get('/', (req, res) => {
    res.render('index');  // Ensure this matches the filename of your EJS view
  });

  
// Drive route (protected route for authenticated users)
router.get('/drive', authMiddleware, async (req, res) => {
    try {
        const userFiles = await fileModel.find({ user: req.user.userId });
        res.render('drive', { files: userFiles });
    } catch (error) {
        console.error('Failed to load drive page:', error);
        res.status(500).json({ message: 'Failed to load drive page' });
    }
});

// Upload route (protected route for authenticated users)
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const newFile = await fileModel.create({
            path: req.file.path,
            originalname: req.file.originalname,
            user: req.user.userId,
        });

        res.redirect('/drive');  // Redirect to the drive page after upload
    } catch (error) {
        console.error('File upload failed:', error);
        res.status(500).json({ message: 'File upload failed' });
    }
});

// Download route (protected route for authenticated users)
router.get('/download/:id', authMiddleware, async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;
        const fileId = req.params.id;

        const file = await fileModel.findOne({
            _id: fileId,
            user: loggedInUserId,
        });

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.redirect(file.path);  // Redirect to the file path for download
    } catch (error) {
        console.error('File download failed:', error);
        res.status(500).json({ message: 'File download failed' });
    }
});

// Logout route (clears the cookie)
router.get('/logout', (req, res) => {
    try {
        res.clearCookie('token');
        res.redirect('/');
    } catch (error) {
        console.error('Logout failed:', error);
        res.status(500).json({ message: 'Logout failed' });
    }
});

// Delete route (protected route for authenticated users)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;
        const fileId = req.params.id;

        const file = await fileModel.findOne({
            _id: fileId,
            user: loggedInUserId,
        });

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        const publicId = file.path.split('/').pop().split('.')[0]; // Extract public ID for Cloudinary

        await cloudinary.uploader.destroy(`filesharing_drive/${publicId}`);
        await fileModel.findByIdAndDelete(fileId);

        res.status(200).json({ message: 'File successfully deleted' });
    } catch (error) {
        console.error('Failed to delete file:', error);
        res.status(500).json({ message: 'Failed to delete file' });
    }
});

module.exports = router;

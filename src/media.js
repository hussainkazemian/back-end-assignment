/**
 * Media routes for handling CRUD operations on media items.
 * @module mediaRoutes
 */
import express from 'express';
const router = express.Router();

/**
 * Mock data representing media items.
 */

// Mock data
const mediaItems = [
  {
    id: 9632,
    filename: 'imm.png',
    filesize: 887574,
    title: 'profile-image',
    description: 'profile-image',
    user_id: 1606,
    media_type: 'image/jpeg',
    created_at: '2023-10-16T19:00:09.000Z',
    url: './media/imm.png'  // URL to access the image
  },
  {
    id: 9626,
    filename: 'user.png',
    filesize: 60703,
    title: 'Miika',
    description: 'My Photo',
    user_id: 3671,
    media_type: 'image/jpeg',
    created_at: '2023-10-13T12:14:26.000Z',
    url: './media/user.png'  // URL to access the image
  },
  {
    id: 9625,
    filename: 'man.png',
    filesize: 30635,
    title: 'Aksux',
    description: 'friends',
    user_id: 260,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T20:03:08.000Z',
    url: './media/man.png'  // URL to access the image
  },
  {
    id: 9592,
    filename: 'color.jpeg',
    filesize: 48975,
    title: 'Desert',
    description: 'color-paint',
    user_id: 3609,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:59:05.000Z',
    url: './media/color.jpeg'  // URL to access the image
  },
  {
    id: 9590,
    filename: 'logo.jpeg',
    filesize: 23829,
    title: 'Basement',
    description: 'Logo',
    user_id: 305,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:56:41.000Z',
    url: './media/logo.jpeg'  // URL to access the image
  }
];

// GET /api/media - Retrieve all media items
router.get('/', (req, res) => {
  res.status(200).json(mediaItems);
});

// GET /api/media/:id - Retrieve a specific media item by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = mediaItems.find((item) => item.media_id === id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

export default router;

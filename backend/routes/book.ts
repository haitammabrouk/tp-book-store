import { Router, Request, Response } from 'express';
import { BookModel } from '../models/Book';
import express from 'express'

const router = express.Router();

// Create a new book
router.post('/', async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const book = new BookModel(req.body);
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error saving book', error });
    }
});

// Get all books
router.get('/', async (req: Request, res: Response) => {
    try {
        const books = await BookModel.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
});

export default router;
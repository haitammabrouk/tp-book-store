"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("../models/Book");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Create a new book
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const book = new Book_1.BookModel(req.body);
        const savedBook = yield book.save();
        res.status(201).json(savedBook);
    }
    catch (error) {
        res.status(500).json({ message: 'Error saving book', error });
    }
}));
// Get all books
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book_1.BookModel.find();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
}));
exports.default = router;

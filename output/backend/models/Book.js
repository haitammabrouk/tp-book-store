"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = exports.Book = exports.Format = exports.Status = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var Status;
(function (Status) {
    Status["Read"] = "Read";
    Status["ReRead"] = "Re-read";
    Status["DNF"] = "DNF";
    Status["CurrentlyReading"] = "Currently reading";
    Status["ReturnedUnread"] = "Returned Unread";
    Status["WantToRead"] = "Want to read";
})(Status || (exports.Status = Status = {}));
var Format;
(function (Format) {
    Format["Print"] = "Print";
    Format["PDF"] = "PDF";
    Format["Ebook"] = "Ebook";
    Format["AudioBook"] = "AudioBook";
})(Format || (exports.Format = Format = {}));
class Book {
    constructor(title, author, pages, status, price, format, suggestedBy, pagesRead = 0) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.finished = pagesRead >= pages;
    }
    currentlyAt() {
        return (this.pagesRead / this.pages) * 100;
    }
}
exports.Book = Book;
const BookSchema = new mongoose_1.Schema({
    title: String,
    author: String,
    pages: Number,
    status: { type: String, enum: Object.values(Status) },
    price: Number,
    pagesRead: Number,
    format: { type: String, enum: Object.values(Format) },
    finished: { type: Boolean, required: true, default: false },
});
BookSchema.pre('save', function (next) {
    this.finished = this.pagesRead >= this.pages;
    next();
});
exports.BookModel = mongoose_1.default.model('Book', BookSchema);

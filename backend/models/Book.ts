import mongoose, { Schema, Document } from 'mongoose';

export enum Status {
    Read = "Read",
    ReRead = "Re-read",
    DNF = "DNF",
    CurrentlyReading = "Currently reading",
    ReturnedUnread = "Returned Unread",
    WantToRead = "Want to read",
}

export enum Format {
    Print = "Print",
    PDF = "PDF",
    Ebook = "Ebook",
    AudioBook = "AudioBook",
}

export class Book {
    title!: string;
    author!: string;
    pages!: number;
    status!: Status;
    price!: number;
    pagesRead!: number;
    format!: Format;
    finished!: boolean;

    constructor(title: string, author: string, pages: number, status: Status, price: number, format: Format, suggestedBy: string, pagesRead: number = 0) {
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

interface IBook extends Document {
    title: string;
    author: string;
    pages: number;
    status: Status;
    price: number;
    pagesRead: number;
    format: Format;
    finished: boolean;
  }
  
  const BookSchema: Schema = new Schema({
    title: String,
    author: String,
    pages: Number,
    status: { type: String, enum: Object.values(Status) },
    price: Number,
    pagesRead: Number,
    format: { type: String, enum: Object.values(Format) },
    finished: { type: Boolean, required: true, default: false },
  });
  
  BookSchema.pre<IBook>('save', function (next) {
    this.finished = this.pagesRead >= this.pages;
    next();
  });

export const BookModel = mongoose.model<IBook>('Book', BookSchema);


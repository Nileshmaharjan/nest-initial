import { Injectable } from '@nestjs/common';
import { CreateBook } from 'src/dto/createbook.dto';
import { Book } from '../books/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { User } from '../user/user.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: BookRepository,
    ) {}
    public async createBook(createBook: CreateBook, user: User): Promise<any> {
        const book = new Book();
        book.id = createBook.id;
        book.name = createBook.name;
        book.author = createBook.author;
        book.user = user;

        await book.save();
        return book;
    }

    public async getBook(): Promise<any> {
        return await this.bookRepository.find();
    }
}

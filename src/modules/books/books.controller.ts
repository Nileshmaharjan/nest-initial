import { Controller, Post, Body, Get} from '@nestjs/common';
import { CreateBook } from '../../dto/createbook.dto';
import { BooksService } from '../books/books.service';
import { Book } from '../books/book.entity';
import { getUser } from '../user/getUser.decorator';
import { User } from '../user/user.entity';


@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService) {}

    @Post()
    public CreateBook(
        @Body() createBookDto: CreateBook,
        @getUser() user: User,
    ): Promise<Book> {
        return this.bookService.createBook(createBookDto, user);

    }

    @Get()
    public getBooks(): Promise<Book> {
        return this.bookService.getBook();
    }
}

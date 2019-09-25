import { Controller, Post, Body, Get, UseGuards, UsePipes, Param, Query} from '@nestjs/common';
import { CreateBook } from '../../dto/createbook.dto';
import { BooksService } from '../books/books.service';
import { Book } from '../books/book.entity';
import { getUser } from '../user/getUser.decorator';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '../../shared/validation.pipes';

@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BooksController {
    constructor(private readonly bookService: BooksService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    public CreateBook(
        @Body() createBookDto: CreateBook,
        @getUser() user: User,
    ): Promise<Book> {
        return this.bookService.createBook(createBookDto, user);

    }

    @Get()
    public getBooks(@Query('page') page: number, @Query('limit') limit: number ): Promise<Book> {
        return this.bookService.getBook(page, limit);
    }

    @Get(':id')
    public getBooksById(@Param() id: number) {
        return this.bookService.getBooksById(id);
    }
}

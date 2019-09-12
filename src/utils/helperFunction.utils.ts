import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';

const TypeOrmErrorFormatter = err => {
        switch (err.code) {
            case '23505':
                throw new ConflictException('ID already exists');
            default:
                throw new InternalServerErrorException();
        }
    };

export  {
    TypeOrmErrorFormatter,

};

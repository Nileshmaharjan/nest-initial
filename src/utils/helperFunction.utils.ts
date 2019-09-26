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

const getRandom = () => {

 return Math.floor(100000 + Math.random() * 900000);

};


export  {
    TypeOrmErrorFormatter,
    getRandom,

};

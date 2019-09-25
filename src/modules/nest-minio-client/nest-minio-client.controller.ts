import { Controller, Inject, Get } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nest-minio';

@Controller('nest-minio-client')
export class NestMinioClientController {
    constructor(@Inject(MINIO_CONNECTION) private readonly minioClient) {}

    @Get()
    index() {
        const file = '../../../../../Desktop/logo.png';

        const metadata = {
            'Content-Type': 'application/octet-stream',
            'X-Amz-Meta-Testing': 1234,
            'example': 5678,
        };

        this.minioClient.f(
            'gunners',
            'logo.png',
            file,
            metadata,
            // tslint:disable-next-line: only-arrow-functions
            function(err, etag) {
                if (err) {
                    return console.log(err);
                }
                console.log('File uploaded controller');
            },
        );
    }
}

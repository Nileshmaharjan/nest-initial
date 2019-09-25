import { Controller, Inject, Get } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nest-minio';

console.log(MINIO_CONNECTION);
@Controller('nest-minio-client')
export class NestMinioClientController {
    constructor(@Inject(MINIO_CONNECTION) private readonly minioClient) {}
    @Get()
    index() {
        const file = '/Users/nileshmaharjan/Downloads/nest-initial/dist/modules/nest-minio-client/logo.png';
        console.log(process.cwd())
        console.log(__dirname)
        // console.log(file);

        const metadata = {
            'Content-Type': 'application/octet-stream',
            'X-Amz-Meta-Testing': 1234,
            'example': 5678,
        };

        this.minioClient.fPutObject(
            'gunners',
            'logo.png',
            file,
            metadata,
            // tslint:disable-next-line: only-arrow-functions
            function(err, etag) {
                if (err) {
                    console.log('Error');
                    return console.log(err);
                }
                console.log('File uploaded controller');
            },
        );
    }
}

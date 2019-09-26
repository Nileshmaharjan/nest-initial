import { EntityRepository, Repository } from 'typeorm';
import { AppUser } from './app-user.entity';

@EntityRepository(AppUser)
export class AppUserRepository extends Repository<AppUser> {}

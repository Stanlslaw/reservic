import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserFavorite } from '../favorites/favorite.entity';
import { ServiceReview } from 'src/reviews/review.entity';
import { Provider } from 'src/providers/provider.entity';
import { Booking } from 'src/bookings/booking.entity';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  photo_url?: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ default: false })
  is_premium: boolean;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToOne(() => Provider, (provider) => provider.user)
  provider: Provider;

  @OneToMany(() => UserFavorite, (favorite) => favorite.user)
  favorites: UserFavorite[];

  @OneToMany(() => ServiceReview, (serviceReviews) => serviceReviews.user)
  reviews: ServiceReview[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

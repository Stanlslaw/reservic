import { Service } from 'src/services/service.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  booking_time: number;

  @ManyToOne(() => Service, (service) => service.bookings)
  @JoinColumn()
  service: Service;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('site_settings')
export class SiteSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, default: 'Smart Salon' })
  brand_name: string;

  @Column({ type: 'varchar', length: 20, default: '#f59e0b' })
  theme_color: string;

  @Column({ type: 'text', nullable: true })
  logo_url: string;

  @Column({ type: 'varchar', length: 200, default: 'Đẹp Trai Tức Thì' })
  hero_title: string;

  @Column({ type: 'text', nullable: true })
  hero_subtitle: string;

  @Column({ type: 'text', nullable: true })
  hero_video_url: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  contact_hotline: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  social_facebook: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  social_tiktok: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  social_zalo: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}


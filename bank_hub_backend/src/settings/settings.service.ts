import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSettings } from '../entities/site-settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SiteSettings)
    private settingsRepository: Repository<SiteSettings>,
  ) {}

  async getSettings(): Promise<SiteSettings> {
    let settings = await this.settingsRepository.findOne({
      where: { id: 1 },
    });

    if (!settings) {
      // Create default settings if not exists
      settings = this.settingsRepository.create({
        brand_name: 'Smart Salon',
        theme_color: '#f59e0b',
        hero_title: 'Đẹp Trai Tức Thì',
      });
      settings = await this.settingsRepository.save(settings);
    }

    return settings;
  }
}


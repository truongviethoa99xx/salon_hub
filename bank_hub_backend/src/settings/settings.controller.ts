import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { SiteSettings } from '../entities/site-settings.entity';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy cấu hình branding và hero section' })
  @ApiResponse({ status: 200, description: 'Trả về cấu hình site', type: SiteSettings })
  async getSettings(): Promise<SiteSettings> {
    return this.settingsService.getSettings();
  }
}


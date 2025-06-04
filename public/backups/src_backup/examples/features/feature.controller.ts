import { Controller, Get } from '@/utils/core';
import { FeatureService } from './feature.service';

@Controller('/features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {
    console.log('FeatureController initialized');
  }

  @Get()
  async getFeatures() {
    const data = await this.featureService.getData();

    return {
      success: true,
      data,
      config: this.featureService.getConfig(),
    };
  }
}

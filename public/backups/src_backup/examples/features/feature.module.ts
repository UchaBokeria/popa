import { Module } from '@/utils/core';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { CONFIG_TOKEN } from './tokens';

// Example of a more complex module with custom providers
@Module({
  controllers: [FeatureController],
  providers: [
    // Class provider
    FeatureService,

    // Value provider
    {
      provide: CONFIG_TOKEN,
      useValue: {
        apiKey: 'example-api-key',
        endpoint: 'https://api.example.com',
        timeout: 5000,
      },
    },

    // Factory provider with dependencies
    {
      provide: 'API_CLIENT',
      useFactory: (config: any) => {
        return {
          request: async (path: string) => {
            console.log(`Making request to ${config.endpoint}${path}`);
            return { data: 'Example API response' };
          },
        };
      },
      inject: [CONFIG_TOKEN],
    },
  ],
  exports: [FeatureService],
})
export class FeatureModule {}

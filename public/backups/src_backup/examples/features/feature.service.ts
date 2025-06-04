import { Injectable, Inject } from '@/utils/di';
import { CONFIG_TOKEN } from './tokens';

interface Config {
  apiKey: string;
  endpoint: string;
  timeout: number;
}

@Injectable()
export class FeatureService {
  constructor(
    @Inject(CONFIG_TOKEN) private readonly config: Config,
    @Inject('API_CLIENT') private readonly apiClient: any
  ) {
    console.log('FeatureService initialized with config:', config);
  }

  async getData(): Promise<any> {
    // Use the injected API client
    return this.apiClient.request('/data');
  }

  getConfig(): Config {
    return this.config;
  }
} 
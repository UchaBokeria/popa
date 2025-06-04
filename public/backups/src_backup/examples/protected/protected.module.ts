import { Module } from '@/utils/core';
import { ProtectedController } from './protected.controller';

@Module({
  controllers: [ProtectedController],
})
export class ProtectedModule {}

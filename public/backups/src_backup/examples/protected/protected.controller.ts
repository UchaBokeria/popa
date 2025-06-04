import { Controller, Get, Post, UseGuards, Roles } from '@/utils/core';
import { AuthGuard } from '@/guards/auth.guard';
import { RolesGuard } from '@/guards/roles.guard';

/**
 * Controller with protected routes
 */
@Controller('/protected')
@UseGuards(AuthGuard) // Apply AuthGuard to all routes
export class ProtectedController {
  /**
   * Route accessible to any authenticated user
   */
  @Get()
  async getProtectedData() {
    return {
      success: true,
      message: 'You have access to protected data',
      data: {
        secret: 'This is protected information',
      },
    };
  }

  /**
   * Route that requires admin role
   * Uses both AuthGuard from controller level and RolesGuard at method level
   */
  @Get('/admin')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async getAdminData() {
    return {
      success: true,
      message: 'You have access to admin data',
      data: {
        adminSecret: 'This is admin-only information',
      },
    };
  }

  /**
   * Route with specific role requirements
   */
  @Post('/manage')
  @Roles('admin', 'manager')
  @UseGuards(RolesGuard)
  async manageData() {
    return {
      success: true,
      message: 'Data updated successfully',
      data: {
        updated: true,
        timestamp: new Date().toISOString(),
      },
    };
  }
}

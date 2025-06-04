import { Repository } from 'typeorm';
import { AppDataSource } from '../utils/database/database';
import { PurchaseEntity } from '../../entities/purchase.entity';
import { CreatePurchaseDto, PurchaseResponseDto } from '../../app/landing/dtos/purchase.dto';
import { plainToInstance } from 'class-transformer';

// Valid status values
type PurchaseStatus = 'pending' | 'completed' | 'failed';

export abstract class PaymentService {
    private static get purchaseRepository(): Repository<PurchaseEntity> {
        return AppDataSource.getRepository(PurchaseEntity);
    }

    // UC package options
    private static readonly ucPackages = [
        { id: 1, ucPoints: 60, amount: 0.99 },
        { id: 2, ucPoints: 300, amount: 4.99 },
        { id: 3, ucPoints: 600, amount: 9.99 },
        { id: 4, ucPoints: 1500, amount: 24.99 },
        { id: 5, ucPoints: 3000, amount: 49.99 },
        { id: 6, ucPoints: 6000, amount: 99.99 },
    ];

    static async getUcPackages() {
        return this.ucPackages;
    }

    static async validatePackage(ucPoints: number): Promise<boolean> {
        return this.ucPackages.some((pkg) => pkg.ucPoints === ucPoints);
    }

    static async getPackagePrice(ucPoints: number): Promise<number | null> {
        const pkg = this.ucPackages.find((pkg) => pkg.ucPoints === ucPoints);
        return pkg ? pkg.amount : null;
    }

    static async createPurchase(purchaseData: CreatePurchaseDto): Promise<PurchaseResponseDto> {
        // Validate the UC package
        if (!(await this.validatePackage(purchaseData.ucPoints))) {
            throw new Error('Invalid UC points package');
        }

        // Validate the amount
        const expectedAmount = await this.getPackagePrice(purchaseData.ucPoints);
        if (expectedAmount === null || purchaseData.amount !== expectedAmount) {
            throw new Error('Invalid amount for the selected UC package');
        }

        // Create purchase record with validated status
        const status: PurchaseStatus = (purchaseData.status as PurchaseStatus) || 'pending';
        if (status !== 'pending' && status !== 'completed' && status !== 'failed') {
            throw new Error('Invalid status value');
        }

        const purchaseEntity = {
            ...purchaseData,
            status,
        };

        const purchase = this.purchaseRepository.create(purchaseEntity);
        const savedPurchase = await this.purchaseRepository.save(purchase);

        return plainToInstance(PurchaseResponseDto, savedPurchase);
    }

    static async processPayment(purchaseId: string, paymentDetails: any): Promise<PurchaseResponseDto> {
        // Find purchase
        const purchase = await this.purchaseRepository.findOne({
            where: { id: purchaseId },
        });

        if (!purchase) {
            throw new Error('Purchase not found');
        }

        // In a real application, integrate with an actual payment gateway
        // This is a simplified mock implementation
        try {
            // Simulate payment processing
            const paymentId = `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            // Update purchase with payment info
            purchase.paymentId = paymentId;
            purchase.status = 'completed';

            const updatedPurchase = await this.purchaseRepository.save(purchase);
            return plainToInstance(PurchaseResponseDto, updatedPurchase);
        } catch (error) {
            // Update purchase as failed
            purchase.status = 'failed';
            await this.purchaseRepository.save(purchase);

            throw new Error('Payment processing failed');
        }
    }

    static async getUserPurchases(userId: string): Promise<PurchaseResponseDto[]> {
        const purchases = await this.purchaseRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });

        return plainToInstance(PurchaseResponseDto, purchases);
    }

    static async getPurchaseById(id: string): Promise<PurchaseResponseDto | null> {
        const purchase = await this.purchaseRepository.findOne({ where: { id } });
        if (!purchase) return null;

        return plainToInstance(PurchaseResponseDto, purchase);
    }
}

import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreatePurchaseDto {
  @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

  @IsNumber()
  @Min(0, { message: 'Amount must be at least 0' })
  amount: number;

  @IsNumber()
  ucPoints: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsString()
  paymentMethod: string;

  @IsOptional()
  @IsString()
  transactionId?: string;
}

export class UpdatePurchaseDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Amount must be at least 0' })
  amount?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  transactionId?: string;
}

@Exclude()
export class PurchaseResponseDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  productId: string;

  @Expose()
  quantity: number;

  @Expose()
  amount: number;

  @Expose()
  status: string;

  @Expose()
  paymentMethod: string;

  @Expose()
  transactionId?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<PurchaseResponseDto>) {
    Object.assign(this, partial);
  }
}

import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class AllParamsDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @IsNotEmpty({ message: 'inStock flag is required' })
  @IsBoolean({ message: 'inStock must be a boolean' })
  inStock: boolean;
}

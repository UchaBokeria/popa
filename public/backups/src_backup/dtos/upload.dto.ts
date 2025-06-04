import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}

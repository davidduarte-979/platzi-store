import { IsString, IsNumber, IsUrl, IsNotEmpty } from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}

export class UpdateProductDto {
  readonly name?: string;
  readonly description?: string;
  readonly stock?: number;
  readonly price?: number;
  readonly image?: string;
}

import { IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Order associated to this user' })
  readonly orderId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product associated to this user' })
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Quantity associated to this order' })
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}

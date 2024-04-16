export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly stock: number;
  readonly price: number;
  readonly image: string;
}

export class UpdateProductDto {
  readonly name?: string;
  readonly description?: string;
  readonly stock?: number;
  readonly price?: number;
  readonly image?: string;
}

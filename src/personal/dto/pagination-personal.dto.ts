import { IsOptional, IsNumber, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  page: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number;
}

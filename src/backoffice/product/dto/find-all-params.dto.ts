import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class FindAllParams {
  @ApiProperty()
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  page: number;

  @ApiProperty()
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  perPage: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty()
  @IsEnum(['name', 'createdAt', 'updatedAt', 'price'])
  @IsOptional()
  orderBy: string;

  @ApiProperty()
  @IsEnum(['asc', 'desc'])
  @IsOptional()
  sort: string;
}

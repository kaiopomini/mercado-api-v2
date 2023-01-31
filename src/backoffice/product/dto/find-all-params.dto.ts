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
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  page: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  perPage: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({ required: false })
  @IsEnum(['name', 'createdAt', 'updatedAt', 'price'])
  @IsOptional()
  orderBy: string;

  @ApiProperty({ required: false })
  @IsEnum(['asc', 'desc'])
  @IsOptional()
  sort: string;
}

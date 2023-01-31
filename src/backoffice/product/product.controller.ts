import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto, CreateProductDto, FindAllParams } from './dto';
import { HttpCode, UseGuards } from '@nestjs/common/decorators';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { HasRoles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.MODERATOR)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.MODERATOR)
  @HttpCode(HttpStatus.OK)
  findAll(@Query() params: FindAllParams) {
    return this.productService.findAll(params);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.MODERATOR)
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.MODERATOR)
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.MODERATOR)
  @HttpCode(HttpStatus.CREATED)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}

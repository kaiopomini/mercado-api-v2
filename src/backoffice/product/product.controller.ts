import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto, CreateProductDto, FindAllParams } from './dto';
import { HttpCode, UseGuards } from '@nestjs/common/decorators';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { HasRoles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FormatResponseInterceptor } from 'src/common/interceptors/format-response.interceptor';

@ApiTags('backoffice/product')
@Controller('backoffice/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.MODERATOR)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FormatResponseInterceptor)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.MODERATOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FormatResponseInterceptor)
  findAll(@Query() params: FindAllParams) {
    return this.productService.findAll(params);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.MODERATOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FormatResponseInterceptor)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.MODERATOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FormatResponseInterceptor)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.MODERATOR)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FormatResponseInterceptor)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}

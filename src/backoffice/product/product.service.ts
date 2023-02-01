import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllParams } from './dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        barcode: createProductDto.barcode,
      },
    });

    if (product) {
      throw new BadRequestException('Product already exists');
    }

    const newProduct = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        basePrice: createProductDto.basePrice,
        quantity: createProductDto.quantity,
        quantityType: createProductDto.quantityType,
        controlledInventory: createProductDto.controlledInventory,
        active: createProductDto.active,
        barcode: createProductDto.barcode,
        image: createProductDto.image,
      },
    });

    return { data: newProduct };
  }

  async findAll(params: FindAllParams) {
    const {
      page = 1,
      perPage = 10,
      search,
      orderBy = 'name',
      sort = 'asc',
    } = params;

    const skip = page * perPage - perPage;
    const take = perPage;
    const result = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip,
        take,
        where: {
          OR: [
            {
              barcode: {
                equals: search,
              },
            },
            {
              name: {
                contains: search,
              },
            },
            {
              name: {
                startsWith: search,
              },
            },
            {
              name: {
                endsWith: search,
              },
            },
          ],
        },
        orderBy: [
          {
            [`${orderBy}`]: sort,
          },
        ],
      }),

      this.prisma.product.count({
        where: {
          OR: [
            {
              barcode: {
                equals: search,
              },
            },
            {
              name: {
                contains: search,
              },
            },
            {
              name: {
                startsWith: search,
              },
            },
            {
              name: {
                endsWith: search,
              },
            },
          ],
        },
      }),
    ]);

    const [products, total] = result;

    const lastPage = Math.ceil(total / perPage) || 1;
    const data = {
      data: products,
      meta: {
        total,
        page,
        perPage,
        lastPage,
      },
    };
    return data;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new NotFoundException();
    }

    return { data: product };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productBarcode = await this.prisma.product.findUnique({
      where: {
        barcode: updateProductDto.barcode,
      },
    });

    if (productBarcode && productBarcode.id !== id) {
      throw new BadRequestException('Product barcode already exists');
    }

    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new NotFoundException();
    }

    const updateProduct = await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...updateProductDto,
      },
    });

    return { data: updateProduct };
  }

  async remove(id: string) {
    const foundProduct = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!foundProduct) {
      throw new NotFoundException();
    }

    await this.prisma.product.delete({
      where: {
        id: id,
      },
    });

    return;
  }
}

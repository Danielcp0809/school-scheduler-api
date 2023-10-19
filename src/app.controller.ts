import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('products/filter')
  // getProductsFilter(): string {
  //   return `Filter Products`;
  // }

  // @Get('products/:id')
  // getProduct(@Param('id') id: string): string {
  //   return `Product ${id}`;
  // }
  
  // @Get('products')
  // getListProducts(@Query() params: any): string {
  //   return `List Products ${params.page} ${params.limit}`;
  // }
}

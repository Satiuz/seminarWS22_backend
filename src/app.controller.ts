import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Todo } from './todo.schema';
import { AppService } from './app.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { FindTodoParam } from './dto/find-todo-param.dto';

@ApiTags('TODO')
@Controller('todo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createEntry(@Body() createProductDto: CreateTodoDto): Promise<Todo> {
    return this.appService.create(createProductDto);
  }
  
  @Get()
  async getList(): Promise<Todo[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  async getEntry(@Param() params: FindTodoParam): Promise<Todo> {
    return this.appService.findOne(params.id);
  }

  @Patch(':id')
  async updateEntry(
    @Param() params: FindTodoParam,
    @Body() updateProductDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.appService.updateOne(params.id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param() params: FindTodoParam): Promise<Todo> {
    return this.appService.deleteOne(params.id);
  }
}

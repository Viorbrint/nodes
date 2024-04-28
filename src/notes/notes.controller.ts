import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Note } from './entities/note.entity';
import {
  FilteringOptions,
  FilteringParams,
} from 'src/complex-prisma-query/decorators/filtering-params.decorator';
import {
  PaginationParams,
  PaginationOptions,
} from 'src/complex-prisma-query/decorators/pagination-params.decorator';
import {
  SortingParams,
  SortingOptions,
} from 'src/complex-prisma-query/decorators/sorting-params.decorator';
import {
  SearchingOptions,
  SearchingParams,
} from 'src/complex-prisma-query/decorators/searching-params.decorator';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({ status: 201, type: Note })
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @ApiResponse({ status: 200, type: [Note] })
  @ApiOperation({ summary: 'Getting a list of notes' })
  @ApiQuery({ name: 'page', example: 1 })
  @ApiQuery({ name: 'limit', example: 5, description: 'maximum: 100' })
  @ApiQuery({
    name: 'sort',
    example: 'createdAt:desc',
    required: false,
    description: 'property:asc|desc',
  })
  @ApiQuery({
    name: 'filter',
    example: 'location:equals:home',
    required: false,
    description: 'property:rule:value',
  })
  @ApiQuery({
    name: 'search',
    example: 'name:list',
    required: false,
    description: 'property:searchString',
  })
  @Get()
  async findAll(
    @PaginationParams()
    pagination: PaginationOptions,
    @SortingParams(['name', 'createdAt', 'location'])
    sorting: SortingOptions,
    @FilteringParams(['name', 'createdAt', 'location'])
    filtering: FilteringOptions,
    @SearchingParams(['name', 'location', 'content'])
    searching: SearchingOptions,
  ) {
    const response = await this.notesService.findAll({
      pagination,
      sorting,
      filtering,
      searching,
    });

    if (!response.data.length) {
      throw new NotFoundException(`No notes found matching your request.`);
    }

    return response;
  }

  @ApiResponse({ status: 200, type: Note })
  @ApiOperation({ summary: 'Receiving a note by its ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const note = await this.notesService.findOne(id);
    if (!note) {
      throw new NotFoundException(`Note with id = ${id} does not exist.`);
    }
    return note;
  }

  @ApiResponse({ status: 200, type: Note })
  @ApiOperation({ summary: 'Change information about an existing note' })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    try {
      const note = await this.notesService.update(id, updateNoteDto);
      return note;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException(`Note with id = ${id} does not exist.`);
      } else {
        throw error;
      }
    }
  }

  @ApiResponse({ status: 200, type: Note })
  @ApiOperation({ summary: 'Deleting a note' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const note = await this.notesService.remove(id);
      return note;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException(`Note with id = ${id} does not exist.`);
      } else {
        throw error;
      }
    }
  }
}

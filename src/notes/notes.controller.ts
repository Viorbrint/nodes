import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
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
  findAll(
    @PaginationParams()
    pagination: PaginationOptions,
    @SortingParams(['name', 'createdAt', 'location'])
    sorting: SortingOptions,
    @FilteringParams(['name', 'createdAt', 'location'])
    filtering: FilteringOptions,
    @SearchingParams(['name', 'location', 'content'])
    searching: SearchingOptions,
  ) {
    return this.notesService.findAll({
      pagination,
      sorting,
      filtering,
      searching,
    });
  }

  @ApiResponse({ status: 200, type: Note })
  @ApiOperation({ summary: 'Receiving a note by its ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.findOne(id);
  }

  @ApiResponse({ status: 200, type: Note })
  @ApiOperation({ summary: 'Change information about an existing note' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, updateNoteDto);
  }

  @ApiResponse({ status: 200, type: Note })
  @ApiOperation({ summary: 'Deleting a note' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.remove(id);
  }
}

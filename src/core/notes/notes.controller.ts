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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Note } from './entities/note.entity';
import { FilteringParams } from '@common/decorators/requests/filtering-params.decorator';
import { GetUser } from '@common/decorators/requests/get-user.decorator';
import { FilteringOptions } from '@common/interfaces/filtering-options.interface';
import { PaginationParams } from '@common/decorators/requests/pagination-params.decorator';
import { SearchingParams } from '@common/decorators/requests/searching-params.decorator';
import { SortingParams } from '@common/decorators/requests/sorting-params.decorator';
import { PaginationOptions } from '@common/interfaces/pagination-options.interface';
import { SearchingOptions } from '@common/interfaces/searching-options.interface';
import { SortingOptions } from '@common/interfaces/sorting-options.interface';
import { sortingFields } from './complexQueryFields/sorting-fields';
import { searchingFields } from './complexQueryFields/searching-fields';
import { filteringFields } from './complexQueryFields/filtering-fields';

@ApiBearerAuth()
@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({ summary: 'Create a new note' })
  @ApiCreatedResponse({ type: Note, description: 'Created' })
  @Post()
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @GetUser('id') userId: number,
  ) {
    return this.notesService.create(createNoteDto, userId);
  }

  @ApiOkResponse({ type: [Note], description: 'Found' })
  @ApiOperation({ summary: 'Getting a list of notes' })
  @ApiQuery({ name: 'page', example: 1 })
  @ApiQuery({ name: 'limit', example: 5, description: 'maximum: 100' })
  @ApiQuery({
    name: 'sort',
    example: 'createdAt|:desc',
    required: false,
    description: '(name|createdAt|location):(asc|desc)',
  })
  @ApiQuery({
    name: 'filter',
    example: 'location:equals:home',
    required: false,
    description: '(name|createdAt|location):(equals|not|gt|gte|lt|lte):value',
  })
  @ApiQuery({
    name: 'search',
    example: 'name:list',
    required: false,
    description: '(name|location|content):searchString',
  })
  @Get()
  async findAll(
    @PaginationParams()
    pagination: PaginationOptions,
    @SortingParams<Note>(sortingFields)
    sorting: SortingOptions,
    @FilteringParams<Note>(filteringFields)
    filtering: FilteringOptions,
    @SearchingParams<Note>(searchingFields)
    searching: SearchingOptions,
    @GetUser('id')
    userId: number,
  ) {
    return this.notesService.findAll(
      {
        pagination,
        sorting,
        filtering,
        searching,
      },
      userId,
    );
  }

  @ApiOkResponse({ type: Note, description: 'Found' })
  @ApiOperation({ summary: 'Receiving a note by its ID' })
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
  ) {
    return this.notesService.findOne(id, userId);
  }

  @ApiOkResponse({ type: Note, description: 'Updated' })
  @ApiOperation({ summary: 'Change information about an existing note' })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
    @GetUser('id') userId: number,
  ) {
    return this.notesService.update(id, updateNoteDto, userId);
  }

  @ApiOkResponse({ type: Note, description: 'Deleted' })
  @ApiOperation({ summary: 'Deleting a note' })
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
  ) {
    return this.notesService.remove(id, userId);
  }
}

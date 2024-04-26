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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Note } from './entities/note.entity';

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
  @Get()
  findAll() {
    return this.notesService.findAll();
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

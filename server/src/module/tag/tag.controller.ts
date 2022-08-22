import { Controller, Get, Param } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('/tag')
@ApiTags('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Public()
  @Get('/:name')
  async getTagByName(@Param('name') name: string) {
    return await this.tagService.getTagByName(name);
  }
}

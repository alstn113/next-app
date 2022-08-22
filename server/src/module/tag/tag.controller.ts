import { Controller } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/tag')
@ApiTags('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
}

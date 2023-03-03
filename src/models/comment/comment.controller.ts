import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entitty';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly comment: CommentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all comments successfully.')
  @ApiOperation({ summary: 'Get all comments.' })
  async getAllComment(): Promise<Comment[]> {
    return await this.comment.getAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get comment successfully.')
  @ApiOperation({ summary: 'Get comment' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Comment ID',
    example: 33,
  })
  async getComment(@Param('id', ParseIntPipe) commentId: number): Promise<any> {
    return await this.comment.get(commentId);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Comment deleted successfully.')
  @ApiOperation({ summary: 'Delete comment' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Comment ID',
    example: 33,
  })
  async deleteComment(
    @Param('id', ParseIntPipe) commentId: number,
  ): Promise<any> {
    return await this.comment.remove(commentId);
  }
}

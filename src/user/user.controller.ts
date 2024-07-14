import { Controller, Get, HttpStatus, Logger, Post, UseFilters, Body, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpErrorFilter } from 'src/utils/http-exception.filter';
import { IUser } from 'src/types/IUser';
import { IResponse } from 'src/types/IResponse';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/utils/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new HttpErrorFilter)
  @UseInterceptors(NoFilesInterceptor())
  async createUser(
    @Body() user: IUser
  ): Promise<IResponse<string>> {
    Logger.log(user);
    return {
      statusCode: HttpStatus.OK,
      message: "OK",
      result: await this.userService.createUser(user)
    }
  }

  @Get('/all') // DELETE ON PROD
  @UseFilters(new HttpErrorFilter)
  async getUsers(): Promise<IResponse<IUser[]>> {
    return {
      statusCode: HttpStatus.OK,
      message: "OK",
      result: await this.userService.getUsers()
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(new HttpErrorFilter())
  @Get()
  async getUser(@Request() req): Promise<IResponse<IUser>> {
    const data = await this.userService.getUserByLogin(req.user.login);
    delete data.password;
    return {
      statusCode: HttpStatus.OK,
      message: "OK",
      result: data
    }
  }

}

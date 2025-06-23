import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import {
  CreateServiceDto,
  DeleteServiceDto,
  GetServicesQueryDto,
  ServiceDto,
  ServiceWithProviderAndReviewsDto,
  UpdateServiceDto,
} from './service.entity';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { plainToInstance } from 'class-transformer';

@ApiSecurity('tma-auth')
@UseGuards(AuthGuard)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiOkResponse({ type: [ServiceDto] })
  @Get('/')
  async getServices(@Query() query: GetServicesQueryDto) {
    console.log(query);
    return await this.servicesService.getServices(query);
  }

  @ApiOkResponse({ type: ServiceWithProviderAndReviewsDto })
  @Get('/:serviceId')
  async getService(@Param('serviceId') serviceId: number) {
    console.log(serviceId);
    return this.servicesService.getService(+serviceId);
  }

  @Post('/create')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/service_image',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: ServiceDto })
  async createService(
    @Body() data: { serviceData: CreateServiceDto },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const { serviceData } = data;
    const parsedData =
      typeof serviceData === 'string' ? JSON.parse(serviceData) : serviceData;

    if (typeof parsedData.days_of_week === 'string') {
      parsedData.days_of_week = JSON.parse(parsedData.days_of_week);
    }
    console.log(parsedData);
    const dto = plainToInstance(CreateServiceDto, parsedData);

    if (file) {
      dto.photo_url = file.path;
    }

    return await this.servicesService.createService(dto);
  }

  @ApiOkResponse({ type: ServiceDto })
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/service_image',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @Post('/update')
  async updateService(
    @Body() data: { serviceData: UpdateServiceDto },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const { serviceData } = data;
    const parsedData =
      typeof serviceData === 'string' ? JSON.parse(serviceData) : serviceData;

    if (typeof parsedData.days_of_week === 'string') {
      parsedData.days_of_week = JSON.parse(parsedData.days_of_week);
    }
    console.log(parsedData);
    const dto = plainToInstance(UpdateServiceDto, parsedData);

    if (file) {
      dto.photo_url = file.path;
    }

    return await this.servicesService.updateService(dto);
  }

  @ApiOkResponse({ type: ServiceDto })
  @Post('/delete')
  async deleteService(@Body() serviceData: DeleteServiceDto) {
    return await this.servicesService.deleteService(serviceData);
  }
}

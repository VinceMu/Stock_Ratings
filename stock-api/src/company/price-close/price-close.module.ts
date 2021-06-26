import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceCloseController } from './price-close.controller';
import { PriceClose } from './price-close.entity';
import { PriceCloseService } from './price-close.service';

@Module({
    imports: [TypeOrmModule.forFeature([PriceClose])],
    providers: [PriceCloseService],
    controllers: [PriceCloseController],
    exports: [PriceCloseService]
})
export class PriceCloseModule { }
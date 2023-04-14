import { Module } from '@nestjs/common';
import { GameController } from './games.controller';

@Module({
  imports: [],
  controllers: [GameController],
})
export class AppModule {}

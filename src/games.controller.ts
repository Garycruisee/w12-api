import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { GameInput } from './dto/game.dto';

export type Game = {
  id: number;
  title: string;
  genre: string[];
  rating: number;
  price: number;
};

@Controller('games')
export class GameController {
  games: Game[];

  constructor() {
    this.games = [
      {
        id: 1,
        title: 'Stardew Valley',
        genre: ['Simulation', 'Role-Playing', 'Farm'],
        rating: 9.5,
        price: 7.49,
      },
      {
        id: 2,
        title: 'Fallout 4',
        genre: ['Action', 'Role-Playing', 'Fps'],
        rating: 8.4,
        price: 79.99,
      },
    ];
  }

  //Get Games
  @Get()
  getAllGames() {
    return this.games;
  }

  //Get Games by id
  @Get(':id')
  getGamesById(@Param('id') id: number) {
    const game = this.games.find((game: Game) => game.id == id);

    if (!game) {
      throw new NotFoundException(`Game with id: ${id} does not exist`);
    }

    return game;
  }

  //Post Games
  @Post()
  createGame(@Body() input: GameInput) {
    const newId = this.games[this.games.length - 1].id;
    const newGame = {
      id: newId + 1,
      title: input.title,
      genre: input.genre,
      rating: input.rating,
      price: input.price,
    };

    this.games.push(newGame);
    return newGame;
  }

  //Delete Games
  @Delete(':id')
  deleteGame(@Param('id') id: number) {
    const gameIndex = this.games.findIndex((game: Game) => game.id == id);

    if (gameIndex == -1) {
      throw new NotFoundException(`Game with id: ${id} does not exist`);
    }

    this.games.splice(gameIndex, 1);

    return {
      message: `Game with id: ${id} has been successfully deleted`,
    };
  }

  // PUT Games by id
  @Put(':id')
  updateGame(@Param('id') id: number, @Body() input: GameInput) {
    const gameIndex = this.games.findIndex((game: Game) => game.id == id);

    if (gameIndex == -1) {
      throw new NotFoundException(`Game with id: ${id} does not exist`);
    }

    const game = this.games[gameIndex];

    this.games[gameIndex] = {
      id: game.id,
      title: input.title,
      genre: input.genre,
      rating: input.rating,
      price: input.price,
    };

    return this.games[gameIndex];
  }

  @Patch(':id')
  patchGame(@Param('id') id: number, @Body() input: GameInput) {
    const gameIndex = this.games.findIndex((game: Game) => game.id == id);

    if (gameIndex == -1) {
      throw new NotFoundException(`Game with id: ${id} does not exist`);
    }

    const game = this.games[gameIndex];

    this.games[gameIndex] = {
      id: game.id,
      title: input.title || game.title,
      genre: input.genre || game.genre,
      rating: input.rating || game.rating,
      price: input.price || game.price,
    };

    return this.games[gameIndex];
  }
}

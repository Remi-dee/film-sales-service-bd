import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './schema/film.schema';

@Injectable()
export class FilmService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  // Create a new film
  async create(filmData: any): Promise<Film> {
    const film = new this.filmModel(filmData);
    return await film.save();
  }

  // Get all films
  async findAll(): Promise<Film[]> {
    return await this.filmModel.find().exec();
  }

  // Get a film by ID
  async findOne(id: string): Promise<Film> {
    return await this.filmModel.findById(id).exec();
  }

  // Update a film by ID
  async update(id: string, filmData: any): Promise<Film> {
    return await this.filmModel.findByIdAndUpdate(id, filmData, { new: true });
  }

  // Delete a film by ID
  async delete(id: string): Promise<Film> {
    return await this.filmModel.findByIdAndDelete(id);
  }
}

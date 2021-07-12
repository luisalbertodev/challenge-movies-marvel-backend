import { Schema, model, Types } from 'mongoose';

export interface IMovie {
  id: string;
  title: string;
  release_date?: string;
  duration: number;
  overview?: string;
  cover_url?: string;
  trailer_url?: string;
  directed_by: string;
  phase?: number;
  saga?: string;
  chronology?: number;
  post_credit_scenes: number;
}

export interface IJsonMovies {
  data: IMovie[];
  total: number;
}

const movieSchema = new Schema({
  _id: Types.ObjectId,
  title: String,
  release_date: String,
  duration: Number,
  overview: String,
  cover_url: String,
  trailer_url: String,
  directed_by: String,
  phase: Number,
  saga: String,
  chronology: Number,
  post_credit_scenes: Number
});

export default model('Movie', movieSchema);

import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@typesProject/http';
import Movie, { IMovie } from '@api/models/movie';
import APIError from '@api/utils/APIError';

/**
 * Returns array of object type movies
 * @public
 */
export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Movie.find().select('-__v').exec();
    res.status(HttpStatusCode.OK);

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns array of object type movies
 * @public
 */
export const addManyMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!Array.isArray(req.body)) {
      const dataNotValidate = new APIError({
        message: 'data not validate with Schema',
        status: HttpStatusCode.CONFLICT
      });
      next(dataNotValidate);
    }

    const movies: Partial<IMovie[]> = req.body.map(({ id, ...rest }: any) => ({ ...rest }));
    const result = await Movie.insertMany(movies);
    res.status(HttpStatusCode.CREATED);

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns array of object type movies
 * @public
 */
export const getMoviesByPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perPage = 10;
    const { page = 1 }: { page?: number } = req.params;
    const result = await Movie.find() // finding all documents
      .skip(perPage * page - perPage) // in the first page the value of the skip is 0
      .limit(perPage) // output just 10 items
      .sort({ chronology: -1 }) // sort data by chronology
      .select('-__v')
      .exec();

    return res.status(HttpStatusCode.OK).json({
      dataSource: result,
      metadata: {
        documents: await Movie.countDocuments()
      }
    });
  } catch (error) {
    return next(error);
  }
};

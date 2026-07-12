import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import RsaManager from 'src/config/RsaManager';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid or expired token',
        data: undefined,
      });
      return;
    }

    const token = authHeader.slice(7);

    try {
      jwt.verify(token, RsaManager.getPublicKey(), {
        algorithms: ['RS256'],
      });
      next();
    } catch {
      res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid or expired token',
        data: undefined,
      });
    }
  }
}

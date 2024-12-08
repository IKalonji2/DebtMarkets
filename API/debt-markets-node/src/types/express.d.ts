import * as express from "express";

declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      name: string;
      email: string;
      role: string;
      [key: string]: any;
    };
  }
}

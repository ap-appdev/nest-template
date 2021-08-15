import { Response as Res } from 'express';

export interface Response extends Res {
  body: any;
}

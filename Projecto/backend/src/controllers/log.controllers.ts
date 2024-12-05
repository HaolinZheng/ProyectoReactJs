import { Request, Response } from 'express';

async function haveCookie(req: Request, res: Response) {

  if(req.cookies.access_token !== null) {
    res.send(true);
  }
  else res.send(false);
}

export { haveCookie };

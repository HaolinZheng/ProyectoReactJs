import { Request, Response } from 'express';

async function isLoged(req: Request, res: Response) {  
  const token = req.cookies.access_token;
  token ? res.send(true) : res.send(false);
}

async function logOut(req: Request, res: Response) {  
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.send({ message: 'User is not logged' });
}

export { isLoged, logOut };

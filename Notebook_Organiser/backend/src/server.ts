import express, { ErrorRequestHandler, NextFunction, Request, Response, json } from 'express'
import { my_route } from './router/notebook.router';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors())
app.use("/notebooks", my_route);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  
  res.json({
    error: err.message
  });

});

let PORT = 5303;

app.listen(5303, () => {
  console.log(`Server is running on port: ${PORT}`);
  
});
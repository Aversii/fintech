import express,{NextFunction, Request,Response} from "express";
import cors from "cors";
import { AddressInfo } from "net";

const app = express();

app.use(express.json());
app.use(cors());


 app.use((err: Error, req: Request, res: Response, next: NextFunction):any=> {
   console.error(err.stack); // Log do erro
   res.status(500).json({
     error: err.message || 'Internal Server Error',
   });
 });

const server = app.listen(process.env.PORT || 3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
   } else {
      console.error(`Failure upon starting server.`);
   }; 
});

export default app
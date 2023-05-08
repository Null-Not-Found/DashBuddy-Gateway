// Importing module
import express, { Application, Request, Response } from 'express';

const bp = require('body-parser');
const app: Application = express();
const PORT: Number =  Number(process.env.PORT) || 3005;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/a', (req: Request, res: Response) => {
	res.status(200).json({
		"Time": new Date().toUTCString(),
		"response": "b",
	});
})

app.listen(PORT, () => {
	console.log('The application is listening '
		+ 'on port http://localhost:' + PORT);
})

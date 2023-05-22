// Importing module
import express, { Application, Request, Response } from 'express';

const bp = require('body-parser');
const app: Application = express();
const PORT: Number =  Number(process.env.PORT) || 3005;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

async function getMicroservice(microserviceName: string): Promise<string> {
	const DNS = "http://127.0.0.1:3001/get/"
	let dnsCall = DNS.concat(microserviceName)
	console.log(dnsCall)
	fetch(dnsCall).then(response => response.json()).then(data => {
		return data.data
	  }).catch(error => {
		return "Network Failure"
	})
	return ""
}

app.get('/a', (req: Request, res: Response) => {
	res.status(200).json({
		"Time": new Date().toUTCString(),
		"response": "b",
	});
})

app.get('/state', async (req: Request, res: Response) => {
	let microserviceIP = await getMicroservice("state")
	//fetch(microserviceIP).then().then().catch()
	res.status(200).json({
		"Time": new Date().toUTCString(),
		"response": "b",
	});
})

app.listen(PORT, () => {
	console.log('The application is listening '
		+ 'on port http://localhost:' + PORT);
})

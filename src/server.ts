// Importing module
import express, { Application, Request, Response } from 'express';
import 'dotenv/config'
import { stringify } from 'querystring';

const bp = require('body-parser');
const app: Application = express();
const PORT: Number =  Number(process.env.PORT) || 3005;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

async function getMicroservice(microserviceName: string): Promise<string> {
	const DNS = "http://127.0.0.1:3001/get/"
	let dnsCall = DNS.concat(microserviceName)
	let result = fetch(dnsCall).then(response => response.json()).then(data => {
		return data.data
	  }).catch(error => {
		return "Network Failure"
	})
	return result
}

app.get('/a', (req: Request, res: Response) => {
	res.status(200).json({
		"Time": new Date().toUTCString(),
		"response": "b"
	});
})

//State 
app.get('/state/:DId', async (req: Request<{ DId: String }>, res: Response) => {
	let microserviceIP = await getMicroservice("state")
	console.log("get microserviceIP: " + microserviceIP)
	await fetch(microserviceIP + "/get/" + req.params.DId).then(response => response.json()).then(data => {
		res.status(200).json({
			"Time": new Date().toUTCString(),
			"response": data.data
		});
	}).catch(error => {
		console.log(error);
		res.status(502).json({
			"Time": new Date().toUTCString(),
			"response": "https://tenor.com/view/shits-fucked-gif-25512725"
		});
	})
})

app.post('/state', async (req: Request, res: Response) => {
	let microserviceIP = await getMicroservice("state")
	console.log("get microserviceIP: " + microserviceIP)
	await fetch(microserviceIP + "/post", {method: "POST"}).then(response => response.json()).then(data => {
		res.status(200).json({
			"Time": new Date().toUTCString(),
			"response": data.DId
		});
	}).catch(error => {
		console.log(error);
		res.status(502).json({
			"Time": new Date().toUTCString(),
			"response": "https://tenor.com/view/shits-fucked-gif-25512725"
		});
	})
})

app.put('/state/:DId', async (req: Request<{ DId: String }>, res: Response) => {
	let microserviceIP = await getMicroservice("state")
	console.log("get microserviceIP: " + microserviceIP)
	await fetch(
		microserviceIP + "/put/" + req.params.DId, {
			method: "PUT",  headers: { "Content-Type": "application/json" }, 
			body: JSON.stringify(req.body)
		}
	).then(response => response.json()).then(data => {
		res.status(200).json({
			"Time": new Date().toUTCString(),
			"response": data.Status
		});
	}).catch(error => {
		console.log(error);
		res.status(502).json({
			"Time": new Date().toUTCString(),
			"response": "https://tenor.com/view/shits-fucked-gif-25512725"
		});
	})
})

//GraphQL

app.post('/GrapQL', async (req: Request, res: Response) => {
	let microserviceIP = await getMicroservice("data")
	console.log("get microserviceIP: " + microserviceIP)
	await fetch(microserviceIP + "/GraphQl", {headers: {'Content-Type': 'application/json'}, method: "POST", body: req.body}).then(response => response.json()).then(data => {
		res.status(200).json({
			"Time": new Date().toUTCString(),
			"response": JSON.stringify(data)
		});
	}).catch(error => {
		console.log(error);
		res.status(502).json({
			"Time": new Date().toUTCString(),
			"response": "https://tenor.com/view/shits-fucked-gif-25512725"
		});
	})
})

app.listen(PORT, () => {
	console.log('The application is listening '
		+ 'on port http://localhost:' + PORT);
})

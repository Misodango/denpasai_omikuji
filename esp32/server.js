const axios = require('axios')
const { SerialPort } = require('serialport')

require('dotenv').config();

const apiKey = process.env.API_KEY;
var number = 4;

var jsonData;

const prompt = `あなたは神です．高専での文化祭での出し物でおみくじを作っています．
次の例にならって，おみくじを出力してください.JSONは{から初めて，\`を含まないでください．
{
	"運勢": "",
	"助言": "",
	"願事": "",
	"恋愛": "",
	"待人": "",
	"商売": "",
	"旅立": "",
	"学問": "",
	"病気": "",
	"開運物": "",
	"開運色": ""
}
また，ランダムに整数を1から6で一つ与えるので，数値が大きいほど高い運勢のおみくじを一つ返してください．
ただし，運勢には良い順に大吉，吉，中吉，小吉，末吉，凶，大凶があります．それぞれの運勢にあった助言や内容を考えてください．
数値：${number}
高専は技術オタクが集まった学校なので，GEEKが喜びそうな内容にしてください．例えばプログラミングや，電気回路,電磁気学などの話を盛り込んでください．
`
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(apiKey);

async function run(_prompt) {
	// For text-only input, use the gemini-pro model
	const model = genAI.getGenerativeModel({ model: "gemini-pro" });

	const prompt = _prompt;

	const result = await model.generateContent(prompt);
	const response = result.response;
	const text = response.text();
	return text;
}

// run(prompt).then((res) => console.log(res));

module.exports = { run };

const port = new SerialPort({
	path: 'COM6',  // This may vary depending on how WSL recognizes the device
	baudRate: 115200,
})
SerialPort.list().then(
	(ports) => console.log(ports),
	(err) => console.error(err)
)
// const port = new SerialPort('COM6');


port.on('data', (data) => {
	number = data.toString()[0];
	console.log('Received:', data.toString(), number);
	if(number > 0) {
		run(prompt).then((res) => {
		console.log(res, typeof(res));
		jsonData = res;
		sendData();
	})
	}
});

async function sendData() {
  try {
    const response = await axios.post('http://localhost:5000/receive-data', JSON.parse(jsonData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Data sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending data:', error);
  }
}


// sendData();

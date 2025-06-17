require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();
const port = 4000;
const morgan = require("morgan");
app.use(morgan("common"));
app.use(cors());
app.use(express.json());
const crypto = require('crypto');
app.get("/", (req, res) => {
  res.send("Server is running");
});
function generateSumsubSignature(secret, ts, method, path, body) {
  const signatureString = ts + method + path + body;
  return crypto.createHmac('sha256', secret).update(signatureString).digest('hex');
}
app.get("/generate-token", (req, res) => {
    const ts = Math.floor(Date.now() / 1000).toString();
    const method = "POST";
    const path = "/resources/accessTokens/sdk";
    const url = "https://api.sumsub.com/resources/accessTokens/sdk";
    const body= JSON.stringify({
      ttlInSecs: 600,
      userId: "shazzad2423",
      levelName: "idv-and-phone-verification",
    })
    const sig = generateSumsubSignature(process.env.SECRET, ts, method, path, body);
    const options = {
      method: method,
      headers: {
        "content-type": "application/json",
        "X-App-Token":
          "sbx:2ojMhCvDo4u1kESIvsbKcNcP.zTcQT0DU1mixwZyuRAcrGgz7xf1khGxR",
        "X-App-Access-Sig": sig,
        "X-App-Access-Ts": ts,
      },
      body: body,
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        return res.status(200).send({...json})
      })
      .catch((error) => {
          console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
      });

});


app.post('/sub-sum-result',async(req,res)=>{

  console.log({body: req.body});
  const { type, reviewResult, reviewStatus, externalUserId}= req.body;
 if(type==='applicantReviewed' && reviewStatus==='completed' && reviewResult.reviewAnswer==='GREEN') {
  //update the kyc status for user in database with the value of externalUserId
  console.log('=> update the kyc status for user in database of externalUserId : ${externalUserId} with mongoose ObjectId')
  
 }

  return res.status(200).send({message:'received'})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

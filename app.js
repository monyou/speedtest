const express = require("express");

const app = express();
const port = 3010;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    const userIpAddress =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    try {
        const ipInfoResponse = await fetch(
            `https://ipinfo.io/${userIpAddress}?token=a48e222468f7d9`
        );
        const ipInfo = await ipInfoResponse.json();
        const { ip, org, country } = ipInfo;

        res.render("index", { ip, isp: org, country });
    } catch (error) {
        res.render("index", {
            ip: "Unknown",
            isp: "Unknown",
            country: "Unknown",
        });
    }
});

app.listen(port);

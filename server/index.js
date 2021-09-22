const express = require("express");
const { renderToString } = require("react-dom/server");
const fs = require("fs");
const path = require("path");
const htmlTemplate = fs.readFileSync(
  path.join(__dirname, "../dist/index.html"),
  "utf-8"
);

const server = (port) => {
  const app = express();
  app.use(express.static("dist"));
  app.get("*", (req, res) => {
    // 路由建议是例如/search，不带二级目录的。
    const pageName = req.path.split("/")[1];

    if (pageName === "favicon.ico") {
      fs.readFileSync(path.join(__dirname, `../favicon.ico`));
      res.status(200).send();
    } else {
      try {
        const template = require(`../dist/${pageName}.js`).default;

        console.log(template);
        const html = renderMarkUp(renderToString(template));

        res.status(200).send(html);
      } catch (err) {
        console.log("error:", err);
        if (err.message.indexOf("no such file or directory") > -1) {
          console.log("file is no found!");
        }
      }
    }

    // 请求数据时，路由前面加一个api，表示是在请求数据
  });

  app.listen(port, () => {
    console.log("Server is run on port:", port);
  });
};

const renderMarkUp = (str) => {
  return htmlTemplate.replace("<!-- HTML_PLACEHOLDER -->", str);
};

server(process.env.PORT || 8081);

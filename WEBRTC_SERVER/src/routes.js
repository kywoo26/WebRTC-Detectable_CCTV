const path = require('path')
const express = require('express')
var multer = require('multer'); // multer모듈 적용 (for 파일업로드)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
      console.log(file)
    let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        cb(null, basename + ".png");
  }
})
var upload = multer({ storage: storage })
var checknumber = 0;
module.exports = (app, changeScreen, changeImage, changeColor) => {

    // redirect http traffic to https traffic
    
    app.get("/changeScreen", function (req, res) {
        changeScreen(req.param('number'));
        res.end();
    });
    app.post('/changeImage', upload.single('image'), function (req, res, next) {
        checknumber = 1;
      console.log(req.body);
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write("<h1>File Upload sucess</h1>");
        changeImage(req.param('number'));
        res.end();
    })
    app.post("/changeColor", function (req, res) {
        changeColor(req.body.number);
        res.end();
    });

    app.get("/checkState", function (req, res) {
        if(checknumber == 1){
            checknumber=0;
            res.send({ bStart: 1 });
        }
        else
        res.send({ bStart: 0 });
    });
    
    app.use(express.static(path.join(__dirname, '..', 'public')))
    app.use(express.static(path.join(__dirname, '..', 'node_modules')))
}
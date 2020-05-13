const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000;
const mysql = require('mysql');
app.use("/", express.static("build"));
app.use(express.json());
app.use(cors());

// console.log that the server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

var con = mysql.createConnection({
    host: 'localhost',
    user: "csdept",
    password: "csdept20",
    database: "surveycsc"
});

//fetch survey questions
app.get('/express_backend/survey:survey/q:num', (req, res) => {
    var questionNum = req.params.num;
    var surveyNum = req.params.survey;
    con.query(`SELECT question FROM questions WHERE surveyID = ${surveyNum} && questionNum = ${questionNum}`, function (err, result, fields) {
        if (err) throw err;
        var question = JSON.stringify(result[0].question);
        res.send({ express: `${question}` });
    });
});

//submit IAB survey results
app.post('/express_backend/submit/IAB/', (req, res) => {
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var date = new Date();
    var year = date.getFullYear();
    con.query(`INSERT INTO IABResults (q1, q2, q3, q4, comments, year) VALUES (${q1},${q2},${q3},${q4},'${q5}', ${year})`, function (err, result, fields) {
        if (err) throw err;
    });

});

//submit senior survey results
app.post('/express_backend/submit/senior/', (req, res) => {
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    var q11 = req.body.q11;
    var q12 = req.body.q12;
    var q13 = req.body.q13;
    var q14 = req.body.q14;
    var q15 = req.body.q15;
    var date = new Date();
    var year = date.getFullYear();
    con.query(`INSERT INTO seniorResults (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, comments, year) VALUES (${q1},${q2},${q3},${q4},${q5},${q6},${q7},${q8},${q9},${q10},${q11},${q12},${q13},${q14},'${q15}', ${year})`, function (err, result, fields) {
        if (err) throw err;
    });

});

//submit alumni survey results
app.post('/express_backend/submit/alumni/', (req, res) => {
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    var q11 = req.body.q11;
    var q12 = req.body.q12;
    var q13 = req.body.q13;
    var q14 = req.body.q14;
    var q15 = req.body.q15;
    var date = new Date();
    var year = date.getFullYear();
    con.query(`INSERT INTO alumniResults (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, comments, year) VALUES (${q1},${q2},${q3},${q4},${q5},${q6},${q7},${q8},${q9},${q10},${q11},${q12},${q13},${q14},'${q15}', ${year})`, function (err, result, fields) {
        if (err) throw err;
    });

});

//access code login
app.post('/express_backend/submit/accessCode/', (req, res) => {
    var key = req.body.key;
    con.query(`SELECT code, surveyID FROM accessCode WHERE code='${key}' && active = 1`, function (err, result, fields) {
        if (err) throw err;
        var auth = JSON.stringify(result);
        if (auth != '[]') {
            res.send({
                reply: `1`,
                survey: `${result[0].surveyID}`
            });
        }
        else {
            res.send({
                reply: `0`,
                survey: `0`
            });
        }
    });
});

//admin login
app.post('/express_backend/submit/login/', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    con.query(`SELECT username FROM adminLogin WHERE username='${username}' && password = '${password}'`, function (err, result, fields) {
        if (err) throw err;
        var auth = JSON.stringify(result);
        if (auth != '[]') {
            res.send({
                reply: `1`
            });
        }
        else {
            res.send({
                reply: `0`
            });
        }
    });
});

//validate code
app.post('/express_backend/validateCode/', (req, res) => {
    var survey = req.body.survey;
    con.query(`SELECT surveyID FROM accessCode WHERE surveyID = '${survey}'`, function (err, result, fields) {
        if (err) throw err;
        var strResult = JSON.stringify(result);
        if (strResult != '[]') {
            res.send({
                valid: `0`
            });
        }
        else {
            res.send({
                valid: `1`
            });
        }
    });
});

//insert valid code
app.post('/express_backend/code/', (req, res) => {
    var code = req.body.code;
    var survey = req.body.survey;
    con.query(`INSERT INTO accessCode (code,surveyID,active) VALUES ('${code}','${survey}', 1)`, function (err, result, fields) {
        if (err) throw err;       
    });
});


//select current codes
app.get('/express_backend/getActiveCodes', (req, res) => {
    con.query(`SELECT * FROM accessCode`, function (err, result, fields) {
        if (err) throw err;
        var length = result.length;
        var student;
        var alumni;
        var iab;
        var studentState;
        var alumniState;
        var iabState;
        for (var i = 0; i < length; i++) {

            switch (result[i].surveyID) {
                case 1:
                    student = result[i].code;
                    if (result[i].active == '1') {
                        studentState = 'Deactivate';
                    }
                    else {
                        studentState = 'Activate';
                    }
                    break;
                case 2:
                    alumni = result[i].code;
                    if (result[i].active == '1') {
                        alumniState = 'Deactivate';
                    }
                    else {
                        alumniState = 'Activate';
                    }
                    break;
                case 3:
                    iab = result[i].code;
                    if (result[i].active == '1') {
                        iabState = 'Deactivate';
                    }
                    else {
                        iabState = 'Activate';
                    }
            }
        }
        res.send({
            student: `${student}`,
            alumni: `${alumni}`,
            iab: `${iab}`,
            studentState: `${studentState}`,
            alumniState: `${alumniState}`,
            iabState: `${iabState}`
        });
    });
});


//edit survey questions
app.post('/express_backend/editQuestion/', (req, res) => {
    var newQuestion = req.body.question;
    var qNum = req.body.num;
    var surveyID = req.body.survey;
    con.query(`UPDATE questions SET question="${newQuestion}" WHERE questionNum = '${qNum}' && surveyID = '${surveyID}'`, function (err, result, fields) {
        if (err) throw err;
    });
});

//activate or deactivate access code
app.post('/express_backend/toggleCode/', (req, res) => {
    var surveyID = req.body.surveyID;
    con.query(`SELECT active FROM accessCode WHERE surveyID = '${surveyID}'`, function (err, result, fields) {
        if (err) throw err;
        if (result[0].active == '1') {
            con.query(`UPDATE accessCode SET active = '0' WHERE surveyID = '${surveyID}'`, function (err, result, fields) {
                if (err) throw err;
            });
        }
        if (result[0].active == '0') {
            con.query(`UPDATE accessCode SET active = '1' WHERE surveyID = '${surveyID}'`, function (err, result, fields) {
                if (err) throw err;
            });
        }
    });
});

//delete access code
app.post('/express_backend/deleteCode/', (req, res) => {
    var surveyID = req.body.surveyID;
    con.query(`DELETE FROM accessCode WHERE surveyID = '${surveyID}'`, function (err, result, fields) {
        if (err) throw err;
    });
});

//get results data
app.post('/express_backend/getGraphData/', (req, res) => {
    var qNum = req.body.qNum;
    var type = req.body.survey;
    var res5;
    var res4;
    var res3;
    var res2;
    var res1;
    con.query(`SELECT COUNT(q${qNum}) AS 'res5' FROM ${type}Results WHERE (q${qNum}) = 5`, function (err, result, fields) {
        if (err) throw err;
        res5 = result[0].res5;
    });
    con.query(`SELECT COUNT(q${qNum}) AS 'res4' FROM ${type}Results WHERE (q${qNum}) = 4`, function (err, result, fields) {
        if (err) throw err;
        res4 = result[0].res4;
    });
    con.query(`SELECT COUNT(q${qNum}) AS 'res3' FROM ${type}Results WHERE (q${qNum}) = 3`, function (err, result, fields) {
        if (err) throw err;
        res3 = result[0].res3;
    });
    con.query(`SELECT COUNT(q${qNum}) AS 'res2' FROM ${type}Results WHERE (q${qNum}) = 2`, function (err, result, fields) {
        if (err) throw err;
        res2 = result[0].res2;
    });
    con.query(`SELECT COUNT(q${qNum}) AS 'res1' FROM ${type}Results WHERE (q${qNum}) = 1`, function (err, result, fields) {
        if (err) throw err;
        res1 = result[0].res1;
        res.write(JSON.stringify({
            res5: res5,
            res4: res4,
            res3: res3,
            res2: res2,
            res1: res1
        }));
        res.end();
    });

});

//get modified results data
app.post('/express_backend/getModGraphData/', (req, res) => {
    var qNum = req.body.qNum;
    var type = req.body.survey;
    var start = req.body.start;
    var end = req.body.end;
    var res5;
    var res4;
    var res3;
    var res2;
    var res1;
    con.query(`SELECT COUNT(q${qNum}) AS 'res5' FROM ${type}Results WHERE (q${qNum}) = 5 && year >= ${start} && year <= ${end}`, function (err, result, fields) {
        if (err) throw err;
        res5 = result[0].res5;
    });
    con.query(`SELECT COUNT(q${qNum}) AS 'res4' FROM ${type}Results WHERE (q${qNum}) = 4 && year >= ${start} && year <= ${end}`, function (err, result, fields) {
        if (err) throw err;
        res4 = result[0].res4;
    });
    con.query(`SELECT COUNT(q${qNum}) AS 'res3' FROM ${type}Results WHERE (q${qNum}) = 3 && year >= ${start} && year <= ${end}`, function (err, result, fields) {
        if (err) throw err;
        res3 = result[0].res3;
    });
    con.query(`SELECT COUNT(q${qNum}) AS 'res2' FROM ${type}Results WHERE (q${qNum}) = 2 && year >= ${start} && year <= ${end}`, function (err, result, fields) {
        if (err) throw err;
        res2 = result[0].res2;
    });
    con.query(`SELECT COUNT(q${qNum}) AS 'res1' FROM ${type}Results WHERE (q${qNum}) = 1 && year >= ${start} && year <= ${end}`, function (err, result, fields) {
        if (err) throw err;
        res1 = result[0].res1;
        res.write(JSON.stringify({
            res5: res5,
            res4: res4,
            res3: res3,
            res2: res2,
            res1: res1
        }));
        res.end();
    });

});

//view survey comments
app.post('/express_backend/getComments/', (req, res) => {
    var type = req.body.survey;
    con.query(`SELECT comments FROM ${type}Results`, function (err, result, fields) {
        if (err) throw err;
        var comments = [];
        for (var i = 0; i < result.length; i++) {
            if (result[i].comments != '') {
                comments.push(result[i].comments);
            }
        }
        res.send({
            comments
        });
    });
});

//get modified comments data
app.post('/express_backend/getModComments/', (req, res) => {
    var type = req.body.survey;
    var start = req.body.start;
    var end = req.body.end;
    con.query(`SELECT comments FROM ${type}Results WHERE year >= ${start} && year <= ${end}`, function (err, result, fields) {
        if (err) throw err;
        var comments = [];
        for (var i = 0; i < result.length; i++) {
            if (result[i].comments != '') {
                comments.push(result[i].comments);
            }
        }
        res.send({
            comments
        });
    });
});
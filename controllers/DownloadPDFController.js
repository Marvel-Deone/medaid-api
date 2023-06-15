const fs = require('fs');
const hbs = require('hbs');
const pdf = require('html-pdf');
// const options = { format: 'Letter' };
const selfAssessmentAnswerModel = require('../models/SelfAssessmentAnswerModel');


const downloadResult = async (req, response) => {

    let id = req.uid;
    let filename;
    let filedirectory;


    await selfAssessmentAnswerModel.findById(req.params.id).exec().then(result => {
        let data = result
        console.log(result.category);
        // return (res.status(200).json({ message: "Fetched Successfully", selfAssessment: result, success: true }));
        let webpage = `
        <body class="boxed">
            <center>
                <div class="" style="color: red !important;">
                <p>${data.category}</p>
                </div>
            </center>
            <div class="getResult-div px-3 mb-5">
                <p class="text-center" style="font-size: 15px; font-weight: 400;">This result is based on the answers you
                    provider earlier from the self assessment</p>
                <div class="card card-plain h-100">
                    <div class="card-body p-3">
                        <ul class="list-group">
    
                            <div class="row mt-2 mb-2">
                                <!-- <div class="col-12">
                                    </div> -->
                                <div class="col-12 col-lg-12 px-3 mt-3 d-flex justify-content-between">
                                    <label class="form-check-label text-body text-truncate w-80 mb-0 fw-bold"
                                        style="color: #000000D9 !important;" for="flexSwitchCheckDefault">Date
                                        of Assessment:</label>
                                    <p class="ms-1" style="color: #000000D9; font-size: 12px;">${new Date(data.createdAt).toLocaleDateString() }</p>
                                </div>
                            </div>
    
                            <div class="row mt-2">
                                <div class="col-12 col-lg-12 px-3 mt-3">
                                    ${data.questionsAnswers.map( function(key) { return `
                                        <label for="" class="form-check-label text-body w-80 mb-0 fw-bold"
                                            style="color: #000000D9 !important; word-break: keep-all !important; line-height: 1.8 !important;">Question: ${key['question']}</label>
                                        <p>Answer: ${key['answer']}</p>
                                        `}).join('')}
                                    </div>
                            </div>
                        </ul>
                </div>
            </div>
        </div>
        </body>
    `
        //setting options for PDF
        let options = { format: 'A4' };

        //Reads the Base Template from the Views Folder
        let template = hbs.compile(fs.readFileSync('gen.hbs', 'utf8'));

        //Proccessing the base template with the content
        let html = template({ content: webpage });


        
        filename = `./${data.username}-self-assessment-result.pdf`;
        pdf.create(html, options).toFile(`./${data.username}-self-assessment-result.pdf`, function  (err, res) {
            console.log('dir', res.filename, filedirectory);
        // return res.status(200);
        // if (err) console.log(err);
        filedirectory = res.filename;
        console.log('myres', filedirectory);
        // res.json({filename})
        return response.status(200).json({ message: "Result downloaded successfully", data: filename, filedirectory, status:true });
        }); 
        
        }).catch(err => {
            response.status(403).json({ message: err.message, success: false });
        });
    // let data = req.body
    

    // //setting options for PDF
    // let options = { format: 'A4' };

    // //Reads the Base Template from the Views Folder
    // let template = hbs.compile(fs.readFileSync('./views/gen.hbs', 'utf8'));

    // //Proccessing the base template with the content
    // let html = template({ content: webpage })

    // pdf.create(html, options).toFile('./self-assessment-result.pdf', function (err, res) {
    //     // if(res) return res.json({filename:filename+".pdf"})
    //     if (res) return 'self-assessment-result.pdf'
    //     if (err) return console.log(err);
    //     console.log(res); // { filename: '/app/businesscard.pdf' }
    // });
}

module.exports = {
    downloadResult
};
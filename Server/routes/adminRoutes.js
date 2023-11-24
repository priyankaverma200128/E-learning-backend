const router = require("express").Router()
const multer = require("multer")
const courseController = require('../apis/course/courseController')
const customerController = require('../apis/customer/customerController')
const branchController = require('../apis/branch/branchController')
const materialtypeController = require("../apis/materialtype/materialtypeController")
const materialController = require("../apis/material/materialController")
const quizController = require("../apis/quiz/quizController")
const quizquestionController = require("../apis/quizquestion/quizquestionController")
const playedquizController = require("../apis/playedquiz/playedquizController")
const userController = require("../apis/user/userController")
const dashboardController = require("../apis/dashboard/dashboardController")

// login api
router .post('/login',userController.login)



// Course Routes
const courseStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'server/public/course/')
    },
    filename:(req,file,cb)=>{
        let picname = Date.now() + file.originalname
        req.body.attachment='course/' + picname
        cb(null, picname)
    }
})
const courseUpload = multer({storage:courseStorage})
router.post('/course/add',courseUpload.single('attachment'),courseController.add)
router.post('/course/all',courseController.getAll)
router.post('/course/single',courseController.getSingle)
router.post('/course/update',courseUpload.single('attachment'),courseController.update)

// Branch Routes
router.post('/branch/all',branchController.getAll)
router.post('/branch/single',branchController.getSingle)


// materialtype Routes
router.post('/materialtype/all',materialtypeController.all)
router.post('/materialtype/single',materialtypeController.single)


// material routes
router.post('/material/all',materialController.all)
router.post('/material/single',materialController.single)






router.use(require('../middleware/tokenChecker'))

// dashboard
router.get('/dashboard',dashboardController.dashboard)

// Course Routes

router.post('/course/delete',courseController.deleteCourse)

// Branch Routes
const branchStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'server/public/branch/')
    },
    filename:(req,file,cb)=>{
        let picname = Date.now() + file.originalname
        req.body.attachment='branch/' + picname
        cb(null, picname)
    }
})
const branchUpload = multer({storage:branchStorage})
router.post('/branch/add',branchUpload.single('attachment'),branchController.add)
router.post('/branch/update',branchUpload.single('attachment'),branchController.update)
router.post('/branch/delete',branchController.deleteBranch)

// materialtype Routes  
router.post('/materialtype/add',materialtypeController.add)
router.post('/materialtype/update',materialtypeController.update)
router.post('/materialtype/delete',materialtypeController.deleteMaterialtype)


// material routes
const taskStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'server/public/material/')
    },
    filename:(req,file,cb)=>{
        let picname = Date.now() + file.originalname
        req.body.attachment='material/' + picname
        cb(null, picname)
    }
})

const materialupload = multer({storage:taskStorage})
router.post('/material/add', materialupload.single('attachment'), materialController.add)
router.post('/material/update', materialupload.single('attachment'), materialController.update)
router.post('/material/delete',materialController.deleteMaterial)

// quiz routes
router.post('/quiz/add',quizController.add)
router.post('/quiz/all',quizController.all)
router.post('/quiz/single',quizController.single)
router.post('/quiz/update',quizController.update)
router.post('/quiz/delete',quizController.deleteQuiz)

// playedquiz routes
router.post('/playedquiz/all',playedquizController.all)
router.post('/playedquiz/single',playedquizController.single)


// quizquestion routes
router.post('/quizquestion/add',quizquestionController.add)
router.post('/quizquestion/all',quizquestionController.all)
router.post('/quizquestion/single',quizquestionController.single )
router.post('/quizquestion/update',quizquestionController.update)
router.post('/quizquestion/delete',quizquestionController.deleteQuizquestion)







router.all("*", (req, res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})




module.exports = router
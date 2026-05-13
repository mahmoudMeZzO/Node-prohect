function chick (req){

    if(req.body.name== " "){
        return res.status(400).json({ERORR:"the name = ' ' "})
    }
}
module.exports =chick
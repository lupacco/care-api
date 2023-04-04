async function create(req, res, next){
    const {date, time} = req.body
    try {
        console.log(req.body)
        return res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

export default {create}
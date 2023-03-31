async function create(req, res, next){
    const {type, name, email, password} = req.body

    try {
        await userService.create(type, name, email, password)
        if (type === 'doctor'){
            await doc
        }else{

        }
        return res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

export default {create}
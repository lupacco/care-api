try {
    if (!authorization) throw errors.unauthorizedError();
  
    const parts = authorization.split(" ");
    if (parts.length !== 2) throw errors.unauthorizedError();
  
    const [schema, token] = parts;
    if (schema !== "Bearer") throw errors.unauthorizedError();
    console.log(token)
    console.log(process.env.SECRET_JWT)

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
    try {
        if (error) throw errors.unauthorizedError();

        

        if (!user) throw errors.unauthorizedError();

        res.locals.user = user;

        next();
    } catch (err) {
        next(err);
    }
    });
    
} catch (err) {
    next(err)
}
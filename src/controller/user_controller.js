import user_model from "../models/user_model"

export const user_add = (request, response) => {
    const user = new user_model({
        username:request.body.username,
        fname:request.body.fname,
        lname:request.body.lname,
        address:request.body.address,
        email:request.body.email,
        password:request.body.password,
        phone_number:request.body.phone_number,
        date_of_birth:request.body.date_of_birth,
        profile_picture:request.body.profile_picture,
        documents:request.body.documents,
        account_balance:request.body.account_balance,
        account_rating:request.body.account_rating,
        is_validated:request.body.is_validated,
        access_level:request.body.access_level
    })
    const user_get=user.save()
    response.status(201).json(user)
}
export const user_get = (request, response) => {
    
}
export const user_update = (request, response) => {
    
}
export const user_delete = (request, response) => {
    
}
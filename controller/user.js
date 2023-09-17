const User = require('../model/user')

const getAllUsers = async (req ,res) => {
    try{
        const users = await User.find({});
        return res.status(200).send({ success: true, message: "Users has been retrieved", data: users });
    }catch(err) {
        res.json(err)
    }
};

const login = async(req, res) => {
    const { email, password } = req.body;
    try{
    if(!email || !password) {
        return res.redirect('/login?error=Email and password is required');
    }
    const user = await User.findOne({ email: email, password: password });
    console.log(user, email, password)
    if(!user) {
        return res.redirect('/login?error=Invalid login details');
    }

    return res.redirect(`/?username=${user.username}&name=${user.name}`);
    
    } catch(err) {
    return res.status(500).json({ success: false, message: err.message });
    }
}
   

const signUp = async(req, res) => {
    try{
        console.log(req.body)
    const {name, email, username, password} = req.body;
    if (!name || !email || !username) {
        return res.redirect('/signUp?error=All fields is required');
        // return res.status(400).json({ success: false, message: "All fields is required" });
    }
    
    const user = {
     name,
     email,
     password,
     username
 };
 
     await User.create(user);
     return res.status(200).json({ success: true, message: "Your account has been created" });
 } catch(err) {
     return res.status(500).json({ success: false, message: err.message });
 }
 }

const deleteUser = async (req, res) => {
    const {user_id} = req.params;
    if (!user_id) {
        return res.status(400).json({ success: false, message: "user not exist"})
    }
    try {
   const removedOne = await User.deleteOne({_id: user_id});
   
    return res.status(200).json({ success: true, message: "user removed", data: removedOne})

        
    } catch (err) {
        return res.status(500).json({success: false, message: err.message})
        
    }

   
}

module.exports = {
    signUp,
    getAllUsers,
    login,
    deleteUser
}
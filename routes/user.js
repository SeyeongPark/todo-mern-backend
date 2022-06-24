const router = require("express").Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
    try{
        const user = await User.findOne({ email : req.body.email });
        res.status(200).send({ data: user });
    }
    catch(err){
        res.status(500).send({ message: err.message });
    }
})

module.exports = router;

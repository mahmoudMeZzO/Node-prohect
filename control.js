const { set } = require("mongoose")
const userId = require("./model/SchemaUser")

const get = async (req, res) => {
    try {
        const query = req.query
        const limet = query.limet || 10
        const page = query.page || 1
        const skip = (page - 1) * limet

        const UserAll = await userId.find({}, { __v: false }).limit(limet).skip(skip)
        res.json({ status: "success", Data: { "DataUser": UserAll } })

        console.log(UserAll)
    } catch (e) {
        res.status(200).json("NOT FOUND USERS")
    }
}

const getid = async (req, res) => {
    try {
        const query = req.query
        const limet = query.limet
        const page = query.limet
        const skip = (page - 1) * limet
        const usid = await userId.findById(req.params.id).limit(limet).skip(skip)
        console.log(usid);

        if (!usid) {
            return res.status(404).json({ msg: "Not _found" })

        }

        return res.json({ status: "success", "User": [usid] })
    } catch (e) {
        return res.status(404).json({ msg: "Not _found2" })

    }

}
const add = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ ERORR: "name not valid" })
    }

    if (req.body.name == " ") {
        return res.status(400).json({ ERORR: "the name = ' ' " })
    }

    if (req.body.age == " ") {
        return res.status(400).json({ ERORR: "the adg = ' ' " })
    }
    if (!req.body.age) {
        return res.status(400).json({ ERORR: "adg not valid" })
    }

    const newUser = new userId(req.body)
    await newUser.save()
    // users.push({ id :users.length + 1, ...req.body})
    console.log("DATA IS =>", req.body)

    res.status(201).json(newUser)


}
const updet = async (req, res) => {
    const updus = req.params.id
    try {
        const idUp = await userId.updateOne({ _id: updus }, { $set: { ...req.body } })
        console.log("UPDETED => ", idUp);

        return res.status(200).json(idUp)
    } catch (e) {
        res.status(400).json("NOT FOUND")
    }
}

const delet = async (req, res) => {
    try {

        const delet1 = await userId.deleteOne({ _id: req.params.id })
        console.log("DELETED IS DONE")
        return res.status(200).json({ DELETAD: true })
    } catch (e) {
        res.status(400).json("BAD REQ")
    }

}
module.exports = {
    get,
    getid,
    add,
    updet,
    delet

}
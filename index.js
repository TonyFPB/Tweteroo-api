import express from "express"
import cors from "cors"
const users = []
const tweets = []

const app = express()
app.use(cors())
app.use(express.json())

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body
    const userExist = users.find(u => u.username === username)

    if (!username || !avatar) {
        res.status(400).send("Todos os campos são obrigatórios!")
        return;
    }
    if (userExist) {
        res.status(409).send("Usuario ja existente.")
        return;
    }
    const newUser = { username, avatar }
    users.push(newUser)
    res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const { tweet } = req.body
    const username = req.headers.user
    const userExist = users.find(u => u.username === username)
    if (!tweet || !username) {
        res.status(400).send("Todos os campos são obrigatórios!")
        return;
    }
    if (!userExist) {
        res.status(400).send("Usuario não existe.")
        return;
    }
    const newTweet = { username, tweet }
    tweets.unshift(newTweet)
    res.status(201).send("OK")
})

app.get("/tweets/:USERNAME", (req, res) => {
    const username = req.params.USERNAME
    const userExist = users.find(u => u.username === username)
    if (!userExist) {
        res.status(400).send("Usuario não encontrado.")
        return;
    }
    const usernameFilter = tweets.filter(t => t.username === username)
    const [user] = users.filter(u => u.username === username)
    const toSendUserTweets = usernameFilter.map(t => { return { "username": username, "tweet": t.tweet, "avatar": user.avatar } })
    res.send(toSendUserTweets)
})
app.get("/tweets", (req, res) => {
    const toSend = []
    let page = Number(req.query.page)

    if (page) {
        if (page < 1) {
            res.status(400).send("Informe uma pagina valida!")
            return;
        }

        for (let i = ((page - 1) * 10); i <= (((page - 1) * 10) + 9); i++) {
            let t = tweets[i]
            if (t !== undefined) {
                users.forEach((u) => {
                    if (u.username === t.username) {
                        toSend.push({ username: u.username, avatar: u.avatar, tweet: t.tweet })
                    }
                })
            }
        }
        res.send(toSend)
        return;
    }
    for (let i = 0; i < 10; i++) {
        let t = tweets[i]
        if (t !== undefined) {
            users.forEach((u) => {
                if (u.username === t.username) {
                    toSend.push({ username: u.username, avatar: u.avatar, tweet: t.tweet })
                }
            })
        }
    }

    res.send(toSend)
})

app.listen(5000, () => console.log("Server running in port: 5000"))
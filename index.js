import express from "express"
import cors from "cors"
const users = [
    { username: 'Cinderala', avatar: 'https://images.squarespace-cdn.com/content/v1/5a21afb08fd4d2c68b980870/1561490706055-6I5I1Y9Q3IT1CUSKAHE3/the-gospel-according-to-cinderella-2_PlainfieldChristianChurch_Indiana.jpg?format=1000w' },
    { username: 'Detona ralph e Vanellope', avatar: 'https://capricho.abril.com.br/wp-content/uploads/2017/07/detona-ralph.jpg' },
    { username: 'Bob Esponja', avatar: 'https://static1.purebreak.com.br/articles/5/85/10/5/@/317506--bob-esponja-calca-quadrada-e-as-maiore-amp_article_image-2.jpg' },
    { username: 'Goku', avatar: 'https://s2.glbimg.com/ajBcgCtGJ0CiGLwdg9sNwotYmfw=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2020/e/n/UtuAhWQNWA4FdvEUCp2A/dragon-ball-z-goku.jpg' }
]
const tweets = [
    { username: 'Bob Esponja', tweet: "hehehehehehe" },
    { username: 'Goku', tweet: "" },
    { username: 'Detona ralph e Vanellope', tweet: "Vencemos uma corrida hoje" },
    { username: '', tweet: "" },
    { username: 'Cinderala', tweet: "Onde esta o meu sapato o deus" },
    { username: 'Bob Esponja', tweet: "" },
    { username: '', tweet: "" },
    { username: 'Goku', tweet: "Oi eu sou o goku" },
    { username: 'Cinderala', tweet: "" },
    { username: '', tweet: "" }
]
const app = express()
app.use(cors())

app.get("/tweets", (req, res) => {
    const toSend = []
    tweets.forEach((t)=>{
        users.forEach((u)=>{
            if(u.username === t.username){
                toSend.push({username:u.username, avatar:u.avatar, tweet:t.tweet})
            }
        })
    })
    res.send(toSend)
})

app.listen(5000, () => console.log("Server running in port: 5000"))
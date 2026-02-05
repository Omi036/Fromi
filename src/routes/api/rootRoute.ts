import { Route } from "../../managers/api/apiManager";

Route.new("get", "/", (req, res) => {
    res.send("Hello World!")
})

console.log("Hello")
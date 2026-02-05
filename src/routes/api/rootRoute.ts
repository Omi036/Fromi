import { APIRoute } from "../../managers/api/apiManager";

APIRoute.new("get", "/", (req, res) => {
    res.send("Hello World!")
})
class OllamaMessage {
    content: string
    role: string

    constructor(content: string, role: string = "user") {
        this.content = content
        this.role = role
    }

    deconstruct(){
        return {
            content: this.content,
            role: this.role
        }
    }


    static fromUser(content: string){
        return new OllamaMessage(content, "user")
    }


    static fromSystem(content: string){
        return new OllamaMessage(content, "system")
    }
}

export { OllamaMessage }
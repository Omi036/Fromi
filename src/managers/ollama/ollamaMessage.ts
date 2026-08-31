class Message {
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
}

export { Message }
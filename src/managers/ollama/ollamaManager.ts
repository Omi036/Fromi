import { Manager } from "../../lib/classes/manager";
import ollama, { Ollama } from 'ollama'
import { Message } from "./ollamaMessage";

class OllamaManager extends Manager {
    static client: Ollama;

    static init(url?: string, token?: string) {
        if(url) {
            this.client = new Ollama({host: url, headers: { Authorization: `Bearer ${token}` }})
        } else {
            this.client = new Ollama()
        }
    }

    static async chat(model: string, ...messages: Message[]) {
        return await this.client.chat({
            model,
            messages: messages.map((message: Message) => message.deconstruct())
        });
    }
}

export { OllamaManager }
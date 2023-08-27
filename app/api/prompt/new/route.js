import { connectDb } from "@/utils/database"
import Prompt from "@/models/promptModels"

export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json()

    try {
        await connectDb()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 })
        console.log(error);
    }
}
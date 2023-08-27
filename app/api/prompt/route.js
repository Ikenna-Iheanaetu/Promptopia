import Prompt from "@/models/promptModels";
import { connectDb } from "@/utils/database";

export const GET = async (request) => {
    try {
        await connectDb()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 
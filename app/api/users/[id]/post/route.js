import Prompt from "@/models/promptModels";
import { connectDb } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectDb()

        const prompts = await Prompt.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 
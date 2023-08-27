import Prompt from "@/models/promptModels";
import { connectDb } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectDb()

        const prompt = await Prompt.findById(params.id)
        if(!prompt) return new Response('Prompt not found', { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()

    try {
        await connectDb()

        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt) return new Response('Prompt not found', { status: 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update the prompt", { status: 500 })
    }
} 

export const DELETE = async (request, { params }) => {
    try {
        await connectDb();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
}
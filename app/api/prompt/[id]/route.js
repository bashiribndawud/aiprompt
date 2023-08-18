import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if(!prompt){
        return new Response("Prompt Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Failed to get prompts", { status: 500 });
  }
};


export const PATCH = async (request, { params }) => {
    const {prompt, tag} = await request.json();

  try {
    await connectToDB();

    const exitingPrompt = await Prompt.findById(params.id);
    if (!exitingPrompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }
    exitingPrompt.prompt = prompt;
    exitingPrompt.tag = tag;
    await exitingPrompt.save()
    return new Response(JSON.stringify(exitingPrompt), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Failed to update prompts", { status: 500 });
  }
};

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt Deleted", { status: 200 });
    } catch (error) {
        console.log(error.message);
        return new Response("Failed to Delete Prompt", { status: 500 });
    }
}

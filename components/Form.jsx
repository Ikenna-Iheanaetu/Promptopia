import React from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return <section className="w-full max-w-full flex-start flex-col">
    <h1 className="head_text text-left"><span className="blue_gradient">{ type } Post</span></h1>
    <p className="desc text-left max-w-0">
      { type } and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform
    </p>

   
    <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
      <label htmlFor="" className="font-satoshi font-semibold text-base text-grey-700">
        <span>Your AI Prompt</span>
      </label>
      <textarea  className="form_textarea" placeholder="Write your prompt here" required value={post.prompt} onChange={(e) => setPost({
        ...post, prompt: e.target.value
      })}>
      
      </textarea>
    </form>

    <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
      <label htmlFor="" className="font-satoshi font-semibold text-base text-grey-700">
      Tag {" "}
        <span className="font-normal">(#product, #webdevelopment, #idea)</span>
      </label>
      <input className="form_input" placeholder="#tag" required value={post.tag} onChange={(e) => setPost({
        ...post, tag: e.target.value
      })} />
    </form>

    <div className="flex-end mx-3 my-5 gap-4">
      <Link href='/' className="text-grey-500 text-sm">Cancel</Link>
      <button onClick={handleSubmit} disabled={submitting} className="px-5 py-1 text-sm bg-primary-orange rounded-full text-white text-center">
        { submitting ? `${type}...` : `${type}` }
      </button>
    </div>
  </section>;
};

export default Form;

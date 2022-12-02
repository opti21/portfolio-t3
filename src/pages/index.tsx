import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion"

import Image from "next/image";
import Icon from "../components/Icon";

const TECH_SKILLS = [
  {name: "Typescript",  icon: "typescript-plain"},
  {name: "Javascript",  icon: "javascript-plain"},
  {name: "Next.js", icon:"nextjs-original"},
  {name: "React", icon:"react-original"},
  {name: "Go",  icon: "go-original-wordmark"},
  {name: "Tailwind", icon:"tailwindcss-plain"},
  {name: "MongoDB", icon:"mongodb-plain"},
  {name: "PostgreSQL", icon:"postgresql-plain"}
]

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        // delayChildren: 0.5,
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  return (
    <>
      <Head>
        <title>Brandon (dev)</title>
        <meta name="description" content="Just a normal everyday fullstack dev who enjoys programming and building cool things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gradient-to-tr from-indigo-900 to-purple-600 font-work-sans antialiased">
          <header className="flex flex-col w-full h-screen justify-center overflow-hidden">
            <div className="flex items-center justify-center">
              <div className="flex flex-col md:flex-row backdrop-blur-md bg-blue-900 bg-opacity-75 shadow-xl rounded-lg p-2 lg:p-4 m-4">
                <div className="max-w-2xl px-2 text-white md:pt-0">
                  <h1 className="title w-full text-4xl md:text-5xl">Hi there,<br />{`I'm Brandon(or opti)!`}</h1>
                  <p className="max-w-lg py-4 text-2xl font-extralight">
                    Just a normal everyday full stack dev who enjoys programming and
                    building cool things.
                  </p>

                  <div className="contact flex flex-row gap-2 text-2xl">
                    <a
                      href="https://github.com/opti21"
                      target="blank"
                      className="discord font-extralight hover:underline"
                    >
                      Github <i className="devicon-github-original" />
                    </a>
                    {/* <a
                      href="https://twitter.com/opti21_"
                      className="twitter font-extralight hover:underline"
                      target="blank"
                    >
                      Twitter <i className="fa-brands fa-twitter" />
                    </a> */}
                  </div>

                </div>
                <div className="header-content-right flex items-center pt-2 text-white md:px-2 md:pt-0">
                  <Image
                    className="header-image ml-1 rounded-md lg:ml-4"
                    src="/gopher_pfp.jpg"
                    alt="profile of brandon as a gopher"
                    width="300"
                    height="300"
                    priority={true}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-center">
                <div className="animate-wave origin-bottom-right text-3xl">👋</div>
              </div>
              <div className="text-white">hey there's more to look at, just scroll down :D</div>
            </div>
          </header>


          <div className="text-white bg-indigo-600">
                <div className="pt-6 w-full text-center container mx-auto">
                  <h2 className="text-2xl">My Skills:</h2>

                  <motion.div variants={container} 
                    initial="hidden"
                    whileInView="show"
                  className="text-4xl flex">
                    {TECH_SKILLS.map((skill, index) => {
                      return <motion.div 
                      variants={item}
                      key={"skill-" + skill.name + index} className="w-24 h-24 p-4 rounded-lg m-4 flex flex-col justify-center items-center border">
                          <div className="text-base">{skill.name}</div>
                          <Icon icon={skill.icon} />
                      </motion.div>
                    })}
                  </motion.div>
                </div>
          </div>

      </main>
    </>
  );
};

export default Home;

{
  /* const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}; */
}

import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import Image from "next/image";
import Icon from "../components/Icon";
import { Item, Project } from "../types/types";
import Card from "../components/Card";
import TechSkills from "../components/TechSkills";
import { useInView } from "react-intersection-observer";
import Script from "next/script";
import cuid from "cuid";



const EXPERIENCE: Item[] = [
  {
    name: "Thumbnail Test",
    beginDate: "Aug 2022",
    endDate: "Current",
    position: "On Contract",
    bulletPoints: [
      "Thumbnail Test is a tool for Youtube creators to A/B test thumbnails and titles on their videos to see what gets the most engagement.",
      "Overhauled the UI for the entire application to improve UI responsiveness and UX. Integrated Stripe webhook to process subscriptions. With the improved UI/UX the site has reached an MRR of $1000."
    ],
    tech: [
      "Next.js", "Tailwind",
    ]
  },
  {
    name: "Brickseek",
    beginDate: "Mar 2022",
    endDate: "Apr 2022",
    position: "Contract Mobile Developer",
    bulletPoints: [
      "Contract work using React Native to add new features to their mobile app and improve their app speed by 20%."
    ],
    tech: [
      "React Native"
    ]
  },
  {
    name: "Opti Media",
    beginDate: "Jan 2016",
    endDate: "Current",
    position: "Freelancer",
    bulletPoints: [
      "Coded several applications listed below to help improve several twitch streamer communities that get used by 100s of users daily."
    ],
  },

]

const PROJECTS: Item[] = [
  {
    name: "Seth Drums Song Panel",
    link: "https://setdrums.com",
    bulletPoints: [
      "Engineered a completely brand-new full-stack application for SethDrum’s moderators to moderate incoming songs. It helped improve their moderation process by 100x.",
    ],
    tech: [
      "Typescript", "Next.js", "Prisma", "ChakraUI", "dnd kit", "Redis", "PostgreSQL", "Pusher", "Node.js"
    ]
  },
  {
    name: "Gauntlet Bot",
    link: "https://github.com/opti21/gauntlet-bot",
    bulletPoints: [
      "Architected an application that handles submissions for a weekly design contest hosted by a prominent music streamer on Twitch. It handled and stored over 1000s of original works and content created by their community members. "
    ],
    tech: [
      "Typescript", "Next.js", "Ant Design", "Node.js", "Vercel", "Linode", "Docker", "PostgreSQL"
    ]
  },
  {
    name: "Vibey Bot",
    bulletPoints: [
      "Devised a chatbot for a Twitch streamer to collect song requests from chat. It can process 100s of text searches and links across YouTube and Spotify. It is also capable of conducting polls in chat on demand."
    ],
    tech: [
      "Javascript", "EJS", "Node.js", "Express", "Websocket"
    ]
  }
]

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const { ref, inView, entry } = useInView({
      threshold: 0,
  });


  return (
    <>
      <Head>
        <title>Brandon (dev)</title>
        <meta
          name="description"
          content="Just a normal everyday fullstack dev who enjoys programming and building cool things"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gradient-to-br from-stone-800 via-violet-800 to-zinc-900 font-work-sans antialiased max-h-screen overflow-y-scroll">
        <header className="flex h-screen w-full flex-col md:justify-center overflow-hidden">
          <div className="flex items-center justify-center">
            <div
              className="m-4 flex flex-col items-center rounded-lg bg-opacity-75 p-2  lg:flex-row lg:p-4"
            >
              <div className="text-center max-w-2xl px-2 md:pt-0 text-white">
                <h2 className="w-full">
                  <span className=" font-black italic text-8xl w-full bg-clip-text text-transparent bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-fuchsia-200 via-purple-600 to-amber-400">HELLO</span>
                  <br />
                  <span className=" text-3xl md:text-5xl">{`I'm Brandon(or opti)!`}</span>
                </h2>
                <p className="max-w-lg py-4 text-2xl font-extralight text-white">
                  Just a normal everyday full stack dev who enjoys programming
                  and building cool things.
                </p>

                <div className="gap-2 text-2xl">
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
              <div className="origin-bottom-right animate-wave text-3xl">
                👋
              </div>
            </div>
            <div className="text-white text-center">
              {`hey there's more to look at,`}
              <br />
              just scroll down :D
            </div>
          </div>
        </header>

        <div className="container mx-auto w-full  text-white">
          <div className="flex w-full flex-col items-center pt-6">
            <div>
              <h2 className="text-6xl py-2 w-full text-white font-black italic text-center">
                My <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-300 to-pink-600">Skills</span>
              </h2>

                <TechSkills />
            </div>

            <div className="mt-8">
              <h2 className="text-6xl py-2 w-full text-white font-black italic text-center">
                My <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-300 to-pink-600">Experience</span>
              </h2>

              <div
                className="flex flex-wrap justify-center w-full"
              >
                {EXPERIENCE.map((experience, index) => {
                  return (<Card key={cuid()} item={experience} index={index} />);
                })}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-6xl py-2 w-full text-white font-black italic text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-300 to-pink-600">Projects</span>
              </h2>

              <div
                className="flex flex-wrap justify-center w-full"
              >
                {PROJECTS.map((projects, index) => {
                  return (<Card key={cuid()} item={projects} index={index} />);
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

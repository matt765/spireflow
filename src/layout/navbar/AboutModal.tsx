import React, { useRef } from "react";
import Link from "next/link";

import { CloseIcon } from "../../assets/icons/CloseIcon";
import { useCloseModal } from "../../hooks/useCloseModal";
import { OutlinedButton } from "../../components/common/OutlinedButton";
import { AboutModalProps } from "./types";

export const AboutModal = ({ closeModal }: AboutModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseModal(modalRef, closeModal);

  return (
    // I didn't use common modal component here because this modal needs unique padding values for mobile and tablet
    <div className="aboutModal">
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0   backdrop-blur-md z-40" />
      <div className="fixed w-screen h-full flex justify-center items-center top-0 left-0 z-50">
        <div
          ref={modalRef}
          className="w-screen h-full md:w-auto md:h-auto bg-loginModalBg dark:bg-loginModalBgDark shadow-xl px-[0vw] md:px-10  pt-0 md:pt-[3rem] md:pb-12 flex flex-col items-center justify-start md:rounded-2xl relative"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-xl
            fill-secondaryText
            dark:stroke-secondaryTextDark       
            dark:fill-secondaryTextDark
            hover:dark:stroke-secondaryTextHoverDark
            hover:dark:fill-secondaryTextHoverDark
            hover:fill-secondaryTextHover          
            hover:stroke-secondaryTextHover"
          >
            <CloseIcon />
          </button>
          <div className="md:max-h-[60vh] w-full -mr-4 overflow-auto pr-4 max-w-full md:max-w-[36rem]">
            <div className="flex items-center justify-center w-full flex-col gap-2 mt-8 md:-mt-2 px-8 md:px-0">
              <h2 className="text-primaryText dark:text-primaryTextDark text-3xl w-full text-left mt-2">
                About
              </h2>
            </div>
            <div className="text-primaryText text-base w-full dark:text-primaryTextDark mt-4  text-left  px-8 md:px-0">
              <p className="mb-4 text-base">
                Spireflow is an open source e-commerce analytic dashboard
                application, written in NextJS and TypeScript. It displays data
                resembling a fictional e-commerce platform.
                <br />
                <br /> The initial commits were pushed to GitHub in December
                2022, and since then, I have been expanding pool of features and
                integrating them with a NodeJS backend. If you would like to
                support the ongoing development and maintenance of this project,
                you can do so through the GitHub Sponsors program on my profile
              </p>
              <p className="text-left w-full mt-4 text-xl">Tech stack:</p>
              <div className="mt-4">
                <p className="text-secondaryText dark:text-secondaryTextDark mb-2">
                  Front-End:
                </p>
              </div>
              <ul className="list-disc list-inside mb-4 pl-3 text-primaryText dark:text-primaryTextDark">
                <li>NextJS</li>
                <li>TypeScript</li>
                <li>TailwindCSS</li>
                <li>Zustand</li>
                <li>Apollo Client</li>
                <li>Iron Session</li>
              </ul>
              <div>
                <p className="text-secondaryText dark:text-secondaryTextDark mb-2">
                  Back-End:
                </p>
              </div>
              <ul className="list-disc list-inside pl-3">
                <li>NodeJS</li>
                <li>Express</li>
                <li>PostgreSQL</li>
                <li>Prisma</li>
                <li>GraphQL</li>
              </ul>
            </div>
            <p className="text-left w-full mt-4 text-xl text-primaryText dark:text-primaryTextDark  px-8 md:px-0">
              Links
            </p>
            <div className="flex flex-row justify-start w-full mt-3 text-base gap-2  px-8 md:px-0">
              <Link
                href="https://github.com/matt765/spireflow"
                className="text-primaryText dark:text-primaryTextDark"
                target="_blank"
              >
                <OutlinedButton text="Front-end repository" />
              </Link>
              <Link
                href="https://github.com/matt765/spireflow-backend"
                className="text-primaryText dark:text-primaryTextDark"
                target="_blank"
              >
                <OutlinedButton text="Back-end repository" />
              </Link>
              <Link
                href="https://github.com/matt765/spireflow-backend"
                className="text-primaryText dark:text-primaryTextDark"
                target="_blank"
              >
                <OutlinedButton text="Storybook" />
              </Link>
            </div>
            <p className="text-left w-full mt-4 text-xl text-primaryText dark:text-primaryTextDark  px-8  md:px-0">
              Contact author
            </p>
            <p className=" text-primaryText dark:text-primaryTextDark text-left mt-2 w-full px-8  md:px-0">
              You can reach out to me through the contact form on my personal
              website or via LinkedIn.
            </p>
            <div className="flex justify-start gap-2 mt-4">
              <div className="flex justify-start px-8  md:px-0">
                <Link
                  href="https://matt765-portfolio.vercel.app/#contact"
                  className="text-primaryText dark:text-primaryTextDark mt-1"
                  target="_blank"
                >
                  <OutlinedButton text="Contact form" />
                </Link>
              </div>
              <div className="flex justify-start  px-8  md:px-0 mb-8 md:mb-0">
                <Link
                  href="https://www.linkedin.com/in/mateusz-wyrebek/"
                  className="text-primaryText dark:text-primaryTextDark mt-1"
                  target="_blank"
                >
                  <OutlinedButton text="LinkedIn" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useTranslations } from "next-intl";

import { InfoIcon } from "../../assets/icons/InfoIcon";
import { Modal } from "../../components/common/Modal";
import { OutlinedButton } from "../../components/common/OutlinedButton";

import Link from "next/link";

interface AboutModalProps {
  closeModal: () => void;
}

export const AboutModal = ({ closeModal }: AboutModalProps) => {
  const t = useTranslations();

  return (
    <div className="aboutModal">
      <Modal onClose={closeModal}>
        <div className="max-h-[60vh] w-full -mr-4 overflow-auto pr-4 max-w-[36rem]">
          <div className="flex items-center justify-center w-full flex-col gap-2 -mt-2">
            <h2 className="text-primaryText dark:text-primaryTextDark text-3xl w-full text-left mt-2">
              About
            </h2>
          </div>
          <div className="text-primaryText text-base w-full dark:text-primaryTextDark mt-4  text-left">
            <p className="mb-4 text-base">
              Spireflow is an open source e-commerce analytic dashboard
              application, written in NextJS and TypeScript. I built this
              project with intention to have some full stack application in
              portfolio. <br />
              <br /> The initial commits were pushed to GitHub in December 2022,
              and since then, I have been expanding pool of features and
              integrating them with a NodeJS backend. If you would like to
              support this project, please consider using the sponsor button on
              my GitHub profile.
            </p>
            <p className="text-left w-full mt-4 text-xl">Tech stack:</p>
            <p className="mt-4">
              <p className="text-secondaryText dark:text-secondaryTextDark mb-2">
                Front-End:
              </p>
            </p>
            <ul className="list-disc list-inside mb-4 pl-3 text-primaryText dark:text-primaryTextDark">
              <li>NextJS</li>
              <li>TypeScript</li>
              <li>TailwindCSS</li>
              <li>Zustand</li>
              <li>Apollo Client</li>
              <li>Iron Session</li>
            </ul>
            <p>
              <p className="text-secondaryText dark:text-secondaryTextDark mb-2">
                Back-End:
              </p>
            </p>
            <ul className="list-disc list-inside pl-3">
              <li>NodeJS</li>
              <li>Express</li>
              <li>PostgreSQL</li>
              <li>Prisma</li>
              <li>GraphQL</li>
            </ul>
          </div>
          <p className="text-left w-full mt-4 text-xl text-primaryText dark:text-primaryTextDark">
            Links
          </p>
          <div className="flex flex-col justify-start w-full mt-3 text-base">
            <Link
              href="https://github.com/matt765/spireflow"
              className="text-primaryText dark:text-primaryTextDark"
              target="_blank"
            >
              Front-end repository:
              <span className="text-secondaryText dark:text-secondaryTextDark  ml-2">
                https://github.com/matt765/spireflow
              </span>
            </Link>
            <Link
              href="https://github.com/matt765/spireflow-backend"
              className="text-primaryText dark:text-primaryTextDark"
              target="_blank"
            >
              Back-end repository:
              <span className="text-secondaryText dark:text-secondaryTextDark ml-2">
                https://github.com/matt765/spireflow-backend
              </span>
            </Link>
            <Link
              href="https://github.com/matt765/spireflow-backend"
              className="text-primaryText dark:text-primaryTextDark"
              target="_blank"
            >
              Storybook live link:
              <span className="text-secondaryText dark:text-secondaryTextDark  ml-2">
                https://github.com/matt765/spireflow-backend
              </span>
            </Link>
          </div>
          <p className="text-left w-full mt-4 text-xl text-primaryText dark:text-primaryTextDark">
            Contact author
          </p>
          <p className=" text-primaryText dark:text-primaryTextDark text-left mt-2 ">
            You can reach out to me through the contact form on my personal
            website or via LinkedIn.
          </p>
          <div className="w-full flex justify-start">
            <Link
              href="https://matt765-portfolio.vercel.app/#contact"
              className="text-primaryText dark:text-primaryTextDark mt-1"
              target="_blank"
            >
              <span className="text-secondaryText dark:text-secondaryTextDark">
                https://matt765-portfolio.vercel.app/#contact
              </span>
            </Link>
          </div>
          <div className="w-full flex justify-start">
            <Link
              href="https://www.linkedin.com/in/mateusz-wyrebek/"
              className="text-primaryText dark:text-primaryTextDark mt-1"
              target="_blank"
            >
              <span className="text-secondaryText dark:text-secondaryTextDark">
                https://www.linkedin.com/in/mateusz-wyrebek/
              </span>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

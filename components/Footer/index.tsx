import Link from "next/link";
import { GithubIcon, LinkedInIcon } from "../Utilities/Icons";
import ContactMeBtn from "./ContactMeBtn";
import ProtectedInfo from "./ProtectedInfo";

import "./styles.css";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col flex-wrap justify-between bg-white px-10 pb-10 pt-36 text-xl  dark:bg-black md:flex-row md:px-14">
        <div className="w-full  md:w-6/12">
          <h2 className="mb-6 text-5xl font-bold">Contact</h2>
          <div className="mb-4 flex flex-row flex-wrap items-center gap-5">
            <Link
              href={"https://github.com/Moshi-Li"}
              target="_blank"
              title="Github"
            >
              <GithubIcon size="text-4xl" className="h-14 w-14" />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/moshi-li/"}
              target="_blank"
              title="LinkedIn"
            >
              <LinkedInIcon size="text-4xl" className="h-14 w-14" />
            </Link>
            <ContactMeBtn />
          </div>
          <div className="mb-4">
            <h6 className="font-bold">Email:</h6>
            <p className="text-xl">li.moshi@outlook.com</p>
          </div>
          <ProtectedInfo />
        </div>
        <iframe
          className="rounded-sm border-0"
          id="google-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184552.5728962702!2d-79.51814148730774!3d43.71815566250607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1622089491873!5m2!1sen!2sca"
          loading="lazy"
          title="Address pinned on map"
        ></iframe>
      </div>
    </footer>
  );
}

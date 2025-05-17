import { Footer } from "flowbite-react";
import { BsFacebook, BsTiktok } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { FaPhone, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";

export default function FooterComp() {
  return (
    <Footer
      container
      className="flex border  border-t-3 bg-gray-300 rounded-md border-cyan-800 flex-col justify-center p-0 "
    >
      <div className="flex w-full flex-col gap-4  sm:flex-row p-5 sm:justify-around sm:items-center justify-center items-start">
        <div className="flex mt-7 flex-col gap-2 md:w-1/3 w-full">
          <Footer.Title className="mb-0 sm:mt-7" title={<Logo />} />
          <Footer.Divider className="border-black dark:border-gray-600" />
          <Link to="/privacy-policy">
            <span className="flex items-center dark:text-white text-black gap-1">
              <IoIosArrowForward className="text-sky-600" />
              Privacy Policy
            </span>
          </Link>
          <Link to="/terms-and-conditions">
            <span className="flex items-center dark:text-white text-black gap-1">
              <IoIosArrowForward className="text-sky-600" />
              Terms and Conditions
            </span>
          </Link>
          <Link to="/contacts">
            <span className="flex items-center dark:text-white text-black gap-1">
              <IoIosArrowForward className="text-sky-600" />
              Contacts
            </span>
          </Link>
          <Link to="/about">
            <span className="flex items-center dark:text-white text-black gap-1">
              <IoIosArrowForward className="text-sky-600" />
              About
            </span>
          </Link>
          <Link to="/">
            <span className="flex items-center dark:text-white text-black gap-1">
              <IoIosArrowForward className="text-sky-600" />
              Home
            </span>
          </Link>
        </div>
        <div className="flex flex-col sm:justify-start gap-2 md:w-1/3 w-full">
          <Footer.Title
            className="mb-0 sm:mb-1 text-black mt-5 sm:mt-0"
            title="Contacts"
          />
          <Footer.Divider className="border-black dark:border-gray-600" />
          <span className="flex items-center dark:text-white text-black gap-1">
            <FaPhone className="text-sky-600" />
            <a href="tel:+254759117496">+(254)759117496</a>
          </span>
          <span className="flex items-center dark:text-white text-black gap-1">
            <FaWhatsapp className=" text-sky-600" />
            <a href="https://wa.me/+254753868958?text=Hello!">
              +(254)753868958
            </a>
          </span>
          <span className="flex items-center dark:text-white text-black gap-1">
            <CiMail className="text-sky-600" />
            <a href="mailto:comradetrends.info@gmail.com">
              comradetrends.info@gmail.com
            </a>
          </span>
        </div>
        <div className="md:w-1/3 mt-5 sm:mt-10 w-full flex flex-col">
          <Footer.Title className="mb-1 text-black" title="Socials" />
          <Footer.Divider className="border-black dark:border-gray-600" />

          <div className="flex flex-col mt-2  gap-2">
            <Footer.LinkGroup>
              <Footer.Link
                href="https://www.tiktok.com/@comrade.trends"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex gap-1">
                  <Footer.Icon
                    fill="rgb(2,132,199,100)"
                    className="w-6 h-6"
                    icon={BsTiktok}
                  />
                  <span className="dark:text-white text-black">Tiktok</span>
                </div>
              </Footer.Link>
            </Footer.LinkGroup>
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://www.facebook.com/profile.php?id=61566437698996"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex gap-1">
                  <Footer.Icon fill="rgb(2,132,199,100)" icon={BsFacebook} />
                  <span className="dark:text-white text-black">Facebook</span>
                </div>
              </Footer.Link>
            </Footer.LinkGroup>
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://www.youtube.com/@ComradeTrends"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex gap-1">
                  <Footer.Icon fill="rgb(2,132,199,100)" icon={FaYoutube} />
                  <span className="dark:text-white text-black">YouTube</span>
                </div>
              </Footer.Link>
            </Footer.LinkGroup>
            <Footer.LinkGroup>
              <Footer.Link
                href="https://www.x.com/@ComradeTrends"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex gap-1">
                  <Footer.Icon
                    fill="rgb(2,132,199,100)"
                    icon={RiTwitterXFill}
                  />
                  <span className="dark:text-white text-black">X</span>
                </div>
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex justify-start !p-3">
        <Footer.Copyright by="Comrade Trends" year={new Date().getFullYear()} />
      </div>
    </Footer>
  );
}

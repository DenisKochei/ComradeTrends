import { BsFacebook, BsTiktok } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import { CallToAction } from "../components/CallToAction";
export function Contacts() {
  return (
    <div className="min-h-screen flex flex-col justify-start m-10 items-center">
      <div className="w-full border border-x-0 border-t-0 border-gray-700 mb-5 flex justify-center">
        <h1 className="text-2xl m-4 font-bold">Contact Us</h1>
      </div>
      <h2 className="font-bold text-xl m-2">General Issues</h2>
      <div className="flex flex-col justify-center items-center">
        <a className="text-[rgb(2,132,199,100)]" href="tel:+254759117496">
          +(254)759117496
        </a>
        <a
          className="text-[rgb(2,132,199,100)]"
          href="mailto:comradetrends.info@gmail.com"
        >
          comradetrends.info@gmail.com
        </a>
      </div>
      <h2 className="font-bold text-xl m-2">Sales and Marketing</h2>
      <div className="flex flex-col justify-center items-center">
        <a className="text-[rgb(2,132,199,100)]" href="tel:+254753868958">
          +(254)753868958
        </a>
        <a
          className="text-[rgb(2,132,199,100)]"
          href="mailto:comradetrends.marketing@gmail.com"
        >
          comradetrends.marketing@gmail.com
        </a>
      </div>
      <h2 className="font-bold text-xl m-2">Social Media</h2>
      <div className="flex mb-10 flex-col gap-2">
        <a
          href="https://www.facebook.com/profile.php?id=61566437698996"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center gap-2"
        >
          <BsFacebook fill="rgb(2,132,199,100)" className="w-5 h-5" />
          <span>Facebook</span>
        </a>
        <a
          href="https://www.tiktok.com/@comrade.trends"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center gap-2"
        >
          <BsTiktok fill="rgb(2,132,199,100)" className="w-5 h-5" />
          <span>TikTok</span>
        </a>
        <a
          href="https://www.x.com/@ComradeTrends"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center gap-2"
        >
          <RiTwitterXFill fill="rgb(2,132,199,100)" className="w-5 h-5" />
          <span>X</span>
        </a>
      </div>
      <CallToAction />
    </div>
  );
}

import { Helmet } from "react-helmet";
import { CallToAction } from "../components/CallToAction";
export function Cart() {
  return (
    <div className="min-h-screen flex flex-col sm:gap-10 justify-center items-center">
      <Helmet>
        <title>{`ComradeTrends | MyCart`}</title>
        <meta
          name="description"
          content="We're your trusted source for the latest news, insightful analysis, and trending stories from around the world."
        />
        <meta
          name="keywords"
          content="trusted source for the latest news, insightful analysis, and trending stories in Kenya and from around the world."
        />
      </Helmet>

      <p className="text-2xl self-center">
        ComradeTrends Market Place, Coming Soon 🙂
      </p>
      <div className="w-full flex justify-center items-center p-4">
        <CallToAction />
      </div>
    </div>
  );
}

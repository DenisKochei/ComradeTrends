import { Helmet } from "react-helmet";
import { CallToAction } from "../components/CallToAction";

export function MarketPlace() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-10">
      <Helmet>
        <title>{`ComradeTrends | MarketPlace`}</title>
        <meta
          name="description"
          content="We're your trusted source for the latest news, insightful analysis, and trending stories from around the world."
        />
        <meta
          name="keywords"
          content="trusted source for the latest news, insightful analysis, and trending stories in Kenya and from around the world."
        />
      </Helmet>
      <p className="text-2xl self-center">Coming Soon 🙂</p>
      <CallToAction/>
    </div>
  );
}

import { Helmet } from "react-helmet";

export function MarketPlace() {
  return (
    <div className="min-h-screen">
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
      MarketPlace
    </div>
  );
}

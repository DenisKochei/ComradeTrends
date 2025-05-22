import { AdvertiseWithUs } from "../components/AdvertiseWithUs";
import { Helmet } from "react-helmet";
import { PageIndicator } from "../components/PageIndicator";

export function About() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{`ComradeTrends | About Page`}</title>
        <meta
          name="description"
          content="We're your trusted source for the latest news, insightful analysis, and trending stories from around the world."
        />
      </Helmet>
      <PageIndicator />
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-3 text-center">
          <div>
            <h1 className="text-3xl font font-semibold text-center my-7">
              About Comrade Trends
            </h1>
            <div className="text-md dark:text-slate-400 flex flex-col gap-6">
              <p>
                We're your trusted source for the latest news, insightful
                analysis, and trending stories from around the world. Our
                dedicated team of journalists and contributors brings you
                up-to-date information on politics, technology, education, and
                more. Whether you're a news enthusiast or just looking to stay
                informed, we've got you covered.
              </p>

              <p>
                We pledge to uphold journalistic integrity, presenting facts
                without bias. Our goal is to empower you, our readers, with
                knowledge that sparks curiosity and drives positive change.
              </p>

              <p>
                We encourage you to leave comments on our posts and engage with
                other readers. You can like other people's comments and reply to
                them as well. We believe that a community of learners can help
                each other grow and improve.
              </p>
            </div>
            <div className="text-md flex flex-col gap-6">
              <h1 className="text-3xl font font-semibold text-center my-7">
                What Sets Us Apart!
              </h1>
              <p className="text-md dark:text-slate-400">
                1. In-Depth Reporting: Our team of dedicated journalists dives
                deep into stories, uncovering hidden angles and shedding light
                on complex issues. We don't settle for surface-level coverage;
                we explore the nuances.
              </p>
              <p className="text-md dark:text-slate-400">
                2. Global Perspective: Whether it's politics, technology,
                culture, or science, we bring you news from across the globe.
                Our correspondents are stationed in different regions, ensuring
                a diverse range of perspectives.
              </p>
              <p className="text-md dark:text-slate-400">
                3. Community Engagement: We're not just a news outlet; we're a
                community. Join the conversation in our comments section, share
                your views, and connect with fellow readers.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex m-3 justify-center">
        <AdvertiseWithUs />
      </div>
    </div>
  );
}

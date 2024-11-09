import { CallToAction } from "../components/CallToAction"
import { Helmet } from "react-helmet"

export  function Projects() {
  
  return (
    <div className='min-h-screen'>
      <Helmet>
        <title>{`ComradeTrends | Projects Page`}</title>
        <meta name="description" content="We're your trusted source for the latest news, insightful analysis, and trending stories from around the world." />
      </Helmet>
      <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3 text-center'>
      <h1 className='text-3xl font-semibold'>What Sets Us Apart!</h1>
      <p className='text-md text-gray-500'>
      1. In-Depth Reporting: Our team of dedicated journalists dives deep into stories, uncovering hidden angles and shedding light on complex issues. We don't settle for surface-level coverage; we explore the nuances.
      </p>
      <p className='text-md text-gray-500'>
      2. Global Perspective: Whether it's politics, technology, culture, or science, we bring you news from across the globe. Our correspondents are stationed in different regions, ensuring a diverse range of perspectives.
      </p>
      <p className='text-md text-gray-500'>
      3. Community Engagement: We're not just a news outlet; we're a community. Join the conversation in our comments section, share your views, and connect with fellow readers.
      </p>
      
    </div>
    <div className="flex m-3 justify-center">
      <CallToAction />
    </div>
    </div>
  )
  
}

import React from 'react'
import {CallToAction} from '../components/CallToAction'
import { Helmet } from 'react-helmet';

export  function About() {
  return (
    <div className='min-h-screen'>
      <Helmet>
        <title>{`ComradeTrends | About Page`}</title>
        <meta name="description" content="We're your trusted source for the latest news, insightful analysis, and trending stories from around the world." />
      </Helmet>
      <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Comrade Trends
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
            We're your trusted source for the latest news, insightful analysis, and trending stories from around the world. Our dedicated team of journalists and contributors brings you up-to-date information on politics, technology, education, and more. Whether you're a news enthusiast or just looking to stay informed, we've got you covered.
            </p>

            <p>
            We pledge to uphold journalistic integrity, presenting facts without bias. Our goal is to empower you, our readers, with knowledge that sparks curiosity and drives positive change.
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className='flex m-3 justify-center'>
      <CallToAction/>
    </div>
    </div>
  );
}

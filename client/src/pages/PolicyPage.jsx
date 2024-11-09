import { Helmet } from "react-helmet"

export function PolicyPage() {
  return (
    <div className="min-h-screen p-8">
      <Helmet>
        <title>{`ComradeTrends | PrivacyPolicyPage`}</title>
        <meta name="description" content="We're your trusted source for the latest news, insightful analysis, and trending stories from around the world." />
      </Helmet>
     <h3 className="text-2xl font-bold">Introduction</h3>
     <p className="text-sm">Welcome to Comrade Trends! This privacy policy explains how we collect, use, and protect your personal information when you visit our website. By using our site, you agree to the terms outlined in this policy.</p>
     <div>
      <h3 className="text-2xl font-bold">Information we collect</h3>
        <p className="text-sm">
        -Personal Information: When you subscribe to our newsletter, comment on articles, or interact with our site, we may collect personal information such as your name, email address, and IP address
        </p>
        <p className="text-sm">
        -Usage Data: We automatically collect data about your interactions with our website, including pages visited, time spent, and referring URLs
        </p>
     </div>
     <div className="text-sm">
      <h3>How we use your information</h3>
      <span>
        We use your information for the following purposes:
      </span>
      <span>
        Content Delivery: To provide you with relevant news articles and updates
      </span>
      <span>
        Communication: To respond to your inquiries and send newsletters
      </span>
      <span>
        Analytics: To analyze user behavior and improve our website.
      </span>
     </div>
     <div>
      <h3 className="text-2xl">
        Cookies and tracking technologies
      </h3>
      <p className="text-sm">
        We use cookies and similar technologies to enhance your browsing experience. You can manage cookie preferences through your browser settings.
      </p>
      
     </div>
    </div>
  )
}

import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions of Use</h1>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">1. Definitions</h2>
        <ul className="list-disc ml-6">
          <li className="md:text-xl" >
            <strong>Service:</strong> The website and any related services
            provided by Comrade Trends Media, available through the URL
            comradetrends.com.
          </li>
          <li className="md:text-xl" >
            <strong>Content:</strong> All textual, graphic, video, music,
            software, and other materials available on the Service.
          </li>
          <li className="md:text-xl" >
            <strong>User:</strong> Any individual accessing or using the
            Service.
          </li>
          <li className="md:text-xl" >
            <strong>Administrator:</strong> The individual running Comrade
            Trends Media and managing the Service.
          </li>
          <li className="md:text-xl" >
            <strong>Feedback:</strong> Any comments, suggestions, or other
            feedback provided by Users concerning the Service.
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">2. Agreement to Terms</h2>
        <p className="m-2 md:text-xl">
          These Terms and Conditions (the “Terms”) govern the relationship
          between you and Comrade Trends Media ("we," "us," or "our") regarding
          your use of the Service. By accessing and using the Service, you agree
          to be bound by these Terms, forming a legally binding contract between
          you and Comrade Trends Media.{" "}
          <strong>
            PLEASE READ THE TERMS CAREFULLY BEFORE USING THE SERVICE.
          </strong>
        </p>
        <p className="m-2 md:text-xl">
          Please also review our <a className="text-[rgb(2,132,199,100)] cursor-pointer" onClick={()=>navigate("/privacy-policy")}>Privacy Policy</a>. The terms of the Privacy Policy
          and any other supplemental terms, policies, or documents that may be
          posted on the Service from time to time are hereby incorporated by
          reference into these Terms. We reserve the right to modify these Terms
          at any time and for any reason at our sole discretion. Unless
          otherwise stated, we will notify you of any changes by updating the
          "Last updated" date of these Terms. You waive any right to receive
          specific notice of each such change.
          
        </p>
        <p className="m-2 md:text-xl">
        THESE TERMS CONTAIN IMPORTANT DISCLAIMERS (SECTION 2), DISCLAIMERS OF WARRANTIES (SECTION 6), LIMITATION OF LIABILITY (SECTION 7), AS WELL AS PROVISIONS THAT WAIVE YOUR RIGHT TO A JURY TRIAL, RIGHT TO A COURT HEARING AND RIGHT TO PARTICIPATE IN A CLASS ACTION (ARBITRATION AND CLASS ACTION WAIVER).
        </p>
        <p className="m-2 md:text-xl">
        IF YOU DO NOT AGREE WITH ANY PART OF THESE TERMS, OR IF YOU ARE NOT ELIGIBLE OR AUTHORIZED TO BE BOUND BY THESE TERMS, THEN DO NOT ACCESS OR USE THE WEBSITE AND THE SERVICE.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          3. Important Disclaimers
        </h2>
        <ul className="list-disc ml-6">
          <li className="md:text-xl" >The Service will meet your requirements.</li>
          <li className="md:text-xl" >
            The Service will be uninterrupted, timely, secure, or error-free.
          </li>
          <li className="md:text-xl" >
            The results that may be obtained from the use of the Service will be
            accurate or reliable.
          </li>
          <li className="md:text-xl" >
            The quality of any products, services, information, or other
            material purchased or obtained by you through the Service will meet
            your expectations or provide any benefit.
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">4. User Obligations</h2>
        <p className="m-2 md:text-xl">
          Users must use the Service in compliance with these Terms and all
          applicable laws and regulations. Users are prohibited from:
        </p>
        <ul className="list-disc ml-6">
          <li className="md:text-xl" >Utilizing the Service for any illegal activities.</li>
          <li className="md:text-xl" >Distributing viruses or any harmful code.</li>
          <li className="md:text-xl" >Disrupting the security or operation of the Service.</li>
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">5.Services</h2>
        <p className="m-2 md:text-xl">
        When you use the Service, you represent and warrant to the Company that:
        </p>
        <ul className="list-disc ml-6">
          <li className="md:text-xl" >All required information you submit is truthful and accurate</li>
          <li className="md:text-xl" >your use of the Service does not violate any applicable law or regulation or these Terms.</li>
        </ul>
          <p className="m-2 md:text-xl">
          The Company reserves the right to suspend or terminate your use of Service, or your access to the Service, in the event that you breach these Terms.
          </p>
          <p className="m-2 md:text-xl">
          The Service may be modified, updated, interrupted or suspended at any time without notice to you or our liability.
          </p>
          <p className="m-2 md:text-xl">
          You are solely responsible for obtaining the equipment and telecommunication services necessary to access the Service, and all fees associated therewith (such as computing devices and Internet service provider and airtime charges).</p>
          <p className="m-2 md:text-xl">
          We retain the right to implement any changes to the Service (whether to free or paid features) at any time, with or without notice. You acknowledge that a variety of Company's actions may impair or prevent you from accessing the Service at certain times and/or in the same way, for limited periods or permanently, and agree that the Company has no responsibility or liability as a result of any such actions or results, including, without limitation, for the deletion of, or failure to make available to you, any content or services.
          </p>
          <p className="m-2 md:text-xl">
          Your access to and use of the Service is at your own risk. To the extent permitted by law, the Company will have no responsibility for any harm to your computing system, loss of data, or other harm to you or any third party, including, without limitation, any bodily harm, that results from your access to or use of the Service, or reliance on any information or advice.
          </p>
          <p className="m-2 md:text-xl">
          The Company has no obligation to provide you with customer support of any kind. However, the Company may provide you with customer support from time to time, at the Company's sole discretion.
          </p>

      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">6. Account Registration</h2>
        <p className="m-2 md:text-xl">
          In order to use certain features of the Service, you may need to
          register an account and provide certain information about yourself as
          prompted by the registration form. If you register an account, you
          represent and warrant to the Company that:
        </p>
        <ul className="list-disc ml-6">
          <li className="md:text-xl" >
            All required registration information you submit is truthful and
            accurate.
          </li>
          <li className="md:text-xl" >You will maintain the accuracy of such information.</li>
          <li className="md:text-xl" >
            Your use of the Service does not violate any applicable law or
            regulation or these Terms.
          </li>
        </ul>
        <p className="m-2 md:text-xl">
          The Service is not intended to be used by individuals under the age of
          16. You hereby represent and warrant to the Company that you meet the
          foregoing qualification. All users who are minors in the jurisdiction
          in which they reside (generally under the age of 18) must have the
          permission of, and be directly supervised by, their parent or guardian
          to use the Service.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          7. Account Creation and User Content
        </h2>
        <p className="m-2 md:text-xl">
          Users may create accounts and submit content (e.g., comments) to the
          Service. The Administrator reserves the right to remove any user or
          user-submitted content at their discretion. By submitting content, you
          grant Comrade Trends Media a non-exclusive, royalty-free, global
          license to use, reproduce, modify, publish, and distribute such
          content. Users are responsible for ensuring their submissions do not
          infringe on any third-party rights or violate any laws.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          8. Personal Information and Advertisements
        </h2>
        <p className="m-2 md:text-xl">
          Users may be required to enter personal details such as names and
          email addresses. The Service will display advertisements on some
          pages. By using the Service, you agree to the collection and use of
          your personal information as outlined in our Privacy Policy.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          9. Promotions, Contests, and Sweepstakes
        </h2>
        <p className="m-2 md:text-xl">
          We may offer promotions, contests, and sweepstakes on the Service.
          These activities will be governed by separate rules that will be made
          available at the time of such promotions.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          10. Content Ownership and Copyright
        </h2>
        <p className="m-2 md:text-xl">
          All Content provided on or through the Service is the property of the
          Administrator and is protected under copyright, trademark, and other
          laws. Users may not reproduce, distribute, modify, or create
          derivative works from the Content without explicit permission from the
          Administrator.
        </p>
      </section>
      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          11.  Third party ads
        </h2>
        <p className="m-2 md:text-xl">
        The Service may contain links to third party websites or resources and advertisements for third parties (collectively, "Third-Party Ads"). Such Third-Party Ads are not under the control of the Company and the Company is not responsible for any Third-Party Ads. The Company provides these Third-Party Ads only as a convenience and does not review, approve, monitor, endorse, warrant, or make any representations with respect to Third-Party Ads. Advertisements and other information provided by Third-Party Sites Ads may not be wholly accurate. You acknowledge sole responsibility for and assume all risk arising from your use of any such websites or resources. When you link to a third-party site, the applicable service provider's terms and policies, including privacy and data gathering practices govern. You should make whatever investigation you feel necessary or appropriate before proceeding with any transaction with any third party. Your transactions and other dealings with Third-Party Ads that are found on or through the Service, including payment and delivery of related goods or services, are solely between you and such merchant or advertiser.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">12. User Feedback</h2>
        <p className="m-2 md:text-xl">
          Any Feedback provided by Users will be considered non-confidential and
          non-proprietary. The Administrator is free to use such Feedback
          without any compensation or credit to the User.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          13. Limitations of Liability
        </h2>
        <p className="m-2 md:text-xl">
          To the fullest extent allowed by law, Comrade Trends Media will not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, nor any loss of profits or revenues, whether direct
          or indirect, nor any loss of data, use, goodwill, or other intangible
          losses resulting from:
        </p>
        <ul className="list-disc ml-6">
          <li className="md:text-xl" >Your use or inability to use the Service.</li>
          <li className="md:text-xl" >Unauthorized access to or alteration of your content or data.</li>
          <li className="md:text-xl" >Any third-party conduct or content on the Service.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">14. Account Termination</h2>
        <p className="m-2 md:text-xl">
          We reserve the right to suspend or terminate your access to the
          Service at any time, without prior notice or liability, for any
          reason, including but not limited to violation of these Terms.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">15. Governing Law</h2>
        <p className="m-2 md:text-xl">
          These Terms will be governed by and construed in accordance with the
          laws of the Republic of Kenya, without regard to its conflict of law
          provisions.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">16. Contact Information</h2>
        <p className="m-2 md:text-xl">For any questions regarding these Terms, please contact us at:</p>
        <ul className="list-none ml-0">
          <li className="md:text-xl" >Email: <a className="text-[rgb(2,132,199,100)] cursor-pointer" href='mailto:comradetrends.info@gmail.com'>comradetrends.info@gmail.com</a></li>
          <li className="md:text-xl" >Telephone: <a className="text-[rgb(2,132,199,100)] cursor-pointer" href='tel:+254759117496'>+(254)759117496</a></li>
        </ul>
      </section>
    </div>
  );
};

export default TermsAndConditions;

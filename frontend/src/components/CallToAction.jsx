import { useEffect, useState } from "react";

export function CallToAction() {

  const [error,setError] = useState(false)
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      setError(true)
      console.error('AdSense error', e);
    }
  }, []);

 if(error){
  return (
    <div className="flex flex-col sm:flex-row p-1 border max-w-6xl border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-lg">Unlock your audience with Comrade Trends!</h2>
        <p className="text-gray-500 my-0">
          To advertise here, contact us through:
        </p>
        <div className="flex gap-5 justify-center">
          <a href="tel:+254759117496">+(254)759117496</a>
          <a href="tel:+254753868958">+(254)753868958</a>
        </div>
      </div>
      <div className="p-1 flex-1">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjCAfVgATBaPFFWX2WWJF6x-gVW4P1mdvfKA&s" className="rounded-3xl"/>
      </div>
    </div>
  );
 }else{
  return(
    <ins className="adsbygoogle flex flex-col sm:flex-row p-1 border min-h-[200px] max-w-6xl border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center"
      data-ad-client="ca-pub-2272683616359766"
      data-ad-slot="3353766500"
      data-ad-format="auto"
      data-full-width-responsive="true">
    </ins> 
  )
 }
}

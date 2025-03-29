export function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-2 border max-w-6xl border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-xl">Unlock your audience with Comrade Trends!</h2>
        <p className="text-gray-500 my-1">
          To advertise here, contact us through:
        </p>
        <div className="flex gap-5 justify-center">
          <a href="tel:+254759117496">+(254)759117496</a>
          <a href="tel:+254753868958">+(254)753868958</a>
        </div>
      </div>
      <div className="p-2 flex-1">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjCAfVgATBaPFFWX2WWJF6x-gVW4P1mdvfKA&s" />
      </div>
    </div>
  );
}

import React from "react";

const FaqSection = () => {
  return (
    <div>
      <section className="bg-gray-100 text-gray-800">
        <div className="container mx-auto flex flex-col justify-center p-4 md:p-8">
          <p className="p-2 text-center text-sm font-medium uppercase tracking-wider">
            How it works
          </p>
          <h2 className="mb-12 text-center text-4xl font-bold leading-none sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col divide-y divide-gray-300 sm:px-8 lg:px-12 xl:px-32">
            <details>
              <summary className="cursor-pointer py-2 outline-none focus:underline">
                Optio maiores eligendi molestiae totam dolores similique?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  neque in fugiat magni, quas animi enim veritatis deleniti ex.
                  Impedit.
                </p>
              </div>
            </details>
            <details>
              <summary className="cursor-pointer py-2 outline-none focus:underline">
                Modi dolorem veritatis culpa quos consequuntur beatae itaque
                excepturi perspiciatis?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  aspernatur quae, eos explicabo odit minima libero veniam
                  similique quibusdam doloribus facilis ipsa accusantium vel
                  maiores corrupti! Libero voluptate a doloribus?
                </p>
              </div>
            </details>
            <details>
              <summary className="cursor-pointer py-2 outline-none focus:underline">
                Magni reprehenderit possimus debitis?
              </summary>
              <div className="space-y-2 px-4 pb-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                  voluptates aspernatur dolores in consequatur doloremque
                  inventore reprehenderit, consequuntur perspiciatis architecto.
                </p>
                <p>
                  Sed consectetur quod tenetur! Voluptatibus culpa incidunt
                  veritatis velit quasi cupiditate unde eaque! Iure,
                  voluptatibus autem eaque unde possimus quae.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqSection;

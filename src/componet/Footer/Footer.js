import React from "react";

const Footer = () => {
  return (
    <div className="bg-black shadow">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:p-8">
        <div className="flex flex-wrap items-center justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
              RoBoTics
            </span>
          </a>
          <span className="mt-4 block text-sm text-white sm:mt-0 sm:text-center dark:text-white">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              RoBoTics™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center text-sm font-medium text-white sm:ml-10 sm:mt-0 dark:text-white">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

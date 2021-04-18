/* ./component/admin/notice.js */
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'
import React, { useState } from "react";
import { Transition } from '@headlessui/react'

export const Notice = () => {

  const [isShow, setIsShow] = useState(true);
  
    const handleClick = () => {
        setIsShow(false);
    };

  return (
    
  <Transition
    show={isShow}
    enter="transition-opacity duration-360"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-360"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    >
    <div className={`${ isShow ? '' : 'hidden' } bg-indigo-500 m-3`}>
      <div className="mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-indigo-800">
              <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline">Big news! We're excited to announce a brand new product.</span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="#"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Learn more
            </a>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={handleClick}
              className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  )
}
/*  ./components/Azure.js     */
import React, { useState } from "react";
import useSWR from 'swr';
import Carousel from "react-multi-carousel";
import Image from 'next/image'
import "react-multi-carousel/lib/styles.css";

export const Azure = ({isMobileView}) => {

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const {data} = useSWR('/api/readfiles', fetcher);
    const images = data ? [].concat(...data) : [];

  return (
    <>

<div id="sponsor" className="py-24 bg-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
        <div className="px-4 py-5 sm:px-6 text-center">
            <h2>
                This application was developed in conjuction with 
            </h2>      
            <p className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl py-3">
                <a href="https://discover-ai-with-microsoft.agorize.com/en/challenges/msazurevirtualhack-2021/pages/timeline-and-guidelines?lang=en">
                    Microsoft Azure Virtual Hackathon 2021
                </a>
            </p>
            <p>
                Provide innovative solutions in advanced data analytics and AI for a number of booming industries!
            </p>
            
        </div>
        <div className="mx-auto px-4 py-5 sm:px-6 text-center w-full">
            
            <h2 className="text-xl tracking-tight font-semibold text-gray-700 pb-10">
                The following services and applications are supporting this project: 
            </h2>      
            <Carousel
                    additionalTransfrom={0}
                    arrows={false}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    autoPlay
                    autoPlaySpeed={1500}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 9,
                        partialVisibilityGutter: 0
                        },
                        mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 3,
                        partialVisibilityGutter: 0
                        },
                        tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 6,
                        partialVisibilityGutter: 0
                        }
                    }}
                    showDots={false}
                    ssr={false}
                    sliderClass=""
                    slidesToSlide={3}
                    swipeable
                >
                { images.map( (imgPath, index) => ( 
                
                <Image
                key={index}
                src={decodeURIComponent(imgPath.replace('\\', '\/'))}
                alt={imgPath.replace('\\sponsor\\', '')}
                layout="fixed"
                width={64}
                height={64}
            />
                ))}
            </Carousel>
        </div>
    </div>
</div>
    </>
  );
};

Azure.getInitialProps = async ({ ctx }) => {
    let isMobileView = (ctx.req
      ? ctx.req.headers['user-agent']
      : navigator.userAgent).match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
      
      //Returning the isMobileView as a prop to the component for further use.
      return {
        isMobileView: Boolean(isMobileView)
      }
  }
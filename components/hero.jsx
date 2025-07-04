"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

   

const HeroSection = () => {
    
    const ImageRef = useRef();
    useEffect(() => {
        const ImageElement  = ImageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100; 

            if(scrollPosition > scrollThreshold) {
                ImageElement.classList.add("scrolled");  
            }else{
                ImageElement.classList.remove("scrolled");
            }

        };

        window.addEventListener('scroll',handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);   
    return (
        <div className="pb-20 px-4">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl md:text-7xl lg:text-[105px] pb-6 gradient-title">
                    Manage your finances <br/> with intelligence
                </h1>
                <p className="text-lg text-gray-500 mt-3 mb-8 max-w-3xl mx-auto">
                    {" "}
                    Expensify is a powerful expense management tool designed to help you track, analyze, and optimize your spending. 
                </p>
                <div className="flex justify-center gap-4 mt-8">
                    <Link href="/dashboard">
                    <Button size="lg" className="px-8">Get Started</Button>
                    </Link>
            
                    <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="px-8">Watch Demo</Button>
                    </Link>
                </div>
                <div className="hero-image-wrapper">
                    <div ref = {ImageRef} className="hero-image">
                    
                        <Image src="/banner.png" width={1280} height={720} alt="banner" className="rounded-lg shadow-2xl border mx-auto "/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;

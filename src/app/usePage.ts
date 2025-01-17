import { useState, useRef, MutableRefObject, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


function usePage() {
    const [mobileNavbarIsOpen, setMobileNavbarIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const myRef = useRef<MutableRefObject<HTMLDivElement>>(null);
    const loadingRef = useRef<HTMLDivElement | null>(null);
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), [])

    useEffect(() => {
        window.onbeforeunload = function () {
            resetWindowScrollPosition()
        }
    }, [resetWindowScrollPosition])

    useEffect(() => {
        if (!isLoading && loadingRef.current) {
            document.body.classList.remove('no-scroll');
            (loadingRef.current as HTMLDivElement).style.display = 'none'; // Hide the loader
        }
    }, [isLoading]);

    useGSAP(() => {
        let tl = gsap.timeline();
        tl.to('.loader .char', {
            yPercent: 20,
            scale: 0.1,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
            duration: 1,
            stagger: {
                each: 0.1,
                from: 'start',
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
            },
        })
            .to(
                '.loader-bg div',
                {
                    delay: 4,
                    opacity: 0,
                    autoAlpha: 0,
                    yPercent: -100,
                    ease: 'sine.out',
                    stagger: 0.25,
                    duration: 1.5,
                    onComplete: () => {
                        setIsLoading(false);
                    },
                },
                '<',
            )
            .to(
                '.loader',
                {
                    opacity: 0,
                    duration: 1.5,
                    ease: 'sine.out',
                },
                '<',
            )
            .from(
                '.img-profile',
                {
                    autoAlpha: 0,
                    opacity: 0,
                    scale: 0.2,
                    ease: 'sine.out',
                    duration: 2,
                },
                '<',
            )
            .from(
                '.description-landing-page',
                {
                    autoAlpha: 0,
                    delay: 1,
                    xPercent: -200,
                    opacity: 0,
                    ease: 'sine.out',
                    duration: 1,
                    stagger: 0.2,
                },
                '<',
            ).from('.nav-bar', {
                duration: 1.5,
                yPercent: -100,
                ease: 'power1.out',
            }, '-=2').from(
                '#tsparticles',
                {
                    autoAlpha: 0,
                    opacity: 0,
                    ease: 'sine.out',
                    duration: 3,
                },
                '<',
            ).from(
                '.nav-bar .individual-btn-menu',
                {
                    stagger: 0.25,
                    opacity: 0,
                    x: 20,
                    ease: 'expo.out',
                },
                '-=1.5'
            );
    });

    return ({
        myRef,
        mobileNavbarIsOpen,
        setMobileNavbarIsOpen,
        siteKey,
        loadingRef
    })
}

export default usePage
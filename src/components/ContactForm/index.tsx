import React, { MutableRefObject, useRef } from 'react';
import EmailSVG from '../SVG/contactSVG/EmailSVG';
import PhoneSVG from '../SVG/contactSVG/PhoneSVG';
import PositionSVG from '../SVG/contactSVG/PositionSVG';
import EmailAlert from '../Alerts/EmailAlert';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';
import { useContactForm } from './useContactForm';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ContactForm = ({ siteKey }: { siteKey?: string }) => {
  const contactRef = useRef<MutableRefObject<HTMLDivElement>>(null);

  const {
    handleSubmit,
    errors,
    onSubmit,
    register,
    formState: { isSubmitting },
    showAlert,
    form,
    recaptchaError,
    handleRecaptchaToken,
    reCaptchaRef,
  } = useContactForm();

  useGSAP(() => {
    let tl = gsap.timeline();
    gsap.set('.form-animation', { opacity: 0 });
    tl.to('.form-animation', {
      opacity: 1,
      ease: 'expo.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#section-portfolio',
        start: '80% 80%',
        end: '+=700',
        scrub: 1,
        toggleActions: 'play pause reverse pause',
      },
    });
    tl.fromTo(
      '.test',
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '#section-contact',
          start: 'top 60%',
          end: '+=200',
          scrub: 1,
          toggleActions: 'play pause reverse pause',
        },
      },
    );
  });

  if (!siteKey) {
    console.error('RECAPTCHA site key is not defined');
    return;
  }

  return (
    <div
      className="max-w-5xl p-0 sm:p-[3rem] md:p-0 w-[90%] sm:w-full"
      ref={contactRef.current}
    >
      <div className="grid grid-col-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center md:ml-16 font-semibold text-base dark:text-stone-200">
          <a
            href="tel:+21652841633"
            className="flex flex-row  justify-start items-center hover:cursor-pointer rounded-md hover:scale-105 transition-all ease-in-out contact-headline test"
          >
            <div className="rounded-full bg-[--primary-color] p-3">
              <PhoneSVG className="fill-white text-lg" />
            </div>
            <div className="w-full my-4 mx-2">
              <h3 className="transition-all ease-in-out">Call me</h3>
              <h3 className="font-normal">+21652841633</h3>
            </div>
          </a>
          <a
            href="mailto:andolsihoussemeddine@gmail.com"
            className="flex flex-row justify-start items-center hover:cursor-pointer rounded-md hover:scale-105 transition-all ease-in-out contact-headline test"
          >
            <div className="rounded-full bg-[--primary-color] p-3">
              <EmailSVG className="fill-white text-lg" />
            </div>
            <div className="w-full my-4 mx-2">
              <h3 className="transition-all ease-in-out">Email me</h3>
              <h3 className="font-normal">andolsihoussemeddine@gmail.com </h3>
            </div>
          </a>
          <div className="flex flex-row  justify-start items-center test">
            <div className="rounded-full bg-[--primary-color] p-3">
              <PositionSVG className="fill-white text-3" />
            </div>
            <div className="w-full my-4 mx-2">
              <h3>Adress</h3>
              <h3 className="font-normal">Tunis, Tunisia</h3>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} ref={form}>
          <div className="border-b border-gray-900/10 pb-12 w-full px-3 sm:pr-11 lg:px-6">
            <h2 className="text-xl font-medium leading-7 text-gray-900 dark:text-gray-200 form-animation">
              Get In{' '}
              <span className="text-[--primary-color] form-animation">
                Touch
              </span>
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200 form-animation">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 form-animation">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register('email')}
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="Email address"
                    className="block w-full rounded-md border-[1px] ring-0 py-1.5 px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-red-500 dark:text-red-300 text-sm m-1">{`${errors.email.message}`}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3 form-animation">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    {...register('phone')}
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md border-[1px] ring-0 py-1.5 px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors.phone && (
                    <p className="text-red-500 dark:text-red-300 text-sm m-1">{`${errors.phone.message}`}</p>
                  )}
                </div>
              </div>

              <div className="col-span-full form-animation">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Message
                </label>
                <div className="mt-2">
                  <textarea
                    {...register('message')}
                    name="message"
                    id="message"
                    className="block w-full rounded-md border-[1px] ring-0 py-1.5 px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 min-h-36"
                  />
                  {errors.message && (
                    <p className="text-red-500 dark:text-red-300 text-sm m-1">{`${errors.message.message}`}</p>
                  )}
                </div>
              </div>
              <div className="relative sm:col-end-6 sm:col-span-2 sm:ml-5 mx-5 sm:mx-0">
                <ReCAPTCHA
                  size="invisible"
                  ref={reCaptchaRef}
                  onChange={handleRecaptchaToken}
                  sitekey={siteKey}
                  onError={recaptchaError}
                />
                <div className="form-animation">
                  <button
                    type="submit"
                    className={`text-xs md:text-base bg-[--primary-color] hover:cursor-pointer
                    text-white rounded-md hover:border-black filter drop-shadow-lg 
                    hover:translate-y-1 hover:scale-105 transition-all font-sans font-medium w-full p-3 dark:hover:bg-orange-50 dark:hover:text-[--primary-color] ${
                      isSubmitting
                        ? 'loading hover:cursor-not-allowed text-lg!'
                        : ''
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2 w-100">
                        Loading
                        <div className="h-6 w-4 border-b-2 border-current rounded-full animate-spin" />
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                  <Image
                    className="hidden sm:block absolute top-0 right-full opacity-55 dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full w-auto h-full"
                    src="/flesh-website-decoration.png"
                    alt="Houssem Eddine El Andolsi"
                    width={50}
                    height={50}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        {(showAlert.successAlert || showAlert.failureAlert) && (
          <EmailAlert alertStatus={showAlert} />
        )}
      </div>
    </div>
  );
};

export default ContactForm;

import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import EmailSVG from '../SVG/contactSVG/EmailSVG';
import PhoneSVG from '../SVG/contactSVG/PhoneSVG';
import PositionSVG from '../SVG/contactSVG/PositionSVG';
import emailjs from '@emailjs/browser';
import EmailAlert from '../Alerts/EmailAlert';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';

const schema = z.object({
  email: z.string().email(),
  phone: z.string().min(8),
  message: z.string().min(8),
});

interface FormData extends FieldValues {
  email: string;
  phone: string;
  message: string;
  'g-recaptcha-response'?: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef(null);
  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const onChangeRef = useRef<((token: string | null) => void) | null>(null);
  const [showAlert, setShowAlert] = useState<{
    successAlert: boolean;
    failureAlert: boolean;
  }>({
    successAlert: false,
    failureAlert: false,
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const recaptchaToken = await new Promise<string | null>((resolve) => {
        reCaptchaRef.current?.execute();
        onChangeRef.current = resolve;
      });

      if (!recaptchaToken) {
        console.error('reCAPTCHA token not available');
        return;
      }

      data['g-recaptcha-response'] = recaptchaToken;

      if (
        !process.env.NEXT_PUBLIC_EMAILJS_ServiceID ||
        !process.env.NEXT_PUBLIC_EMAILJS_TemplateID ||
        !process.env.NEXT_PUBLIC_EMAILJS_PublicKey
      )
        return;

      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_ServiceID,
          process.env.NEXT_PUBLIC_EMAILJS_TemplateID,
          (form as unknown as MutableRefObject<HTMLFormElement>).current,
          process.env.NEXT_PUBLIC_EMAILJS_PublicKey,
        )
        .then(
          (result) => {
            console.log(result.text);
            setShowAlert((prev) => ({ ...prev, successAlert: true }));
            reset();
          },
          (error) => {
            console.log(error.text);
            setShowAlert((prev) => ({ ...prev, failureAlert: true }));
          },
        );
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    const disableContactAlert = setTimeout(() => {
      if (showAlert.successAlert) {
        setShowAlert((prev) => ({ ...prev, successAlert: false }));
      } else if (showAlert.failureAlert) {
        setShowAlert((prev) => ({ ...prev, failureAlert: false }));
      }
    }, 5000);

    return () => {
      clearTimeout(disableContactAlert);
    };
  }, [showAlert.successAlert, showAlert.failureAlert]);

  if (!process.env.NEXT_PUBLIC_reCAPTCHA_site_key) {
    return;
  }

  return (
    <div className="grid grid-col-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col justify-center md:ml-32 font-semibold text-base dark:text-stone-200">
        <a
          href="tel:+21652841633"
          className="flex flex-row  justify-start items-center hover:cursor-pointer rounded-md hover:scale-105 transition-all ease-in-out"
        >
          <div className="rounded-full bg-slate-200 p-3">
            <PhoneSVG className="fill-[--primary-color] text-lg" />
          </div>
          <div className="w-full my-4 mx-2">
            <h3>Call me</h3>
            <h3 className="font-normal">+21652841633</h3>
          </div>
        </a>
        <a
          href="mailto:andolsihoussemeddine@gmail.com"
          className="flex flex-row  justify-start items-center hover:cursor-pointer rounded-md hover:scale-105 transition-all ease-in-out"
        >
          <div className="rounded-full bg-slate-200 p-3">
            <EmailSVG className="fill-[--primary-color] text-lg" />
          </div>
          <div className="w-full my-4 mx-2">
            <h3>Email me</h3>
            <h3 className="font-normal">andolsihoussemeddine@gmail.com </h3>
          </div>
        </a>
        <div className="flex flex-row  justify-start items-center">
          <div className="rounded-full bg-slate-200 p-3">
            <PositionSVG className="fill-[--primary-color] text-3" />
          </div>
          <div className="w-full my-4 mx-2">
            <h3>Adress</h3>
            <h3 className="font-normal">Tunis, Tunisia</h3>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} ref={form}>
        <div className="border-b border-gray-900/10 pb-12 w-full px-3 sm:px-0">
          <h2 className="text-xl font-medium leading-7 text-gray-900 dark:text-gray-200">
            Get In <span className="text-[--primary-color]">Touch</span>
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
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

            <div className="sm:col-span-3">
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

            <div className="col-span-full">
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
                onChange={(token) => {
                  if (onChangeRef.current) {
                    onChangeRef.current(token);
                  }
                }}
                sitekey={process.env.NEXT_PUBLIC_reCAPTCHA_site_key}
                onError={(err) => {
                  console.error('reCAPTCHA error:', err);
                }}
              />
              <button
                type="submit"
                className={`text-xs md:text-base bg-[--primary-color] hover:cursor-pointer
             text-white rounded-md hover:border-black filter drop-shadow-lg 
             hover:translate-y-1 hover:scale-105 transition-all font-sans font-medium w-full p-3 ${
               isSubmitting ? 'loading hover:cursor-not-allowed text-lg!' : ''
             }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2 w-100">
                    Loading
                    <div className="h-6 w-4 border-b-2 border-current rounded-full animate-spin"></div>
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
      </form>
      {(showAlert.successAlert || showAlert.failureAlert) && (
        <EmailAlert alertStatus={showAlert} />
      )}
    </div>
  );
};

export default ContactForm;

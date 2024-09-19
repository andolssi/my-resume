import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, MutableRefObject, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import emailjs from '@emailjs/browser';
import { z } from "zod";

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

export const useContactForm = () => {
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

            emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_ServiceID,
                process.env.NEXT_PUBLIC_EMAILJS_TemplateID,
                (form as unknown as MutableRefObject<HTMLFormElement>).current,
                process.env.NEXT_PUBLIC_EMAILJS_PublicKey,
            ).then(
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

    const recaptchaError = (err: React.SyntheticEvent<HTMLDivElement, Event>) => () => {
        console.error('reCAPTCHA error:', err);
    }
    const handleRecaptchaToken = (token: string | null) => () => {
        if (onChangeRef.current) {
            onChangeRef.current(token);
        }
    }

    return {
        handleSubmit,
        errors,
        onSubmit,
        register,
        formState: { isSubmitting },
        showAlert,
        form,
        recaptchaError,
        handleRecaptchaToken,
        reCaptchaRef
    }
}
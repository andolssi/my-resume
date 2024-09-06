import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { IresultData } from "../..";

const schema = z.object({
    question3: z.string().min(1, { message: 'Required' }),
});

export interface FormData extends FieldValues {
    question3: string;
    'g-recaptcha-response'?: string;
}

export const useStep03 = (setStep: React.Dispatch<React.SetStateAction<number>>, setResultData: React.Dispatch<React.SetStateAction<IresultData>>) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useRef(null);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        setIsSubmitting(true);

        setResultData((prev) => ({ ...prev, evaluation: { mostImportantCriterion: { criterion: data.question3 } } }))
        // Add fake loading time
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setStep((prev) => prev + 1);
    };


    return {
        isSubmitting,
        form,
        onSubmit,
        handleSubmit,
        register,
        errors,
    }
}


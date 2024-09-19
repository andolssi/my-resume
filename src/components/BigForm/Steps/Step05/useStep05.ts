import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { IresultData } from '@/types/bigFormDataType';

const schema = z.object({
    question5: z.string().min(1, { message: 'Required' }),
});

export interface FormData extends FieldValues {
    question5: string;
    'g-recaptcha-response'?: string;
}

export const useStep05 = (setStep: React.Dispatch<React.SetStateAction<number>>, questionNumber: string, setResultData: React.Dispatch<React.SetStateAction<IresultData>>) => {

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

        setResultData((prev) => (prev.evaluation ?
            { ...prev, evaluation: { ...prev.evaluation, lessImportantCriterion: { criterion: data.question5 } } }
            : prev));
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


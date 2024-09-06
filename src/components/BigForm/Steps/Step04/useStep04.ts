import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { IresultData } from "../..";

const schema = z.object({
    question4: z.array((z.string().min(2, { message: 'Select importance ↑' })
    ))
});

export interface FormData extends FieldValues {
    question4: string[];
    'g-recaptcha-response'?: string;
}

export const useStep04 = (setStep: React.Dispatch<React.SetStateAction<number>>, setResultData: React.Dispatch<React.SetStateAction<IresultData>>, resultData: IresultData) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useRef(null);


    const {
        handleSubmit,
        register,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });


    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // Check for duplicate terms in relations
        const terms = data.question4.map(relation => relation.split('-')[0]);
        if (new Set(terms).size !== terms.length) {
            setError(`question4.${resultData.evaluation?.mostImportantCriterion.criterion}`, {
                type: "manual",
                message: "Vous avez sélectionné le même terme pour plusieurs relations. Veuillez vous assurer que chaque relation a un terme unique avant de soumettre."
            });
            return;
        }

        setIsSubmitting(true);

        setResultData((prev) => (prev?.evaluation ? {
            ...prev,
            evaluation: {
                ...prev.evaluation, mostImportantCriterion: {
                    ...prev.evaluation.mostImportantCriterion,
                    relations: data.question4
                }
            }
        } : prev));
        // Add fake loading time
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setStep((prev) => prev + 1);
    };


    const comparedCriteria = (resultData.criteria as string[]).filter(
        (el) =>
            resultData.evaluation &&
            el !== resultData.evaluation.mostImportantCriterion.criterion,
    )


    return {
        isSubmitting,
        form,
        onSubmit,
        handleSubmit,
        register,
        errors,
        comparedCriteria,
    }
}


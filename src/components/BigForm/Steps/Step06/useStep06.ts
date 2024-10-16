import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { IresultData } from '@/types/bigFormDataType';
import { FuzzyImportance } from "@/helpers/fuzzyImportanceEnum";

const schema = z.object({
    question6: z.array((z.string().min(2, { message: 'Select importance ↑' })
    ))
});

export interface FormData extends FieldValues {
    question6: string[];
    'g-recaptcha-response'?: string;
}

export const useStep06 = (setStep: React.Dispatch<React.SetStateAction<number>>, setResultData: React.Dispatch<React.SetStateAction<IresultData>>, resultData: IresultData) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useRef(null);

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        // Check for duplicate terms in relations
        // const terms = data.question6.map(relation => relation.split('-')[0]);
        // if (new Set(terms).size !== terms.length) {
        //     setError(`question6.${resultData.evaluation?.lessImportantCriterion?.criterion}`, {
        //         type: "manual",
        //         message: "Vous avez sélectionné le même terme pour plusieurs relations. Veuillez vous assurer que chaque relation a un terme unique avant de soumettre."
        //     });
        //     return;
        // }

        setIsSubmitting(true);


        const oldRelation = resultData.evaluation?.mostImportantCriterion?.relations?.filter(el => {
            return resultData.evaluation?.lessImportantCriterion?.criterion && el.includes(resultData.evaluation?.lessImportantCriterion?.criterion)
        })[0].split('-')[0] + '-' + resultData.evaluation?.mostImportantCriterion?.criterion

        setResultData((prev) => (prev?.evaluation?.lessImportantCriterion ? {
            ...prev,
            evaluation: {
                ...prev.evaluation, lessImportantCriterion: {
                    ...prev.evaluation.lessImportantCriterion,
                    relations: oldRelation ? [oldRelation, ...data.question6] : data.question6
                    // relations: [`${FuzzyImportance.EgalementImportant}-${prev.evaluation.lessImportantCriterion.criterion}`, ...data.question6]
                }
            }
        } : prev));
        // Add fake loading time
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setStep((prev) => prev + 1);

    };

    const criteriaToExclude = [
        resultData.evaluation?.mostImportantCriterion?.criterion,
        resultData.evaluation?.lessImportantCriterion?.criterion
    ];

    const comparedCriteria = (resultData.criteria as string[]).filter(
        (el) =>
            resultData.evaluation &&
            !criteriaToExclude.includes(el),
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


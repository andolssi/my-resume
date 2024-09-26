import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { IresultData } from '@/types/bigFormDataType';

const subCriteriaSchema = z.array(z.string().min(2, { message: 'Select importance ↑' }));

const schema = z.object({
    question9: z.record(subCriteriaSchema)
});

export interface FormData extends FieldValues {
    question9: { [key: string]: string[] };
    'g-recaptcha-response'?: string;
}

export const useStep09 = (setStep: React.Dispatch<React.SetStateAction<number>>, questionNumber: string, setResultData: React.Dispatch<React.SetStateAction<IresultData>>, resultData: IresultData) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useRef(null);

    const {
        handleSubmit,
        register,
        setError, // Add setError method
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // Check for duplicate terms in relations for each criterion
        // const criteriaWithDuplicates = Object.entries(data.question9 || {}).reduce((acc, [criterionName, relations]) => {
        //     if (!Array.isArray(relations)) return acc;

        //     const terms = relations.map(relation => relation.split('-')[0]);
        //     if (new Set(terms).size !== terms.length) {
        //         acc.push(criterionName);
        //     }
        //     return acc;
        // }, [] as string[]);

        // if (criteriaWithDuplicates.length > 0) {
        //     criteriaWithDuplicates.forEach(criterionName => {
        //         setError(`question9.${criterionName}`, {
        //             type: "manual",
        //             message: "Vous avez sélectionné le même terme pour plusieurs relations dans ce critère. Veuillez vous assurer que chaque relation a un terme unique avant de soumettre."
        //         });
        //     });
        //     return;
        // }
        setIsSubmitting(true);

        setResultData((prev) => {
            const updatedEvaluation = { ...prev.evaluation };
            Object.entries(data.question9 || {}).forEach(([criterionName, relations]) => {

                if (!updatedEvaluation.subCriteriaEvaluation) return;

                const subCriteria = updatedEvaluation.subCriteriaEvaluation[criterionName];
                if (subCriteria?.mostImportantSubCriterion) {
                    subCriteria.mostImportantSubCriterion = {
                        ...subCriteria.mostImportantSubCriterion,
                        relations: relations as string[]
                    };
                }
            });
            return ({ ...prev, evaluation: updatedEvaluation } as IresultData);
        });
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


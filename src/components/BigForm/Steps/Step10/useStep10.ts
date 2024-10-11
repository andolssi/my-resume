import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { IresultData } from '@/types/bigFormDataType';

const subCriteriaSchema = z.array(z.string().min(2, { message: 'Select importance ↑' }));

const schema = z.object({
    question10: z.record(subCriteriaSchema)
});

export interface FormData extends FieldValues {
    question10: { [key: string]: string[] };
    'g-recaptcha-response'?: string;
}

export const useStep10 = (setStep: React.Dispatch<React.SetStateAction<number>>, setResultData: React.Dispatch<React.SetStateAction<IresultData>>, resultData: IresultData) => {

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
        // const criteriaWithDuplicates = Object.entries(data.question10 || {}).reduce((acc, [criterionName, relations]) => {
        //     if (!Array.isArray(relations)) return acc;

        //     const terms = relations.map(relation => relation.split('-')[0]);
        //     if (new Set(terms).size !== terms.length) {
        //         acc.push(criterionName);
        //     }
        //     return acc;
        // }, [] as string[]);

        // if (criteriaWithDuplicates.length > 0) {
        //     criteriaWithDuplicates.forEach(criterionName => {
        //         setError(`question10.${criterionName}`, {
        //             type: "manual",
        //             message: "Vous avez sélectionné le même terme pour plusieurs relations dans ce critère. Veuillez vous assurer que chaque relation a un terme unique avant de soumettre."
        //         });
        //     });
        //     return;
        // }
        setIsSubmitting(true);

        setResultData((prev) => {
            const updatedEvaluation = { ...prev.evaluation };
            Object.entries(data.question10 || {}).forEach(([criterionName, relations]) => {
                if (!updatedEvaluation.subCriteriaEvaluation) return;
                const oldRelation = resultData.evaluation?.subCriteriaEvaluation?.[criterionName].mostImportantSubCriterion?.relations?.filter(el => {
                    return resultData.evaluation?.subCriteriaEvaluation?.[criterionName].lessImportantSubCriterion?.subCriterion && el.includes(resultData.evaluation?.subCriteriaEvaluation?.[criterionName].lessImportantSubCriterion?.subCriterion!)
                })[0].split('-')[0] + '-' + resultData.evaluation?.subCriteriaEvaluation?.[criterionName].mostImportantSubCriterion?.subCriterion

                console.log({ oldRelation, criterionName });

                const subCriteria = updatedEvaluation.subCriteriaEvaluation[criterionName];
                if (subCriteria?.lessImportantSubCriterion) {
                    subCriteria.lessImportantSubCriterion = {
                        ...subCriteria.lessImportantSubCriterion,
                        relations: [oldRelation, ...relations]
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

    return { isSubmitting, form, onSubmit, handleSubmit, register, errors }
}


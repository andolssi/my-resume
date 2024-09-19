import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { IresultData } from '@/types/bigFormDataType';

const subCriteriaConsiderationSchema = z.object({
    considereSubCriterionForeverMostImportant: z.string().min(2, { message: 'Select ↑' }),
    considereSubCriterionForeverLessImportant: z.string().min(2, { message: 'Select ↑' }),
});

const schema = z.object({
    question12: z.record(subCriteriaConsiderationSchema)
});

export interface FormData extends FieldValues {
    question12: {
        [key: string]: {
            considereSubCriterionForeverMostImportant: string,
            considereSubCriterionForeverLessImportant: string,
        }
    };
    'g-recaptcha-response'?: string;
}

export const useStep12 = (setStep: React.Dispatch<React.SetStateAction<number>>, setResultData: React.Dispatch<React.SetStateAction<IresultData>>, resultData: IresultData) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useRef(null);
    const reCaptchaRef = useRef<ReCAPTCHA>(null);
    const onChangeRef = useRef<((token: string | null) => void) | null>(null);

    const {
        handleSubmit,
        reset,
        register,
        setError, // Add setError method
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        onChangeRef.current = (token: string | null) => {
            if (!token) {
                alert('reCAPTCHA verification failed. Please try again.');
            }
        };
    }, []);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // Check for duplicate terms in relations for each criterion
        const criteriaWithDuplicates = Object.entries(data.question12 || {}).reduce((acc, [criterionName, relations]) => {
            if (!Array.isArray(relations)) return acc;

            const terms = relations.map(relation => relation.split('-')[0]);
            if (new Set(terms).size !== terms.length) {
                acc.push(criterionName);
            }
            return acc;
        }, [] as string[]);

        if (criteriaWithDuplicates.length > 0) {
            criteriaWithDuplicates.forEach(criterionName => {
                setError(`question12.${criterionName}`, {
                    type: "manual",
                    message: "Vous avez sélectionné le même terme pour plusieurs relations dans ce critère. Veuillez vous assurer que chaque relation a un terme unique avant de soumettre."
                });
            });
            return;
        }
        setIsSubmitting(true);

        try {
            const recaptchaToken = await new Promise<string | null>((resolve, reject) => {
                reCaptchaRef.current?.execute();
                onChangeRef.current = (token) => {
                    if (token) {
                        resolve(token);
                    } else {
                        reject(new Error('reCAPTCHA verification failed'));
                    }
                };
            });

            if (!recaptchaToken) {
                console.error('reCAPTCHA token not available');
                return;
            }

            data['g-recaptcha-response'] = recaptchaToken;

            setResultData((prev) => {
                const subCriteriaConsideration: {
                    [criterion: string]: {
                        considereSubCriterionForeverLessImportant: boolean;
                        considereSubCriterionForeverMostImportant: boolean;
                    };
                } = {}
                resultData.criteria?.forEach(criterion => {
                    subCriteriaConsideration[criterion] = {
                        considereSubCriterionForeverLessImportant: data.question12[criterion].considereSubCriterionForeverLessImportant === 'Oui',

                        considereSubCriterionForeverMostImportant: data.question12[criterion].considereSubCriterionForeverMostImportant === 'Oui',
                    }
                })

                return ({
                    ...prev, enduringConsideration: {
                        ...prev.enduringConsideration,
                        subCriteriaConsideration
                    }
                } as IresultData);
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
            setStep((prev) => prev + 1);
        }
    };

    const recaptchaError = (err: React.SyntheticEvent<HTMLDivElement, Event>) => {
        console.error('reCAPTCHA error:', err);
    }
    const handleRecaptchaToken = (token: string | null) => {
        if (onChangeRef.current) {
            onChangeRef.current(token);
        }
    }

    return {
        isSubmitting,
        form,
        onSubmit,
        handleSubmit,
        register,
        errors,
        reCaptchaRef,
        onChangeRef,
        recaptchaError,
        handleRecaptchaToken
    }
}


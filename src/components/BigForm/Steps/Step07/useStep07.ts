import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { IresultData } from '@/types/bigFormDataType';


const schema = z.object({
    question7: z.array(z.string().min(1, { message: 'Select le plus important sous-critère ↑' })
    )
});

interface FormData extends FieldValues {
    question7: string[];
    'g-recaptcha-response'?: string;
}

export const useStep07 = (setStep: React.Dispatch<React.SetStateAction<number>>, setResultData: React.Dispatch<React.SetStateAction<IresultData>>, resultData: IresultData, questionNumber: string) => {


    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useRef(null);


    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        control,
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        setIsSubmitting(true);

        setResultData((prev) => {
            data?.question7.forEach((el: string, index: number) => {
                if (!prev.evaluation) return;
                if (!prev.evaluation.subCriteriaEvaluation) {
                    prev.evaluation.subCriteriaEvaluation = {};
                }

                (prev.evaluation.subCriteriaEvaluation as { [key: string]: any })[(resultData.criteria as string[])[index]] = {
                    mostImportantSubCriterion: {
                        subCriterion: el
                    }
                };
            })
            return (prev)
        })
        // Add fake loading time
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setStep((prev) => prev + 1);
    };

    const handleLabelClick = (subCriterion: string, index: number) => () => {
        setValue(`question${questionNumber}.[${index}]`, subCriterion);
    };


    return {
        isSubmitting,
        form,
        onSubmit,
        handleSubmit,
        register,
        errors,
        setValue,
        watch,
        control, handleLabelClick
    }
}


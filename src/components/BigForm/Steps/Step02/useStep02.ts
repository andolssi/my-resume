import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler, FieldValues, useFieldArray, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { IresultData } from "../..";

const schema = z.object({
    question2: z.array(z.object({
        subCriterion: z.string().min(1, { message: 'Required' })
    }))
});
type SubCriterion = z.infer<typeof schema>["question2"][number];

const question2Initial: SubCriterion[] = [
    { subCriterion: "subCriterion 1" },
    { subCriterion: "subCriterion 2" },
    { subCriterion: "subCriterion 3" }
]

function useZodForm<TSchema extends z.ZodType>(
    props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
        schema: TSchema;
    }
) {
    const form = useForm<TSchema["_input"]>({
        ...props,

        resolver: zodResolver(props.schema, undefined, {
            // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
            raw: true
        })
    });

    return form;
}

interface FormData extends FieldValues {
    question2: { [key: string]: string }[];
    'g-recaptcha-response'?: string;
}

export const useStep02 = (setStep: React.Dispatch<React.SetStateAction<number>>, setResultData: React.Dispatch<React.SetStateAction<IresultData>>, resultData:
    IresultData, criterion: string, setSubSteps: React.Dispatch<React.SetStateAction<number>>) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useRef(null);

    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
    } = useZodForm({
        schema: schema,
        defaultValues: { question2: resultData.subCriteria?.[criterion] ? resultData.subCriteria?.[criterion].map(el => ({ subCriterion: el })) : question2Initial },
        mode: "onChange"
    });



    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: 'question2', // unique name for your Field Array
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        setIsSubmitting(true);

        if (resultData.criteria && resultData.criteria?.indexOf(criterion) === (resultData.criteria?.length - 1)) {
            setResultData((prev) => {
                const subCriterion = data.question2.map(el => el.subCriterion)
                return ({ ...prev, subCriteria: { ...prev.subCriteria, [criterion]: subCriterion } })
            })
            // Add fake loading time
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);
            setStep((prev) => prev + 1);
        } else {
            setResultData((prev) => {
                const subCriterion = data.question2.map(el => el.subCriterion)
                return ({ ...prev, subCriteria: { ...prev.subCriteria, [criterion]: subCriterion } })
            })
            // Add fake loading time
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);
            setSubSteps((prev) => prev + 1);
        }

    };

    return {
        isSubmitting,
        form,
        onSubmit,
        handleSubmit,
        register,
        errors,
        fields,
        remove,
        append,
    }
}


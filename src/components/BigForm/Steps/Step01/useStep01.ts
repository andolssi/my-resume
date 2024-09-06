import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler, FieldValues, useFieldArray, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { IresultData } from "../..";

const schema = z.object({
    question1: z.array(z.object({
        criteria: z.string().min(1, { message: 'Required' })
    }))
});

type Criteria = z.infer<typeof schema>["question1"][number];

const question1Initial: Criteria[] = [
    { criteria: "Critère 1" },
    { criteria: "Critère 2" },
    { criteria: "Critère 3" }
];

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
    question1: { [key: string]: string }[];
    'g-recaptcha-response'?: string;
}

export const useStep01 = (setStep: React.Dispatch<React.SetStateAction<number>>, setResultData: React.Dispatch<React.SetStateAction<IresultData>>, resultData:
    IresultData) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useRef(null);
    const reCaptchaRef = useRef<ReCAPTCHA>(null);
    const onChangeRef = useRef<((token: string | null) => void) | null>(null);

    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
    } = useZodForm({
        schema: schema,
        defaultValues: { question1: resultData.criteria ? resultData.criteria?.map(el => ({ criteria: el })) : question1Initial },
        mode: "onChange"
    });

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "question1", // unique name for your Field Array
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        setIsSubmitting(true);
        try {
            const recaptchaToken = await new Promise<string | null>((resolve) => {
                reCaptchaRef.current?.execute();
                onChangeRef.current = resolve;
            })

            if (!recaptchaToken) {
                console.error('reCAPTCHA token not available');
                return;
            }

            data['g-recaptcha-response'] = recaptchaToken;



            setStep((prev) => prev + 1);
            setResultData((prev) => ({ ...prev, criteria: data.question1.map(el => el.criteria) }))
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };




    return {
        isSubmitting,
        form,
        onSubmit,
        handleSubmit,
        register,
        errors,
        reCaptchaRef,
        onChangeRef,
        fields,
        remove,
        append
    }
}


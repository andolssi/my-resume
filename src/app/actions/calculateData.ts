'use server'

import { IresultData } from '@/types/bigFormDataType'
import { revalidatePath } from 'next/cache'

export async function calculateData(data: IresultData) {
    // Perform your calculations here
    // This is just a sample calculation
    const result = data.criteria

    // Store the result in the server's memory or database
    // For this example, we'll just return it
    // In a real application, you might want to store this in a database

    // Revalidate the path to the second step page
    revalidatePath('/test/second-step')

    return result
}
import { Field, Fieldset, Flex, Input, InputGroup, Stack } from "@chakra-ui/react";
import { Button } from "@components/chakra/button";
import { toaster } from "@components/chakra/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDvds } from "@hooks/useDvds";
import { isErrorWithMessage } from "@utils/error";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MIN_ETH_PRICE = 0.000001;
const MAX_ETH_PRICE = 1000000;

const DvdSchema = z.object({
    title: z
        .string()
        .min(1, "Title must be at least 1 character long")
        .max(100, "Title must be at most 100 characters long"),
    copies: z
        .number({ coerce: true })
        .min(1, "Number of copies must be at least 1")
        .max(100, "Number of copies must be at most 100"),
    price: z
        .number({ coerce: true })
        .min(MIN_ETH_PRICE, `Price must be at least ${MIN_ETH_PRICE}`)
        .max(MAX_ETH_PRICE, `Price must be at most ${MAX_ETH_PRICE}`)
});

type DvdSchemaType = z.infer<typeof DvdSchema>;

interface DvdFormProps {
    onClose: () => void;
    dvdData?: {
        id: number;
        title: string;
        copies: number;
    };
}

export function DvdForm({ onClose, dvdData }: DvdFormProps) {
    const isEditMode = Boolean(dvdData);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DvdSchemaType>({
        resolver: zodResolver(DvdSchema),
        defaultValues: isEditMode
            ? {
                title: dvdData!.title,
                copies: dvdData!.copies,
                price: MIN_ETH_PRICE,
            } : {}
    });
    const { fetchDvds, createDvd, loading, updateDvd } = useDvds();

    const onSubmit = async ({ title, copies, price }: DvdSchemaType) => {
        try {
            if (isEditMode) {
                await updateDvd(dvdData!.id, title, copies);
            } else {
                await createDvd(title, copies, price);
            }
            onClose();
            await fetchDvds();
        } catch (error: unknown) {
            if (isErrorWithMessage(error)) {
                toaster.error({
                    description: error.message,
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root w="100%" mt={6}>
                <Stack>
                    <Fieldset.Legend
                        fontSize="md"
                        fontWeight="bold"
                    >
                        {isEditMode ? "Edit DVD" : "Add new DVD"}
                    </Fieldset.Legend>
                    <Fieldset.HelperText>
                        {isEditMode
                            ? "Edit DVD details below."
                            : "Please provide DVD details below."}
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Flex flexDirection="column" gap={4}>
                        <Field.Root invalid={!!errors.title}>
                            <Field.Label>Title</Field.Label>
                            <Input {...register("title")} />
                            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.copies}>
                            <Field.Label>Number of copies</Field.Label>
                            <Input type="number" {...register("copies")} />
                            <Field.ErrorText>{errors.copies?.message}</Field.ErrorText>
                        </Field.Root>

                        {!isEditMode && (
                            <Field.Root invalid={!!errors.price}>
                                <Field.Label>Price</Field.Label>
                                <InputGroup endAddon="ETH">
                                    <Input step={MIN_ETH_PRICE} type="number" {...register("price")} />
                                </InputGroup>
                                <Field.ErrorText>{errors.price?.message}</Field.ErrorText>
                            </Field.Root>
                        )}
                    </Flex>
                </Fieldset.Content>
                <Button
                    mb={4} mt={6}
                    loading={loading}
                    w="full" type="submit"
                    loadingText={isEditMode ? "Updating..." : "Adding..."}
                >
                    {isEditMode ? "Update" : "Add"}
                </Button>
            </Fieldset.Root>
        </form>
    )
}
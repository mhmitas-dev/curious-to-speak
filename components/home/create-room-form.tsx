"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { createRoom } from "@/lib/actions/createRoom";

// Schema
const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Use at least 2 characters" })
        .max(150, { message: "Name must be between 2 and 150 characters" }),
});

type FormData = z.infer<typeof formSchema>;

export function CreateRoomForm() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // Form setup
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    // Handlers
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        try {
            const res = await createRoom();
            if (res.success) {
                toast.success(res.message);
            }
            if (!res.success) {
                toast.error(res.message);
            }
            form.reset();
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Failed to create Room:", error);
        }
    };

    // Render
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>Create a new Room</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create New Room</DialogTitle>
                    <DialogDescription>
                        Enter the details for your new room here.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-1 ml-0.5">Topic</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="What will you discuss in your Room?"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}